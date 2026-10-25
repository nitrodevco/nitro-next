/**
 * The arithmetic of Flash `HabboTracking`'s per-frame trackers, kept free of the socket and the
 * clock so it can be tested: `trackingCommands` hands each the frame's time and sends what it asks
 * for. Every tracker reads its configuration once, at construction (Flash asks per frame, but the
 * external variables do not change after the client has loaded them), and does nothing but number
 * arithmetic per frame - no allocation.
 *
 * - `PerformanceTracker`: frames over `performancetest.slowupdatelimit` ms (1000) are counted as
 *   slow, the rest averaged. Once more than `performancetest.interval` s (60) have passed since the
 *   last report, while fewer than `performancetest.reportlimit` (10) were sent, a `PerformanceLog`
 *   is due - unless `performancetest.distribution.enabled` holds it back because the average moved
 *   by less than `performancetest.distribution.deviancelimit.percent` (10) since the last report.
 *   A slow frame in the same frame sends it anyway. With `monitor.garbage.collection` every garbage
 *   collection is counted (Flash's `GarbageMonitor` over a weakly held `GarbageTester`).
 * - `FramerateTracker`: the running average frame interval, `frameRate` its rate; every
 *   `tracking.framerate.reportInterval.seconds` (300) up to `tracking.framerate.maximumEvents` (5)
 *   times an `averageFramerate` event for the page.
 * - `LagWarningLogger`: chat answered more than 2.5 s late (`RoomSession.receivedChatWithTrackingId`)
 *   is counted while `lagWarningLog.enabled`; the count goes as a `LagWarningReport` at most once
 *   every `lagWarningLog.interval.seconds` (10).
 *
 * Flash's `int` truncation is kept where the values go out as `int`s.
 *
 * `configReader`'s readers, copied: `tools/habbo-tracking.test.mjs` loads this file on its own, and Node does not
 * resolve an extensionless import of a sibling module.
 */
/** `getInteger(key, default)`: unset gives the default, anything else is `int(value)` - text that is no number is 0. */
const configInteger = (config: Record<string, unknown>, key: string, defaultValue: number): number => {
    const value = config[key];

    if ((value === undefined) || (value === null)) return defaultValue;

    return Number(value) | 0;
};

/** `getBoolean(key)`: `"1"` or `"true"` in any case; anything else, unset included, is false - as `configReader`. */
const configBoolean = (config: Record<string, unknown>, key: string): boolean => {
    const value = config[key];

    if ((typeof value !== 'string') && (typeof value !== 'number') && (typeof value !== 'boolean')) return false;

    const text = String(value);

    return (text === '1') || (text.toLowerCase() === 'true');
};

/** `PerformanceTracker.differenceInPercents`: how far the smaller value is under the larger, in percent. */
const differenceInPercents = (first: number, second: number): number => {
    if (first === second) return 0;

    const larger = (second > first) ? second : first;
    const smaller = (second > first) ? first : second;

    return 100 * (1 - (smaller / larger));
};

/**
 * What the page tells the tracker about itself - Flash read these off `Capabilities` and the
 * browser; the browser stand-ins are chosen by `trackingCommands`.
 */
export interface PerformanceEnvironment {
    userAgent: string;
    flashVersion: string;
    os: string;
    browser: string;
    isDebugger: boolean;
    /** `System.totalMemory` in bytes, -1 where the browser does not tell. */
    readMemory: () => number;
    /** A garbage collection has happened since the last call (`GarbageMonitor` lost its tester). */
    readGarbageCollected: () => boolean;
}

/** `PerformanceLogMessageComposer`'s eleven values, in `sendReport`'s order. */
export interface PerformanceReport {
    elapsedTime: number;
    userAgent: string;
    flashVersion: string;
    oS: string;
    browser: string;
    isDebugger: boolean;
    memoryUsage: number;
    unknownField: number;
    garbageCollections: number;
    averageFrameRate: number;
    slowUpdates: number;
}

export class PerformanceTracker {
    private readonly _environment: PerformanceEnvironment;
    private readonly _garbageMonitored: boolean;
    private readonly _slowUpdateLimit: number;
    private readonly _reportInterval: number;
    private readonly _reportLimit: number;
    private readonly _meanDevianceLimit: number;
    private readonly _useDistribution: boolean;
    private _frameCount = 0;
    private _averageUpdateInterval = 0;
    private _garbageCollections = 0;
    private _slowUpdates = 0;
    private _lastReport: number;
    private _reportCount = 0;
    private _lastReportedAverage = 0;

    /** The constructor: `_lastReport` starts at the client's current time. */
    public constructor(config: Record<string, unknown>, environment: PerformanceEnvironment, now: number) {
        const devianceLimit = config['performancetest.distribution.deviancelimit.percent'];

        this._environment = environment;
        this._garbageMonitored = configBoolean(config, 'monitor.garbage.collection');
        this._slowUpdateLimit = configInteger(config, 'performancetest.slowupdatelimit', 1000);
        this._reportInterval = configInteger(config, 'performancetest.interval', 60);
        this._reportLimit = configInteger(config, 'performancetest.reportlimit', 10);
        this._meanDevianceLimit = ((devianceLimit !== undefined) && (devianceLimit !== null)) ? Number(devianceLimit) : 10;
        this._useDistribution = configBoolean(config, 'performancetest.distribution.enabled');
        this._lastReport = now;
    }

