import { GetConfigValue } from '@nitrodevco/nitro-api';

type LoadPhase = 'requested' | 'slot' | 'fetch' | 'headers' | 'body' | 'decoded' | 'ready';

interface ILoadRecord {
    url: string;
    label: string;
    attempt: number;
    bytes: number;
    /** Time spent inflating zip entries, summed over the bundle. */
    inflateMs: number;
    /** Time spent turning PNG entries into textures (the browser's decode), summed over the bundle. */
    imageMs: number;
    ok: boolean | undefined;
    marks: Partial<Record<LoadPhase, number>>;
}

/**
 * Measures where a room's content load spends its time, so a change can be judged against
 * numbers rather than a feeling. Off unless `debug.load.metrics` is set in the config, or
 * `localStorage['nitro.loadMetrics']` is `1` (so it can be switched on from the console, then
 * reload). While off every call returns at once.
 *
 * Per downloaded url it keeps the time each phase was reached:
 *
 *   requested -> slot      waiting for one of the loader's download slots
 *   slot      -> fetch     (immediate unless something else holds the thread)
 *   fetch     -> headers   server think time plus the network round trip - what a CDN cache removes
 *   headers   -> body      the transfer itself
 *   body      -> decoded   inflate, JSON parse and image decode of the bundle
 *   decoded   -> ready     spritesheet parse and collection creation
 *
 * The GPU upload happens at a texture's first draw and is not part of any phase. Each finished
 * phase is also written to the browser's Timings track (`performance.measure`), and
 * `window.__nitroLoadMetrics.report()` prints a summary table.
 */
export class LoadMetrics {
    private static readonly STORAGE_KEY: string = 'nitro.loadMetrics';

    private static _enabled: boolean | undefined = undefined;
    private static _records: Map<string, ILoadRecord> = new Map();
    private static _done: ILoadRecord[] = [];
    private static _attempts: Map<string, number> = new Map();
    private static _events: { name: string; at: number; detail?: unknown }[] = [];
    private static _longTasks: { at: number; duration: number }[] = [];
    private static _observer: PerformanceObserver | undefined = undefined;

    public static get enabled(): boolean {
        if (LoadMetrics._enabled === undefined) LoadMetrics.enable();

        return LoadMetrics._enabled === true;
    }

