import assert from 'node:assert/strict';
import { createServer, Server } from 'node:http';
import { AddressInfo } from 'node:net';
import { after, before, describe, it } from 'node:test';

import { Canvas, createCanvas } from '@napi-rs/canvas';

import { BadgePartTable } from '../src/badge/BadgePartTable';
import { parseGroupBadgeCode } from '../src/badge/groupBadgeCode';
import { BADGE_SIZE, badgePartPosition, GroupBadgeImager } from '../src/badge/GroupBadgeImager';
import { DEFAULT_BADGE_PARTS } from '../src/config';

void describe('parseGroupBadgeCode', () => {
    void it('reads a base and symbols in layer order', () => {
        assert.deepEqual(parseGroupBadgeCode('b05114s06118'), [
            { kind: 'base', partId: 5, colorId: 11, position: 4 },
            { kind: 'symbol', partId: 6, colorId: 11, position: 8 },
        ]);
    });

    void it('adds 100 to a t symbol', () => {
        assert.deepEqual(parseGroupBadgeCode('t59030'), [ { kind: 'symbol', partId: 159, colorId: 3, position: 0 } ]);
    });

    void it('skips a token that does not read, and keeps the rest', () => {
        assert.deepEqual(parseGroupBadgeCode('x01010s0a011b02024s03034').map(layer => layer.partId), [ 2, 3 ]);
    });

    void it('skips a position off the grid', () => {
        assert.deepEqual(parseGroupBadgeCode('b01019s02024'), [ { kind: 'symbol', partId: 2, colorId: 2, position: 4 } ]);
    });

    void it('stops at five layers', () => {
        assert.equal(parseGroupBadgeCode('b01010s01010s01010s01010s01010s01010').length, 5);
    });
});

void describe('badgePartPosition', () => {
    void it('centres a part on its cell and floors it, as BadgeEditorPartItem.getPosition does', () => {
        assert.deepEqual(badgePartPosition(4, 10, 10), { x: 14, y: 14 });
        assert.deepEqual(badgePartPosition(0, 11, 9), { x: 1, y: 2 });
    });

    void it('pushes a part back inside the badge', () => {
        assert.deepEqual(badgePartPosition(8, 20, 20), { x: 19, y: 19 });
        assert.deepEqual(badgePartPosition(0, 39, 39), { x: 0, y: 0 });
    });
});

void describe('the shipped badge parts table', () => {
    void it('reads, with every part and colour the editor seeds', async () => {
        const table = await BadgePartTable.load(DEFAULT_BADGE_PARTS);

        assert.equal(table.partCount, 29 + 159);
        assert.equal(table.colorCount, 38);
        assert.equal(table.getPart('base', 10)?.maskFileName, 'base_beams_part2');
        assert.equal(table.getColor(8), 0xffe500);
    });
});

