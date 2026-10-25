import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, describe, it } from 'node:test';
import { pathToFileURL } from 'node:url';

import { AddressError, resolveAddress } from '../src/address';
import { readImagerConfig } from '../src/config';
import { fetchWithFiles } from '../src/environment/fetchWithFiles';

let root: string;
let figures: string;

before(() => {
    root = mkdtempSync(join(tmpdir(), 'imager-address-'));
    figures = join(root, 'figures');

    mkdirSync(figures);
    writeFileSync(join(figures, 'hh_human_body.nitro'), 'bundle bytes');
    writeFileSync(join(root, 'FigureMap.json'), '{"libraries":[]}');
});

after(() => rmSync(root, { recursive: true, force: true }));

void describe('resolveAddress', () => {
    void it('keeps a url as it is, and gives a protocol-relative one https', () => {
        assert.equal(resolveAddress('https://cdn.example/figures/%libname%.nitro', 'bundle'), 'https://cdn.example/figures/%libname%.nitro');
        assert.equal(resolveAddress('//images.habbo.com/c_images/Badgeparts/', 'folder'), 'https://images.habbo.com/c_images/Badgeparts/');
        assert.equal(resolveAddress('file:///srv/x.json', 'file'), 'file:///srv/x.json');
    });

    void it('makes a folder of bundles a file url each library fills in', () => {
        const url = resolveAddress(figures, 'bundle');

        assert.equal(url, `${pathToFileURL(figures).href}/%libname%.nitro`);
        assert.equal(url.replace('%libname%', 'hh_human_body'), pathToFileURL(join(figures, 'hh_human_body.nitro')).href);
    });

    void it('takes a path with %libname% in it as the libraries’ own names', () => {
        const url = resolveAddress(join(figures, 'v2_%libname%.nitro'), 'bundle');

        assert.equal(url, `${pathToFileURL(figures).href}/v2_%libname%.nitro`);
    });

    void it('makes a file a file url, and a folder of files one with a closing slash', () => {
        assert.equal(resolveAddress(join(root, 'FigureMap.json'), 'file'), pathToFileURL(join(root, 'FigureMap.json')).href);
        assert.equal(resolveAddress(figures, 'folder'), `${pathToFileURL(figures).href}/`);
    });

    void it('refuses a path that is not there, or not the kind asked for', () => {
        assert.throws(() => resolveAddress(join(root, 'nowhere'), 'bundle'), AddressError);
        assert.throws(() => resolveAddress(join(root, 'nowhere', '%libname%.nitro'), 'bundle'), AddressError);
        assert.throws(() => resolveAddress(figures, 'file'), AddressError);
        assert.throws(() => resolveAddress(join(root, 'FigureMap.json'), 'folder'), AddressError);
    });
});

void describe('readImagerConfig', () => {
    void it('takes folders and urls side by side, and names every path that is not there', () => {
        const env = {
            IMAGER_TEMPLATES_URL: 'https://cdn.example/templates/%libname%.nitro',
            IMAGER_FIGURE_BUNDLE_URL: figures,
            IMAGER_FIGUREMAP_URL: join(root, 'FigureMap.json'),
            IMAGER_FIGUREDATA_URL: 'https://cdn.example/figuredata.json',
            IMAGER_BADGE_PART_URL: '//images.habbo.com/c_images/Badgeparts/',
        };
        const config = readImagerConfig(env);

        assert.equal(config.avatar.templatesUrl, env.IMAGER_TEMPLATES_URL);
        assert.equal(config.avatar.figureBundleUrl, `${pathToFileURL(figures).href}/%libname%.nitro`);
        assert.equal(config.avatar.effectBundleUrl, '');

        assert.throws(() => readImagerConfig({ ...env, IMAGER_FIGURE_BUNDLE_URL: join(root, 'missing'), IMAGER_EFFECTMAP_URL: join(root, 'gone.json') }), /missing is not a folder.*gone\.json is not a file/s);
    });
});

void describe('fetchWithFiles', () => {
    const fetch = fetchWithFiles(() => Promise.resolve(new Response('from the network')));

    void it('reads a file url from disk, and 404s one that is not there', async () => {
        const found = await fetch(pathToFileURL(join(figures, 'hh_human_body.nitro')).href);
        const missing = await fetch(pathToFileURL(join(figures, 'nope.nitro')).href);

        assert.equal(found.status, 200);
        assert.equal(await found.text(), 'bundle bytes');
        assert.equal(missing.status, 404);
    });

    void it('leaves every other url to fetch', async () => {
        assert.equal(await (await fetch('https://cdn.example/x')).text(), 'from the network');
    });
});