    /** `update(time, now)`: the frame took `time` ms; true when a report is due now - take it with `takeReport`. */
    public update(time: number, now: number): boolean {
        if (this._garbageMonitored && this._environment.readGarbageCollected()) this._garbageCollections++;

        let slowUpdate = false;

        if (time > this._slowUpdateLimit) {
            this._slowUpdates++;
            slowUpdate = true;
        } else {
            this._frameCount++;

            if (this._frameCount <= 1) {
                this._averageUpdateInterval = time;
            } else {
                const count = this._frameCount;

                this._averageUpdateInterval = ((this._averageUpdateInterval * (count - 1)) / count) + (time / count);
            }
        }

        if (((now - this._lastReport) <= (this._reportInterval * 1000)) || (this._reportCount >= this._reportLimit)) return false;

        let send = true;

        if (this._useDistribution && (this._reportCount > 0)) {
            if (differenceInPercents(this._lastReportedAverage, this._averageUpdateInterval) < this._meanDevianceLimit) send = false;
        }

        this._lastReport = now;

        if (!send && !slowUpdate) return false;

        this._lastReportedAverage = this._averageUpdateInterval;
        this._reportCount++;

        return true;
    }

    /** `sendReport(now)`: the report's values, and the counters start over. */
    public takeReport(now: number): PerformanceReport {
        const environment = this._environment;
        const memory = environment.readMemory();
        const report: PerformanceReport = {
            elapsedTime: Math.trunc(now / 1000),
            userAgent: environment.userAgent,
            flashVersion: environment.flashVersion,
            oS: environment.os,
            browser: environment.browser,
            isDebugger: environment.isDebugger,
            memoryUsage: (memory < 0) ? -1 : Math.trunc(memory / 1024),
            unknownField: -1,
            garbageCollections: this._garbageCollections,
            averageFrameRate: Math.trunc(this._averageUpdateInterval),
            slowUpdates: this._slowUpdates,
        };

        this._garbageCollections = 0;
        this._averageUpdateInterval = 0;
        this._frameCount = 0;
        this._slowUpdates = 0;

        return report;
    }

    /** `averageUpdateInterval`: the frame interval averaged since the last report, as an `int`. */
    public get averageUpdateInterval(): number {
        return Math.trunc(this._averageUpdateInterval);
    }
}

export class FramerateTracker {
    private readonly _reportInterval: number;
    private readonly _maximumEvents: number;
    private _frameCount = 0;
    private _averageUpdateInterval = 0;
    private _lastReport = 0;
    private _eventCount = 0;

    public constructor(config: Record<string, unknown>) {
        this._reportInterval = configInteger(config, 'tracking.framerate.reportInterval.seconds', 300);
        this._maximumEvents = configInteger(config, 'tracking.framerate.maximumEvents', 5);
    }

    /** `frameRate`: the average frame interval as frames a second. */
    public get frameRate(): number {
        return Math.round(1000 / this._averageUpdateInterval);
    }

    /** `trackUpdate(time, now)`: true when the `averageFramerate` event is due now. */
    public trackUpdate(time: number, now: number): boolean {
        this._frameCount++;

        if (this._frameCount === 1) {
            this._averageUpdateInterval = time;
            this._lastReport = now;
        } else {
            const count = this._frameCount;

            this._averageUpdateInterval = ((this._averageUpdateInterval * (count - 1)) / count) + (time / count);
        }

        if ((now - this._lastReport) < (this._reportInterval * 1000)) return false;

        this._frameCount = 0;

        if (this._eventCount >= this._maximumEvents) return false;

        this._eventCount++;
        this._lastReport = now;

        return true;
    }
}

export class LagWarningLogger {
    private readonly _enabled: boolean;
    private readonly _warningInterval: number;
    private _lastReportTime = 0;
    private _warningCount = 0;

    public constructor(config: Record<string, unknown>) {
        this._enabled = configBoolean(config, 'lagWarningLog.enabled');
        this._warningInterval = configInteger(config, 'lagWarningLog.interval.seconds', 10) * 1000;
    }

    /** `chatLagDetected(now)`: one more late chat; the warning count to report now, if any. */
    public chatLagDetected(now: number): number | undefined {
        if (!this._enabled || (this._warningInterval <= 0)) return undefined;

        this._warningCount++;

        return this.reportWarningsAsNeeded(now);
    }

    /** `update(now)`, every frame: the warning count to report now, if any. */
    public update(now: number): number | undefined {
        return this.reportWarningsAsNeeded(now);
    }

    private reportWarningsAsNeeded(now: number): number | undefined {
        if (this._warningCount === 0) return undefined;

        if ((this._lastReportTime !== 0) && ((now - this._lastReportTime) <= this._warningInterval)) return undefined;

        const count = this._warningCount;

        this._lastReportTime = now;
        this._warningCount = 0;

        return count;
    }
}

/** `RoomSession`'s chat tracking: the id each chat line goes with, and how late its echo came back. */
export class ChatLagTracker {
    /** `receivedChatWithTrackingId`: an echo later than this is lag. */
    public static readonly LAG_THRESHOLD = 2500;

    private _nextTrackingId = 0;
    private _sentAt = new Map<number, number>();

    /** `sendChatMessage`: the id the next chat line goes with, its send time kept. */
    public nextTrackingId(now: number): number {
        const trackingId = this._nextTrackingId++;

        this._sentAt.set(trackingId, now);

        return trackingId;
    }

    /** `receivedChatWithTrackingId`: true when the line's echo came back later than the threshold. */
    public received(trackingId: number, now: number): boolean {
        const sentAt = this._sentAt.get(trackingId);

        if (sentAt === undefined) return false;

        this._sentAt.delete(trackingId);

        return (now - sentAt) > ChatLagTracker.LAG_THRESHOLD;
    }
}
