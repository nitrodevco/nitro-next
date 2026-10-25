import { Canvas, createCanvas, Image, loadImage } from '@napi-rs/canvas';

import { ImagerConfig } from '../config';
import { BadgePartTable, isUrl } from './BadgePartTable';
import { BADGE_TOKEN_LENGTH, BadgeLayer, parseGroupBadgeCode } from './groupBadgeCode';

/** `BadgeEditorPartItem.IMAGE_WIDTH` / `IMAGE_HEIGHT`: the badge, and every layer's composite. */
export const BADGE_SIZE = 39;

/** `BadgeEditorPartItem.CELL_WIDTH` / `CELL_HEIGHT`: one cell of the 3x3 position grid. */
const BADGE_CELL = 13;

/** How long, in ms, a part bitmap that failed to load is left before it is asked for again. */
const FAILED_PART_RETRY = 60_000;

/** A drawn badge, and what of its code did not draw; empty when all of it did. */
export interface GroupBadgeRender {
    canvas: Canvas | undefined;
    missing: string[];
}

/**
 * Draws group badges from their codes, the way the Habbo client's badge editor composes its
 * preview (`BadgeEditorPartItem.getComposite`, `BadgeEditorCtrl` stacking the layers): each
 * layer's part is copied into a 39x39 bitmap at its grid cell, tinted by a `ColorTransform`
 * whose multipliers are the colour's channels, the part's mask laid over it untinted, and the
 * layers stacked base first. Plain 2D canvas work - no renderer is involved.
 */
export class GroupBadgeImager {
    private _table: BadgePartTable;
    private readonly _parts = new Map<string, Promise<Image | undefined>>();
    private readonly _failedAt = new Map<string, number>();
    private _refreshTimer: ReturnType<typeof setInterval> | undefined;

    private constructor(private readonly _options: ImagerConfig['badge'], table: BadgePartTable) {
        this._table = table;
    }

    /**
     * @param fallbackSource The table drawn with while one at a url cannot be read - the hotel's
     * server down or not serving it yet - until a refresh reads it.
     */
    public static async create(options: ImagerConfig['badge'], fallbackSource?: string): Promise<GroupBadgeImager> {
        let table: BadgePartTable;

        try {
            table = await BadgePartTable.load(options.partsSource);
        } catch (err) {
            if (!fallbackSource || !isUrl(options.partsSource)) throw err;

            console.error(`The badge parts table at ${options.partsSource} could not be read; drawing with ${fallbackSource} until it can:`, (err as Error).message);

            table = await BadgePartTable.load(fallbackSource);
        }

        const imager = new GroupBadgeImager(options, table);

        if (isUrl(options.partsSource) && (options.partsRefreshSeconds > 0)) {
            imager._refreshTimer = setInterval(() => void imager.refreshTable(), options.partsRefreshSeconds * 1000);
            imager._refreshTimer.unref();
        }

        return imager;
    }

    /** The table now in use; its `version` belongs in the key of anything cached from it. */
    public get table(): BadgePartTable {
        return this._table;
    }

    /** Reads the table again. A failed read keeps the one already in use. */
    public async refreshTable(): Promise<void> {
        try {
            this._table = await BadgePartTable.load(this._options.partsSource);
        } catch (err) {
            console.error('Reloading the badge parts table failed; keeping the current one:', err);
        }
    }

    /**
     * The badge for a code - `undefined` when no layer of it draws - and what of the code did not
     * draw: a token that does not read, a part or colour the table does not have, or a part
     * whose bitmap did not load. A badge missing any of it is drawn without it, but is not the
     * badge the code names.
     */
    public async render(code: string): Promise<GroupBadgeRender> {
        const table = this._table;
        const layers = parseGroupBadgeCode(code);
        const missing: string[] = [];

        if ((layers.length * BADGE_TOKEN_LENGTH) !== code.length) missing.push('unreadable tokens');

        const composites = await Promise.all(layers.map(async (layer) => {
            const composite = await this.renderLayer(table, layer);

            if (!composite) missing.push(`${layer.kind} ${layer.partId} colour ${layer.colorId}`);

            return composite;
        }));
        const drawn = composites.filter((composite): composite is Canvas => !!composite);

        if (!drawn.length) return { canvas: undefined, missing };

        const badge = createCanvas(BADGE_SIZE, BADGE_SIZE);
        const context = badge.getContext('2d');

        for (const composite of drawn) context.drawImage(composite, 0, 0);

        return { canvas: badge, missing };
    }

