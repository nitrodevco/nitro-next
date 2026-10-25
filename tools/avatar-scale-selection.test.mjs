/** AvatarVisualizationData scale selection against Flash's AvatarScaleType contract. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/room/object/visualization/avatar/AvatarVisualizationData.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const exports = {};
    const calls = [];
    const dependencies = {
        '@nitrodevco/nitro-api': {
            AvatarGenderType: {},
            AvatarScaleType: { Large: 'h', LargeToSmall: 'h_50', Small: 'sh' },
            RoomGeometryScaleType: { AvatarSizeNormal: 48 },
        },
        '#renderer/avatar': {
            GetAvatarRenderManager: () => ({
                createAvatarImage: (...args) => {
                    calls.push([ 'createAvatarImage', ...args ]);
                    return 'image';
                },
                createBlockedAvatarImage: (...args) => {
                    calls.push([ 'createBlockedAvatarImage', ...args ]);
                    return 'blocked';
                },
            }),
        },
    };

    runInNewContext(outputText, {
        exports,
        require: (dependency) => {
            assert.ok(Object.hasOwn(dependencies, dependency), `Unexpected dependency: ${dependency}`);
            return dependencies[dependency];
        },
    });

    return { AvatarVisualizationData: exports.AvatarVisualizationData, calls };
};

await test('selects Flash large assets at 64 and large-to-small assets at 32', () => {
    const { AvatarVisualizationData, calls } = load();
    const data = new AvatarVisualizationData();

    data.createAvatarImage('hd-180-1', 64, 'M', {}, {});
    data.createAvatarImage('hd-180-1', 32, 'M', {}, {});

    assert.deepEqual(calls.map(call => call[1]), [ 'hd-180-1', 'hd-180-1' ]);
    assert.deepEqual(calls.map(call => call[2]), [ 'h', 'h_50' ]);
});
