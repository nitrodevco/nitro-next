/**
 * The per-frame trackers (`nitro-react/src/utils/habboTracking.ts`) against the Flash
 * `PerformanceTracker`, `FramerateTracker`, `LagWarningLogger` and `RoomSession`'s chat tracking
 * they port: the config gates, when a report is due and what it carries, and the cost of one frame
 * (no allocation, well under the 0.5 ms budget).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { ChatLagTracker, FramerateTracker, LagWarningLogger, PerformanceTracker } = await import('../packages/nitro-react/src/utils/habboTracking.ts');

const environment = (overrides = {}) => ({
    userAgent: 'agent',
    flashVersion: 'build',
    os: 'Windows',
    browser: '',
    isDebugger: false,
    readMemory: () => 2048 * 1024,
    readGarbageCollected: () => false,
    ...overrides,
});

/** Runs frames of `time` ms from `start` until `end`; the times a report was due. */
const frames = (tracker, time, start, end) => {
    const due = [];

    for (let now = start + time; now <= end; now += time) {
        if (tracker.update(time, now)) due.push(now);
    }

    return due;
};

await test('PerformanceLog: due once more than performancetest.interval s have passed, with the frames since', () => {
    const tracker = new PerformanceTracker({}, environment(), 0);

    assert.deepEqual(frames(tracker, 20, 0, 60000), []);
    assert.equal(tracker.update(20, 60020), true);

    const report = tracker.takeReport(60020);

    assert.deepEqual(report, {
        elapsedTime: 60,
        userAgent: 'agent',
        flashVersion: 'build',
        oS: 'Windows',
        browser: '',
        isDebugger: false,
        memoryUsage: 2048,
        unknownField: -1,
        garbageCollections: 0,
        averageFrameRate: 20,
        slowUpdates: 0,
    });
    assert.equal(tracker.averageUpdateInterval, 0);
});

await test('PerformanceLog: the official interval (2147483647 s) never sends; reportlimit caps the count', () => {
    const official = new PerformanceTracker({ 'performancetest.interval': '2147483647' }, environment(), 0);

    assert.deepEqual(frames(official, 1000, 0, 3600000), []);

    const limited = new PerformanceTracker({ 'performancetest.interval': '1', 'performancetest.reportlimit': '2' }, environment(), 0);
    const due = frames(limited, 500, 0, 10000);

    assert.deepEqual(due, [ 1500, 3000 ]);
});

await test('PerformanceLog: slow frames are counted, not averaged; one in the due frame sends past the distribution check', () => {
    const config = { 'performancetest.interval': '1', 'performancetest.distribution.enabled': 'true' };
    const tracker = new PerformanceTracker(config, environment(), 0);

    assert.equal(tracker.update(20, 500), false);
    assert.equal(tracker.update(1001, 1501), true);

    const first = tracker.takeReport(1501);

    assert.equal(first.slowUpdates, 1);
    assert.equal(first.averageFrameRate, 20);

    // The same average again is held back by the distribution check...
    assert.equal(tracker.update(20, 2000), false);
    assert.equal(tracker.update(20, 2600), false);
    // ...unless the due frame itself is slow.
    assert.equal(tracker.update(20, 3000), false);
    assert.equal(tracker.update(5000, 8000), true);
    assert.equal(tracker.takeReport(8000).slowUpdates, 1);
});

await test('PerformanceLog: the distribution check sends when the average moved by the deviance limit', () => {
    const config = { 'performancetest.interval': '1', 'performancetest.distribution.enabled': '1', 'performancetest.distribution.deviancelimit.percent': '25' };
    const tracker = new PerformanceTracker(config, environment(), 0);

    assert.deepEqual(frames(tracker, 20, 0, 1020), [ 1020 ]);
    tracker.takeReport(1020);
    // 20 -> 24 ms is 16.7 %: held back.
    assert.deepEqual(frames(tracker, 24, 1020, 2100), []);
    tracker.takeReport(2100);
    // 20 -> 40 ms is 50 %: sent.
    assert.deepEqual(frames(tracker, 40, 2100, 3200).length, 1);
});

