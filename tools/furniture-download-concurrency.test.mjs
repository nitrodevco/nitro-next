/**
 * How many furniture downloads run at once (`nitro-renderer/src/room/furnitureDownloadConcurrency.ts`):
 * the hotel's setting when it is a sane one, 4 where memory is short, 32 otherwise.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { chooseFurnitureDownloadConcurrency, DEFAULT_FURNITURE_DOWNLOADS, LOW_END_FURNITURE_DOWNLOADS, MAX_FURNITURE_DOWNLOADS } = await import('../packages/nitro-renderer/src/room/furnitureDownloadConcurrency.ts');

await test('the numbers are what was measured and what a phone always had', () => {
    assert.equal(LOW_END_FURNITURE_DOWNLOADS, 4);
    assert.equal(DEFAULT_FURNITURE_DOWNLOADS, 32);
    assert.equal(MAX_FURNITURE_DOWNLOADS, 64);
});

await test('a device that says nothing is a desktop', () => {
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, {}), 32);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { deviceMemory: 8, hardwareConcurrency: 16, coarsePointer: false, saveData: false }), 32);
});

await test('a touch screen, save-data, little memory or few processors keeps four', () => {
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { coarsePointer: true }), 4);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { saveData: true }), 4);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { deviceMemory: 2 }), 4);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { deviceMemory: 0.5 }), 4);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { hardwareConcurrency: 2 }), 4);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { hardwareConcurrency: 1 }), 4);
});

await test('4GB and four processors is not short of memory', () => {
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { deviceMemory: 4, hardwareConcurrency: 4 }), 32);
});

await test('one weak signal is enough, whatever the others say', () => {
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { deviceMemory: 8, hardwareConcurrency: 16, coarsePointer: true }), 4);
    assert.equal(chooseFurnitureDownloadConcurrency(undefined, { deviceMemory: 8, hardwareConcurrency: 2 }), 4);
});

await test('a hotel can set it, and that beats what the device says', () => {
    assert.equal(chooseFurnitureDownloadConcurrency(6, {}), 6);
    assert.equal(chooseFurnitureDownloadConcurrency(1, {}), 1);
    assert.equal(chooseFurnitureDownloadConcurrency(64, {}), 64);
    assert.equal(chooseFurnitureDownloadConcurrency(12, { coarsePointer: true, deviceMemory: 1 }), 12, 'the hotel knows its players');
});

await test('a setting that is not a whole number from 1 to 64 is ignored, not obeyed', () => {
    for (const bad of [ 0, -4, 65, 100, 3.5, NaN, Infinity, '8', '', null, true, {}, [] ]) {
        assert.equal(chooseFurnitureDownloadConcurrency(bad, {}), 32, `desktop, ${JSON.stringify(bad)}`);
        assert.equal(chooseFurnitureDownloadConcurrency(bad, { coarsePointer: true }), 4, `phone, ${JSON.stringify(bad)}`);
    }
});