    public dispose(): void {
        if (this._refreshTimer) clearInterval(this._refreshTimer);
    }

    /** `BadgeEditorPartItem.getComposite`: one layer, as its own 39x39 bitmap. */
    private async renderLayer(table: BadgePartTable, layer: BadgeLayer): Promise<Canvas | undefined> {
        const part = table.getPart(layer.kind, layer.partId);
        const color = table.getColor(layer.colorId);

        if (!part || (color === undefined)) return undefined;

        const [ image, mask ] = await Promise.all([ this.loadPart(part.fileName), part.maskFileName ? this.loadPart(part.maskFileName) : undefined ]);

        // Flash waits for both bitmaps before it draws the layer at all.
        if (!image || (part.maskFileName && !mask)) return undefined;

        const { x, y } = badgePartPosition(layer.position, image.width, image.height);
        const composite = createCanvas(BADGE_SIZE, BADGE_SIZE);
        const context = composite.getContext('2d');

        context.drawImage(image, x, y);
        tint(context, color);

        if (mask) context.drawImage(mask, x, y);

        return composite;
    }

    /** A part's bitmap, loaded once and kept: there are a couple of hundred of them, a few hundred bytes each. */
    private loadPart(fileName: string): Promise<Image | undefined> {
        const name = fileName.replace('.gif', '').replace('.png', '');
        const failedAt = this._failedAt.get(name);

        if ((failedAt !== undefined) && ((Date.now() - failedAt) > FAILED_PART_RETRY)) {
            this._failedAt.delete(name);
            this._parts.delete(name);
        }

        let part = this._parts.get(name);

        if (!part) {
            const url = `${this._options.partImageUrl}badgepart_${name}.png`;

            part = (async () => {
                try {
                    const response = await fetch(url);

                    if (!response.ok) throw new Error(`${response.status}`);

                    return await loadImage(Buffer.from(await response.arrayBuffer()));
                } catch (err) {
                    console.error(`Badge part ${url} failed to load:`, (err as Error).message);
                    this._failedAt.set(name, Date.now());

                    return undefined;
                }
            })();

            this._parts.set(name, part);
        }

        return part;
    }
}

/**
 * `BadgeEditorPartItem.getPosition`: where a part sits in the badge for a grid cell - centred on
 * the cell, then pushed back inside the badge, then floored.
 */
export const badgePartPosition = (position: number, width: number, height: number): { x: number; y: number } => {
    const gridX = position % 3;
    const gridY = Math.floor(position / 3);

    let x = (BADGE_CELL * gridX) + (BADGE_CELL / 2) - (width / 2);
    let y = (BADGE_CELL * gridY) + (BADGE_CELL / 2) - (height / 2);

    if (x < 0) x = 0;
    if ((x + width) > BADGE_SIZE) x = BADGE_SIZE - width;
    if (y < 0) y = 0;
    if ((y + height) > BADGE_SIZE) y = BADGE_SIZE - height;

    return { x: Math.floor(x), y: Math.floor(y) };
};

/**
 * `BitmapData.colorTransform` with only the three colour multipliers set, over the whole bitmap:
 * each channel scaled by the colour's own over 255, alpha untouched. Done on the unpremultiplied
 * pixels, as Flash's is, rather than with a blend mode that would also darken the edges.
 */
const tint = (context: ReturnType<Canvas['getContext']>, color: number): void => {
    const red = ((color >> 16) & 0xff) / 0xff;
    const green = ((color >> 8) & 0xff) / 0xff;
    const blue = (color & 0xff) / 0xff;
    const pixels = context.getImageData(0, 0, BADGE_SIZE, BADGE_SIZE);
    const data = pixels.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.floor(data[i] * red);
        data[i + 1] = Math.floor(data[i + 1] * green);
        data[i + 2] = Math.floor(data[i + 2] * blue);
    }

    context.putImageData(pixels, 0, 0);
};