    private static enable(): void {
        let stored = false;

        try {
            stored = (globalThis.localStorage?.getItem(LoadMetrics.STORAGE_KEY) === '1');
        } catch {
            stored = false;
        }

        LoadMetrics._enabled = (GetConfigValue<boolean>('debug.load.metrics') === true) || stored;

        if (!LoadMetrics._enabled) return;

        (globalThis as unknown as { __nitroLoadMetrics: unknown }).__nitroLoadMetrics = {
            report: () => LoadMetrics.report(),
            reset: () => LoadMetrics.reset(),
            records: () => [ ...LoadMetrics._records.values() ],
            events: () => LoadMetrics._events,
        };

        try {
            LoadMetrics._observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) LoadMetrics._longTasks.push({ at: entry.startTime, duration: entry.duration });
            });

            LoadMetrics._observer.observe({ type: 'longtask', buffered: true });
        } catch {
            // Long tasks are not reported everywhere; the rest still works.
        }
    }

    private static record(url: string, label?: string): ILoadRecord {
        let record = LoadMetrics._records.get(url);

        if (!record) {
            const attempt = (LoadMetrics._attempts.get(url) ?? 0) + 1;

            LoadMetrics._attempts.set(url, attempt);

            record = {
                url,
                label: label ?? url.slice(url.lastIndexOf('/') + 1),
                attempt,
                bytes: 0,
                inflateMs: 0,
                imageMs: 0,
                ok: undefined,
                marks: { requested: performance.now() },
            };

            LoadMetrics._records.set(url, record);
        } else if (label) {
            record.label = label;
        }

        return record;
    }

    /** A url is wanted now. `label` is the content type, for the report. */
    public static begin(url: string, label: string): void {
        if (!LoadMetrics.enabled) return;

        LoadMetrics.record(url, label);
    }

    public static mark(url: string, phase: LoadPhase): void {
        if (!LoadMetrics.enabled) return;

        LoadMetrics.record(url).marks[phase] = performance.now();
    }

    public static addBytes(url: string, bytes: number): void {
        if (!LoadMetrics.enabled) return;

        LoadMetrics.record(url).bytes += bytes;
    }

    public static addTime(url: string, field: 'inflateMs' | 'imageMs', ms: number): void {
        if (!LoadMetrics.enabled) return;

        LoadMetrics.record(url)[field] += ms;
    }

    /** The url's content is usable (or failed). Closes the record and writes it to the Timings track. */
    public static end(url: string, ok: boolean): void {
        if (!LoadMetrics.enabled) return;

        const record = LoadMetrics.record(url);

        record.ok = ok;
        record.marks.ready = performance.now();

        const order: LoadPhase[] = [ 'requested', 'slot', 'fetch', 'headers', 'body', 'decoded', 'ready' ];

        try {
            for (let i = 1; i < order.length; i++) {
                const start = record.marks[order[i - 1]];
                const end = record.marks[order[i]];

                if ((start === undefined) || (end === undefined)) continue;

                performance.measure(`nitro:${order[i]} ${record.label}`, { start, end });
            }
        } catch {
            // The Timings track is a convenience.
        }

        // Closed records leave the live map so the same url can be recorded again (a re-download).
        LoadMetrics._records.delete(url);
        LoadMetrics._done.push(record);
    }

    /** A point in the load worth lining up with the records: a room entered, a purge run. */
    public static event(name: string, detail?: unknown): void {
        if (!LoadMetrics.enabled) return;

        LoadMetrics._events.push({ name, at: performance.now(), detail });

        try {
            performance.mark(`nitro:${name}`, { detail });
        } catch {
            // As above.
        }
    }

    public static reset(): void {
        LoadMetrics._records.clear();
        LoadMetrics._done = [];
        LoadMetrics._events = [];
        LoadMetrics._longTasks = [];
    }

    private static median(values: number[]): number {
        if (!values.length) return 0;

        const sorted = [ ...values ].sort((a, b) => a - b);

        return sorted[Math.floor(sorted.length / 2)];
    }

    private static p90(values: number[]): number {
        if (!values.length) return 0;

        const sorted = [ ...values ].sort((a, b) => a - b);

        return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.9))];
    }

    /** Prints the summary and returns it. Call it once a room has settled. */
    public static report(): unknown {
        const done = LoadMetrics._done.filter(record => record.ok !== undefined);

        if (!done.length) {
            console.info('[nitro load metrics] nothing recorded yet');

            return undefined;
        }

        const gap = (record: ILoadRecord, from: LoadPhase, to: LoadPhase): number | undefined => {
            const start = record.marks[from];
            const end = record.marks[to];

            return ((start === undefined) || (end === undefined)) ? undefined : (end - start);
        };

        const rows: Record<string, { n: number; median: number; p90: number; total: number }> = {};

        const phases: [ string, LoadPhase, LoadPhase ][] = [
            [ 'queue wait (requested->slot)', 'requested', 'slot' ],
            [ 'server+rtt (fetch->headers)', 'fetch', 'headers' ],
            [ 'transfer (headers->body)', 'headers', 'body' ],
            [ 'inflate+decode (body->decoded)', 'body', 'decoded' ],
            [ 'collection (decoded->ready)', 'decoded', 'ready' ],
            [ 'whole (requested->ready)', 'requested', 'ready' ],
        ];

        for (const [ name, from, to ] of phases) {
            const values = done.map(record => gap(record, from, to)).filter((value): value is number => (value !== undefined));

            rows[name] = {
                n: values.length,
                median: Math.round(LoadMetrics.median(values)),
                p90: Math.round(LoadMetrics.p90(values)),
                total: Math.round(values.reduce((sum, value) => sum + value, 0)),
            };
        }

        const starts = done.map(record => record.marks.requested ?? 0);
        const ends = done.map(record => record.marks.ready ?? 0);
        const first = Math.min(...starts);
        const last = Math.max(...ends);

        // Downloads in flight (past `slot`, before `body`): what the slot count actually achieved.
        const edges: [ number, number ][] = [];

        for (const record of done) {
            const start = record.marks.slot ?? record.marks.fetch;
            const end = record.marks.body;

            if ((start === undefined) || (end === undefined)) continue;

            edges.push([ start, 1 ], [ end, -1 ]);
        }

        edges.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));

        let inFlight = 0;
        let peak = 0;

        for (const [ , delta ] of edges) {
            inFlight += delta;
            peak = Math.max(peak, inFlight);
        }

        const longTasks = LoadMetrics._longTasks.filter(task => (task.at >= first) && (task.at <= last));
        const redownloads = done.filter(record => record.attempt > 1);

        const summary = {
            downloads: done.length,
            failed: done.filter(record => !record.ok).length,
            redownloads: redownloads.length,
            redownloadedLabels: [ ...new Set(redownloads.map(record => record.label)) ].slice(0, 20),
            wallMs: Math.round(last - first),
            peakInFlight: peak,
            megabytes: Math.round(done.reduce((sum, record) => sum + record.bytes, 0) / 1e4) / 100,
            inflateMsTotal: Math.round(done.reduce((sum, record) => sum + record.inflateMs, 0)),
            imageDecodeMsTotal: Math.round(done.reduce((sum, record) => sum + record.imageMs, 0)),
            longTasksDuringLoad: longTasks.length,
            longTaskMsDuringLoad: Math.round(longTasks.reduce((sum, task) => sum + task.duration, 0)),
        };

        console.info('[nitro load metrics] ms per phase');
        console.table(rows);
        console.info('[nitro load metrics] summary', summary);

        const slowest = [ ...done ]
            .sort((a, b) => ((b.marks.ready ?? 0) - (b.marks.requested ?? 0)) - ((a.marks.ready ?? 0) - (a.marks.requested ?? 0)))
            .slice(0, 10)
            .map(record => ({
                type: record.label,
                attempt: record.attempt,
                kb: Math.round(record.bytes / 1024),
                queue: Math.round(gap(record, 'requested', 'slot') ?? 0),
                server: Math.round(gap(record, 'fetch', 'headers') ?? 0),
                transfer: Math.round(gap(record, 'headers', 'body') ?? 0),
                decode: Math.round(gap(record, 'body', 'decoded') ?? 0),
                inflate: Math.round(record.inflateMs),
                image: Math.round(record.imageMs),
            }));

        console.info('[nitro load metrics] ten slowest');
        console.table(slowest);

        return { phases: rows, summary, events: LoadMetrics._events };
    }
}
