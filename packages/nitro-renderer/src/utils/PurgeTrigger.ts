/**
 * Flash `core/utils/PurgeTrigger`: every `frequencyMilliSeconds` it checks the memory in use and,
 * past `softPurgeTriggerMegaBytes`, runs `Core.purge()` - which reaches the room engine and makes
 * the room content loader release the furni and pet collections nothing has drawn with for a
 * while (`RoomContentLoader.purge`); what is needed again is downloaded again.
 *
 * Flash measured `System.totalMemory - freeMemory`, which counts the bitmaps. A browser has no
 * figure like that: `performance.memory` (Chrome only) is the JavaScript heap, and a texture lives
 * on the GPU, outside it. So this runs Flash's own branch for a player without memory data
 * (`isMemoryDataAvailable` false): the interval doubles to 120 seconds and the soft trigger drops
 * to 0, i.e. it purges on every interval. The hard trigger's `pauseForGCIfCollectionImminent` has
 * no counterpart - a page cannot ask for a collection.
 */
export class PurgeTrigger {
    /** Flash's `frequencyMilliSeconds` default, doubled when there is no memory data. */
    private static FREQUENCY_MS: number = 60000 * 2;

    private static _timer: ReturnType<typeof setTimeout> | undefined = undefined;
    private static _purge: (() => void) | undefined = undefined;

    private static onInterval = (): void => {
        if (PurgeTrigger._timer === undefined) return;

        PurgeTrigger.trigger();

        PurgeTrigger._timer = setTimeout(PurgeTrigger.onInterval, PurgeTrigger.FREQUENCY_MS);
    };

    public static get isRunning(): boolean {
        return PurgeTrigger._timer !== undefined;
    }

    /** Flash `start`: the first purge one interval from now, then one per interval. */
    public static start(purge: () => void): void {
        PurgeTrigger._purge = purge;

        if (PurgeTrigger._timer !== undefined) return;

        PurgeTrigger._timer = setTimeout(PurgeTrigger.onInterval, PurgeTrigger.FREQUENCY_MS);
    }

    public static stop(): void {
        if (PurgeTrigger._timer !== undefined) clearTimeout(PurgeTrigger._timer);

        PurgeTrigger._timer = undefined;
    }

    /** Flash `trigger`: with no memory data the soft trigger is 0, so it always purges. */
    public static trigger(): void {
        PurgeTrigger._purge?.();
    }
}
