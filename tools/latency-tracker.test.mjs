/**
 * The latency test (`nitro-react/src/utils/latencyTracker.ts`) against the Flash `LatencyTracker`
 * it ports: the config gates of `init`, when `update` starts a test, the round trip `onPingResponse`
 * keeps as `latestLatency`, and the report sent every `latencytest.report.index` answers.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { LatencyTracker } = await import('../packages/nitro-react/src/utils/latencyTracker.ts');

const tracker = (config = {}) => {
    const value = new LatencyTracker();

    value.init(config);

    return value;
};

/** Sends `count` pings, each answered `latencies[i]` ms later, starting at `start`; the last answer's report. */
const answer = (value, latencies, start) => {
    let now = start;
    let report;

    for (const latency of latencies) {
        const requestId = value.update(now);

        assert.notEqual(requestId, undefined);
        report = value.onPingResponse(requestId, now + latency);
        now += 30000;
    }

    return { report, now };
};

await test('no answer yet: -1, and nothing before the interval has passed', () => {
    const value = tracker();

    assert.equal(value.latestLatency, -1);
    assert.equal(value.update(20000), undefined);
    assert.equal(value.nextTestTime, 20001);
    assert.equal(value.update(20001), 0);
    assert.equal(value.update(30000), undefined);
    assert.equal(value.update(40002), 1);
});

await test('an interval under 1 leaves the tracker off', () => {
    const value = tracker({ 'latencytest.interval': '0' });

    assert.equal(value.nextTestTime, undefined);
    assert.equal(value.update(1e9), undefined);
    assert.equal(value.onPingResponse(0, 10), undefined);
    assert.equal(value.latestLatency, -1);
    // `int("abc")` is 0, so text that is no number turns it off too.
    assert.equal(tracker({ 'latencytest.interval': 'abc' }).nextTestTime, undefined);
    assert.equal(tracker({ 'latencytest.interval': 500 }).nextTestTime, 501);
});

await test('the round trip of the answered request is the latest latency', () => {
    const value = tracker();
    const first = value.update(25000);
    const second = value.update(50000);

    value.onPingResponse(second, 50042);
    assert.equal(value.latestLatency, 42);
    value.onPingResponse(first, 50100);
    assert.equal(value.latestLatency, 25100);
});

await test('every report.index answers: the truncated average, the average of those under twice it, and the count', () => {
    const value = tracker({ 'latencytest.report.index': 4 });
    // Average 103 (412 / 4, truncated); 300 is not under 206, so the valid average is (30 + 41 + 41) / 3 = 37.
    const { report, now } = answer(value, [ 30, 41, 41, 300 ], 30000);

    assert.deepEqual(report, { averageLatency: 103, validPingAverage: 37, numPings: 4 });

    // The next set averages within the delta (3) of the last report: nothing.
    const next = answer(value, [ 100, 104, 104, 104 ], now);

    assert.equal(next.report, undefined);

    // Moved by more than the delta: reported again.
    assert.deepEqual(answer(value, [ 110, 110, 110, 110 ], next.now).report, { averageLatency: 110, validPingAverage: 110, numPings: 4 });
});

await test('only the answer that completes a set reports; a report.index of 0 never does', () => {
    const value = tracker({ 'latencytest.report.index': 3 });

    assert.equal(answer(value, [ 10, 10 ], 30000).report, undefined);
    assert.equal(answer(tracker({ 'latencytest.report.index': 0 }), [ 10, 10, 10 ], 30000).report, undefined);
});
