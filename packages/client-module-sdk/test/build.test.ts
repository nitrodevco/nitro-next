import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';
import { pathToFileURL } from 'node:url';

import * as esbuild from 'esbuild';
import * as React from 'react';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';

import { clientModuleBuildOptions } from '../src/build.js';
import type { ClientModuleApi, ClientModuleDefinition, ClientModuleWindowProps } from '../src/index';

const out = mkdtempSync(path.join(tmpdir(), 'client-module-sdk-'));

after(() => rmSync(out, { recursive: true, force: true }));

/** The fixture bundled with the preset, as a module author's build does. */
const bundle = async () => {
    const outfile = path.join(out, `module-${Date.now()}.js`);

    await esbuild.build(clientModuleBuildOptions({ entry: path.join(import.meta.dirname, 'fixture/module.tsx'), outfile }));

    return outfile;
};

void test('the bundle is one file without a copy of React, the theme or the SDK\'s host checks', async () => {
    const code = readFileSync(await bundle(), 'utf8');

    assert.doesNotMatch(code, /^import /m, 'one file: nothing left for the client to resolve');
    assert.doesNotMatch(code, /react\.(production|development)/, 'React is the client\'s');
    assert.match(code, /globalThis\.NitroClientModuleHost/);
    assert.ok(code.length < 20_000, `small: ${code.length} bytes`);
});

void test('the module runs on the client\'s React and theme, and its components reach the API', async () => {
    const Frame = ({ caption, children }: { caption?: string; children?: React.ReactNode }) => React.createElement('frame', { caption }, children);
    const Leaf = (name: string) => ({ children, text }: { children?: React.ReactNode; text?: string }) => React.createElement(name, null, text ?? children);

    globalThis.NitroClientModuleHost = {
        react: React,
        reactJsxRuntime: ReactJsxRuntime,
        zustand: { useStore: () => undefined },
        theme: { Frame, Box: Leaf('box'), Button: Leaf('button'), Region: Leaf('region'), RichText: Leaf('richtext') as never, ThemeText: Leaf('text'), TemplateWindow: Leaf('template') as never },
        stores: { room: undefined, system: undefined, user: undefined },
    };

    const windows = new Map<string, React.ComponentType<ClientModuleWindowProps>>();
    const icons: string[] = [];
    const api = {
        key: 'counter',
        baseUrl: 'http://hotel.test/gamedata/plugins/counter/counter.js',
        windows: { register: (id: string, component: React.ComponentType<ClientModuleWindowProps>) => (windows.set(id, component), () => windows.delete(id)) },
        toolbar: { add: (item: { icon: string }) => (icons.push(item.icon), () => undefined) },
        texts: { get: (_key: string, fallback?: string) => `${fallback}!` },
    } as unknown as ClientModuleApi;

    const module = (await import(pathToFileURL(await bundle()).href)).default as ClientModuleDefinition;

    await module.activate(api);

    assert.deepEqual(icons, [ 'http://hotel.test/gamedata/plugins/counter/icon.png' ]);

    const Counter = windows.get('counter')!;

    assert.equal(renderToStaticMarkup(React.createElement(Counter, { params: {}, close: () => undefined })), '<frame caption="Counter!"><text>0</text><button>+1</button></frame>');

    await module.deactivate?.();
    globalThis.NitroClientModuleHost = undefined;
});