void describe('GroupBadgeImager', () => {
    let server: Server;
    let baseUrl: string;

    /** A solid square part: `white` is the tinted bitmap, `mask` the untinted overlay. */
    const parts: Record<string, Buffer> = {
        badgepart_white: square(10, [ 255, 255, 255, 255 ]),
        badgepart_half: square(10, [ 200, 100, 50, 255 ]),
        badgepart_mask: square(2, [ 0, 0, 255, 255 ]),
    };

    before(async () => {
        server = createServer((request, response) => {
            const name = request.url?.slice(1).replace('.png', '') ?? '';

            if (!parts[name]) {
                response.writeHead(404).end();

                return;
            }

            response.writeHead(200, { 'Content-Type': 'image/png' }).end(parts[name]);
        });

        await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));

        baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/`;
    });

    after(() => server.close());

    const createImager = async () => {
        const imager = await GroupBadgeImager.create({ partImageUrl: baseUrl, partsSource: DEFAULT_BADGE_PARTS, partsRefreshSeconds: 0 });

        // The test's own table, standing in for the hotel's.
        (imager as unknown as { _table: BadgePartTable })._table = new BadgePartTable({
            bases: [ { id: 1, fileName: 'white', maskFileName: 'mask' } ],
            symbols: [ { id: 2, fileName: 'half.png', maskFileName: '' }, { id: 3, fileName: 'missing', maskFileName: '' } ],
            colors: [ { id: 1, color: 'FF8000' }, { id: 2, color: '808080' } ],
        });

        return imager;
    };

    void it('multiplies a part by its colour and lays the mask over it untinted', async () => {
        const imager = await createImager();
        const { canvas: badge, missing } = await imager.render('b01014');

        assert.ok(badge);
        assert.deepEqual(missing, []);
        assert.equal(badge.width, BADGE_SIZE);

        // The part sits at 14,14; its mask (2x2) at the same corner.
        assert.deepEqual(pixel(badge, 16, 16), [ 255, 128, 0, 255 ]);
        assert.deepEqual(pixel(badge, 14, 14), [ 0, 0, 255, 255 ]);
        assert.deepEqual(pixel(badge, 13, 13), [ 0, 0, 0, 0 ]);

        imager.dispose();
    });

    void it('floors each channel, as Flash ColorTransform does, and stacks symbols over the base', async () => {
        const imager = await createImager();
        const { canvas: badge } = await imager.render('b01014s02020');

        assert.ok(badge);
        // 200 * 128/255 = 100.39, 100 * 128/255 = 50.19, 50 * 128/255 = 25.09
        assert.deepEqual(pixel(badge, 5, 5), [ 100, 50, 25, 255 ]);
        // The base still shows where the symbol does not reach.
        assert.deepEqual(pixel(badge, 20, 20), [ 255, 128, 0, 255 ]);

        imager.dispose();
    });

    void it('leaves out a layer it cannot draw and says so, and draws nothing when no layer draws', async () => {
        const imager = await createImager();
        const partial = await imager.render('b01014s03014s02090');

        assert.ok(partial.canvas);
        // Part 3's bitmap is not served; colour 9 is not in the table.
        assert.deepEqual(partial.missing.sort(), [ 'symbol 2 colour 9', 'symbol 3 colour 1' ]);
        assert.deepEqual((await imager.render('b01014x00000')).missing, [ 'unreadable tokens' ]);
        assert.equal((await imager.render('s03014')).canvas, undefined);
        assert.equal((await imager.render('nonsense')).canvas, undefined);

        imager.dispose();
    });
});

void describe('a badge parts table at a url, as Turbo serves badgeparts_json', () => {
    let server: Server;
    let tableUrl: string;
    let served: string | undefined;

    before(async () => {
        server = createServer((request, response) => {
            if (served === undefined) {
                response.writeHead(503).end();

                return;
            }

            response.writeHead(200, { 'Content-Type': 'application/json' }).end(served);
        });

        await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));

        tableUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/gamedata/badgeparts_json/0`;
    });

    after(() => server.close());

    const table = (color: string) => JSON.stringify({ bases: [ { id: 1, fileName: 'base_basic_1', maskFileName: '' } ], symbols: [], colors: [ { id: 1, color } ] });

    void it('draws with the shipped table while the url cannot be read, and the served one once a refresh reads it', async () => {
        served = undefined;

        const imager = await GroupBadgeImager.create({ partImageUrl: 'http://127.0.0.1:1/', partsSource: tableUrl, partsRefreshSeconds: 0 }, DEFAULT_BADGE_PARTS);

        assert.equal(imager.table.partCount, 29 + 159);

        served = table('ff8800');
        await imager.refreshTable();

        const first = imager.table.version;

        assert.equal(imager.table.getColor(1), 0xff8800);

        // A recoloured palette is a new version, so no cached badge of the old one is served.
        served = table('0088ff');
        await imager.refreshTable();

        assert.equal(imager.table.getColor(1), 0x0088ff);
        assert.notEqual(imager.table.version, first);

        // A failed read keeps the table in use.
        served = undefined;
        await imager.refreshTable();

        assert.equal(imager.table.getColor(1), 0x0088ff);

        imager.dispose();
    });

    void it('fails to start without a fallback when the url cannot be read', async () => {
        served = undefined;

        await assert.rejects(GroupBadgeImager.create({ partImageUrl: 'http://127.0.0.1:1/', partsSource: tableUrl, partsRefreshSeconds: 0 }));
    });
});

function square(size: number, rgba: number[]): Buffer {
    const canvas = createCanvas(size, size);
    const context = canvas.getContext('2d');

    context.fillStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
    context.fillRect(0, 0, size, size);

    return canvas.toBuffer('image/png');
}

function pixel(canvas: Canvas, x: number, y: number): number[] {
    return [ ...canvas.getContext('2d').getImageData(x, y, 1, 1).data ];
}