await test('PerformanceLog: garbage collections only with monitor.garbage.collection; memory unknown is -1', () => {
    let collected = 0;
    const readGarbageCollected = () => (++collected % 2) === 0;
    const off = new PerformanceTracker({ 'performancetest.interval': '1' }, environment({ readGarbageCollected }), 0);

    frames(off, 100, 0, 1100);
    assert.equal(off.takeReport(1100).garbageCollections, 0);
    assert.equal(collected, 0);

    const on = new PerformanceTracker({ 'performancetest.interval': '1', 'monitor.garbage.collection': 'true' }, environment({ readGarbageCollected, readMemory: () => -1 }), 0);

    frames(on, 100, 0, 1100);

    const report = on.takeReport(1100);

    assert.equal(report.garbageCollections, 5);
    assert.equal(report.memoryUsage, -1);
});

await test('FramerateTracker: the running average as a rate; events every interval up to maximumEvents', () => {
    const tracker = new FramerateTracker({ 'tracking.framerate.reportInterval.seconds': '1', 'tracking.framerate.maximumEvents': '2' });
    const due = [];

    for (let now = 25; now <= 10000; now += 25) {
        if (tracker.trackUpdate(25, now)) due.push(now);
    }

    assert.equal(tracker.frameRate, 40);
    assert.deepEqual(due, [ 1025, 2050 ]);

    const official = new FramerateTracker({ 'tracking.framerate.reportInterval.seconds': '2147483647' });

    for (let now = 20; now <= 100000; now += 20) assert.equal(official.trackUpdate(20, now), false);
    assert.equal(official.frameRate, 50);
});

await test('LagWarningReport: off unless lagWarningLog.enabled; at most once per interval with the count since', () => {
    const off = new LagWarningLogger({});

    assert.equal(off.chatLagDetected(1000), undefined);
    assert.equal(off.update(100000), undefined);

    const logger = new LagWarningLogger({ 'lagWarningLog.enabled': '1' });

    assert.equal(logger.chatLagDetected(1000), 1);
    assert.equal(logger.chatLagDetected(5000), undefined);
    assert.equal(logger.chatLagDetected(9000), undefined);
    assert.equal(logger.update(11000), undefined);
    assert.equal(logger.update(11001), 2);
    assert.equal(logger.update(30000), undefined);
});

await test('chat tracking ids count from 0 per session; an echo over 2.5 s late is lag', () => {
    const chat = new ChatLagTracker();

    assert.equal(chat.nextTrackingId(0), 0);
    assert.equal(chat.nextTrackingId(100), 1);
    assert.equal(chat.received(0, 2500), false);
    assert.equal(chat.received(1, 2601), true);
    assert.equal(chat.received(1, 9000), false);
    assert.equal(chat.received(7, 9000), false);
});

await test('one frame of all three trackers: no allocation, far under 0.5 ms', () => {
    const config = { 'lagWarningLog.enabled': '1', 'performancetest.interval': '2147483647', 'tracking.framerate.reportInterval.seconds': '2147483647' };
    const performance = new PerformanceTracker(config, environment(), 0);
    const framerate = new FramerateTracker(config);
    const lag = new LagWarningLogger(config);
    const count = 1000000;
    const track = (now) => {
        performance.update(16, now);
        framerate.trackUpdate(16, now);
        lag.update(now);
    };
    const idle = () => { };
    /** Heap growth and time over `count` frames of `frame`, after warming it up. */
    const measure = (frame) => {
        const run = (start) => {
            for (let index = 1; index <= count; index++) frame(start + (index * 16));
        };

        for (let round = 0; round < 4; round++) run(round * count * 16);
        globalThis.gc?.();

        const heapBefore = process.memoryUsage().heapUsed;
        const started = process.hrtime.bigint();

        run(4 * count * 16);

        return { ns: Number(process.hrtime.bigint() - started) / count, heap: process.memoryUsage().heapUsed - heapBefore };
    };

    // The test runner allocates beside the loop: an empty frame is the baseline.
    const baseline = measure(idle);
    const tracked = measure(track);
    const growth = tracked.heap - baseline.heap;

    console.info(`per frame ${(tracked.ns - baseline.ns).toFixed(1)} ns, heap growth over ${count} frames ${growth} B beyond an empty frame (${tracked.heap} B in all)`);
    assert.ok(tracked.ns < 500000 / 100, `per frame ${tracked.ns} ns`);
    assert.ok(growth < 64 * 1024, `heap grew ${growth} B`);
});
