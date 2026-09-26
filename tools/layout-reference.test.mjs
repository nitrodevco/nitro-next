/** Regression checks for source drift rejection and Flash layout evidence without asset writes. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('../', import.meta.url));
const revision = JSON.parse(readFileSync(resolve(repo, 'packages/nitro-react/public/config/nitro-config.json'), 'utf8'))['production.version'];

await test('profile text defaults and avatar self-resize anchors come from the generator; drift preserves prior evidence', () => {
    const root = mkdtempSync(join(tmpdir(), 'nitro-reference-test-'));

    try {
        const xml = '<layout name="profile" width="521" height="537"><window><container style="100" name="body"><children><text name="name" width="80" height="17"/><widget name="avatar" params="786432" width="34" height="84"/><widget name="head" params="1048576" width="33" height="34"/></children></container></window></layout>';
        const source = join(root, 'profile.xml');
        const manifestPath = join(root, 'manifest.json');
        const output = join(root, 'report.json');
        const manifest = { feature: 'test', revision, states: [ 'empty' ], sources: [ { kind: 'layout', root: 'NITRO_TEST_REFERENCE', path: 'profile.xml', sha256: createHash('sha256').update(xml).digest('hex') } ] };

        writeFileSync(source, xml);
        writeFileSync(manifestPath, JSON.stringify(manifest));

        const run = () => spawnSync(process.execPath, [ 'tools/layout-reference.mjs', manifestPath, output ], { cwd: repo, encoding: 'utf8', env: { ...process.env, NITRO_TEST_REFERENCE: root } });
        const first = run();

        assert.equal(first.status, 0, first.stderr);

        const saved = readFileSync(output, 'utf8');
        const controls = JSON.parse(saved).layouts[0].controls;

        assert.equal(controls.find(control => control.path === '/body/name').textStyle, 'il_regular');
        assert.deepEqual(controls.find(control => control.path === '/body/avatar').selfResize, [ 'center', 'start' ]);
        assert.deepEqual(controls.find(control => control.path === '/body/head').selfResize, [ 'start', 'end' ]);
        assert.equal(controls[0].clipping, true);
        writeFileSync(source, xml.replace('521', '522'));
        assert.match(run().stderr, /Source changed:/);
        assert.equal(readFileSync(output, 'utf8'), saved);
        manifest.revision = 'wrong-build';
        writeFileSync(manifestPath, JSON.stringify(manifest));
        assert.match(run().stderr, /Reference revision differs/);
        assert.equal(readFileSync(output, 'utf8'), saved);
        const missing = spawnSync(process.execPath, [ 'packages/nitro-react/scripts/generate-layout-views.ts' ], {
            cwd: repo, encoding: 'utf8', env: { ...process.env, NITRO_FLASH_RESOURCES: join(root, 'missing-resources'), NITRO_AS3_ROOT: join(root, 'missing-as3') },
        });

        assert.notEqual(missing.status, 0);
        assert.match(missing.stderr, /Missing reference inputs/);
    } finally {
        // mkdtemp creates this exclusively under the operating system temp directory.
        rmSync(root, { recursive: true, force: true });
    }
});
