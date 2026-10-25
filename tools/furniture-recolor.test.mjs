import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import ts from 'typescript';

// Transpiled rather than imported as `.ts`, as turbo-command-packets.test.mjs does; each module
// imports only types, or a class replaced below by a stand-in, so nothing is left to resolve.
const load = async (path, inline = {}) => {
    let source = readFileSync(new URL(`../packages/${path}.ts`, import.meta.url), 'utf8');

    for (const [ line, body ] of Object.entries(inline)) source = source.replace(line, body);

    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } });

    return import(`data:text/javascript,${encodeURIComponent(outputText)}`);
};

/** A wrapper over typed values, as the client's `IMessageDataWrapper` reads them. */
const wrapperOf = (values) => {
    const queue = [ ...values ];

    return {
        readInt: () => queue.shift(),
        readShort: () => queue.shift(),
        get remaining() { return queue.length; },
    };
};

const { FurniRecolorUpdateMessage } = await load('nitro-packets/src/incoming/Room/Engine/FurniRecolorUpdateMessage');
const { RecolorFurnitureComposer } = await load('nitro-packets/src/outgoing/Room/Furniture/RecolorFurnitureComposer');
// `MapDataType.setData` / `getValue` as nitro-api's: a map of strings.
const mapDataType = 'class MapDataType { setData(data) { this.data = { ...data }; } getValue(key) { return this.data[key]; } }';
const { getRecolorableColors, recolorableExtraParam, createRecolorableStuffData } = await load('nitro-react/src/utils/recolorablePalette', { "import { MapDataType } from '@nitrodevco/nitro-api';": mapDataType });

await test('FurniRecolorUpdate reads each entry as furni ids then three shorts (_-X2a / RecolorUpdateData)', () => {
    const wrapper = wrapperOf([ 2, 2, 10, 11, 255, 54, 0, 1, 12, 18, 52, 86 ]);

    assert.deepEqual(new FurniRecolorUpdateMessage().parse(wrapper), {
        updates: [
            { objectIds: [ 10, 11 ], red: 255, green: 54, blue: 0 },
            { objectIds: [ 12 ], red: 18, green: 52, blue: 86 },
        ],
    });
    assert.equal(wrapper.remaining, 0);
});

await test('RecolorFurniture sends furni, scope and the colour as three channels (RecolorFurnitureMessageComposer)', () => {
    assert.deepEqual(new RecolorFurnitureComposer({ objectId: 10, scope: 2, color: 0xff3600 }).compose(), [ 10, 2, 255, 54, 0 ]);
});

await test('a class takes its palette from palette_to_furni, else the default one (_-xw.getColors)', () => {
    const config = {
        'recolorable_bc.palette_to_furni': 'letters=bc_alpha1_a_recolorable, bc_alpha1_b_recolorable;broken',
        'recolorable_bc.palette.default': 'FF3600, 123456,zzzzzz,ffffff',
        'recolorable_bc.palette.letters': '00FFCC',
    };
    const configString = key => config[key] ?? '';

    assert.deepEqual(getRecolorableColors(configString, 'bc_block_0_recolorable'), [ 0xff3600, 0x123456, 0xffffff ]);
    assert.deepEqual(getRecolorableColors(configString, 'bc_alpha1_b_recolorable'), [ 0x00ffcc ]);
    assert.deepEqual(getRecolorableColors(() => '', 'bc_block_0_recolorable'), []);
});

await test('the catalogue palette colour is placed as r,g,b with state 0 (RecolorableFurnitureCatalogWidget)', () => {
    assert.equal(recolorableExtraParam(0xff3600), '255,54,0');
    assert.deepEqual(createRecolorableStuffData('255,54,0').data, { state: '0', r: '255', g: '54', b: '0' });
});
