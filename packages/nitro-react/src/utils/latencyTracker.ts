/**
 * The Flash `LatencyTracker`'s arithmetic, kept free of the socket and the clock so it can be
 * tested: `latencyCommands` hands it the time and sends what it asks for.
 *
 * - `init` reads `latencytest.interval` (20000 ms), `latencytest.report.index` (100) and
 *   `latencytest.report.delta` (3); an interval under 1 leaves the tracker off.
 * - `update` starts a test once more than the interval has passed since the last one
 *   (`testLatency`): the request id and the time it went are kept.
 * - `onPingResponse`: the round trip is the latest latency (`latestLatency`, -1 until the first
 *   answer). Every `report.index` answers, the average and the average of the answers under twice
 *   it are reported - but only the first time, or when the average moved by more than
 *   `report.delta` since the last report - and the answers start over.
 *
 * Flash's `int` truncation is kept: the averages are whole milliseconds.
 */
export interface LatencyReport {
    averageLatency: number;
    validPingAverage: number;
    numPings: number;
}

/** `getInteger(key, default)`: unset gives the default, anything else is `int(value)` - text that is no number is 0. */
const configInteger = (config: Record<string, unknown>, key: string, defaultValue: number): number => {
    const value = config[key];

    if ((value === undefined) || (value === null)) return defaultValue;

    return Number(value) | 0;
};

export class LatencyTracker {
    private _enabled = false;
    private _requestId = 0;
    private _interval = 0;
    private _reportIndex = 0;
    private _reportDelta = 0;
    private _lastTestTime = 0;
    private _lastReportedAverage = 0;
    private _latestLatency = -1;
    private _latencyValues: number[] = [];
    private _pendingRequests = new Map<number, number>();

    /** `init`, on `HabboTracking.onConfigurationComplete`. */
    public init(config: Record<string, unknown>): void {
        this._interval = configInteger(config, 'latencytest.interval', 20000);
        this._reportIndex = configInteger(config, 'latencytest.report.index', 100);
        this._reportDelta = configInteger(config, 'latencytest.report.delta', 3);

        if (this._interval < 1) return;

        this._pendingRequests = new Map();
        this._latencyValues = [];
        this._enabled = true;
    }

    /**
     * The first time `update` starts the next test - Flash asks every frame, so a timer set for this
     * time stands in for the frames between. Undefined while the tracker is off.
     */
    public get nextTestTime(): number | undefined {
        return this._enabled ? (this._lastTestTime + this._interval + 1) : undefined;
    }

    /** `update`: the id of the request to send when a test is due, undefined otherwise. */
    public update(now: number): number | undefined {
        if (!this._enabled) return undefined;

        if ((now - this._lastTestTime) <= this._interval) return undefined;

        return this.testLatency(now);
    }

    /** `testLatency`: the next request id, its send time kept. */
    private testLatency(now: number): number {
        const requestId = this._requestId;

        this._lastTestTime = now;
        this._pendingRequests.set(requestId, now);
        this._requestId++;

        return requestId;
    }

    /** `onPingResponse`: the report to send, when this answer completes a set that warrants one. */
    public onPingResponse(requestId: number, now: number): LatencyReport | undefined {
        if (!this._enabled) return undefined;

        // `Map.getValue` of an id never asked for is null, which an `int` reads as 0.
        const sentAt = this._pendingRequests.get(requestId) ?? 0;

        this._pendingRequests.delete(requestId);
        this._latestLatency = now - sentAt;
        this._latencyValues.push(this._latestLatency);

        if ((this._latencyValues.length !== this._reportIndex) || (this._reportIndex <= 0)) return undefined;

        const values = this._latencyValues;
        const average = Math.trunc(values.reduce((total, value) => total + value, 0) / values.length);
        let validTotal = 0;
        let validCount = 0;

        for (const value of values) {
            if (value >= (average * 2)) continue;

            validTotal += value;
            validCount++;
        }

        this._latencyValues = [];

        if (validCount === 0) return undefined;

        if ((Math.abs(average - this._lastReportedAverage) <= this._reportDelta) && (this._lastReportedAverage !== 0)) return undefined;

        this._lastReportedAverage = average;

        return { averageLatency: average, validPingAverage: Math.trunc(validTotal / validCount), numPings: values.length };
    }

    /** `latestLatency` - `HabboTracking.latencyPingMs`: the last round trip in ms, -1 before the first. */
    public get latestLatency(): number {
        return this._latestLatency;
    }
}
