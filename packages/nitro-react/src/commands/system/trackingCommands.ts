/**
 * Flash `HabboTracking`: the client's own reports to the server and the page.
 *
 * - Every frame (`update`, an update receiver): `PerformanceTracker` (`PerformanceLog`),
 *   `FramerateTracker` (the fps `ClientPerformance` reports, an `averageFramerate` event for the
 *   page) and `LagWarningLogger` (`LagWarningReport`) - the arithmetic is in `#base/utils`
 *   `habboTracking`. `startHabboTracking` hangs them on the shared ticker for the connection.
 * - `trackEventLog` / `trackEventLogOncePerSession` / `trackTalentTrackOpen`: an `EventLog` to the
 *   server, only while connected.
 * - `trackLoginStep` (`processlog.enabled`) and `trackGoogle`: Flash calls the page around it
 *   (`ExternalInterface.call("FlashExternalInterface.<name>", ...)`); here the same functions on
 *   the page's `window.FlashExternalInterface`, when the hosting page defines it.
 * - `onRoomAction`: 60 s after a room engine comes up, one `EventLog("ClientPerformance", fps,
 *   "fps", "Avatars: n, Objects: n", roomId)` for it.
 * - `RoomSession`'s chat lag: each chat line goes with a tracking id; an echo later than 2.5 s is a
 *   `chatLagDetected`.
 *
 * Browser stand-ins for what Flash read off the player (`PerformanceTracker`'s constructor and
 * `sendReport`): the user agent is `navigator.userAgent` (Flash asked the page the same way), the
 * Flash version is the client build, the OS is the browser's platform, the browser stays `""`
 * (Flash never fills it), debugger is a development build, the memory is Chrome's
 * `performance.memory.usedJSHeapSize` (-1 elsewhere), and a garbage collection is a weakly held
 * tester object the browser has collected. A frame after the page was hidden is not measured: the
 * browser stops drawing a hidden page, where Flash kept ticking slower.
 */
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { EventLogComposer, LagWarningReportComposer, PerformanceLogComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';

import { Send } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { configBoolean, systemStore } from '#base/context/system';
import { ChatLagTracker, clientBuild, FramerateTracker, getTimer, LagWarningLogger, PerformanceEnvironment, PerformanceTracker, tryCallPageFunction } from '#base/utils';

/** `HabboTracking.onRoomAction`: the `ClientPerformance` report this long after a room engine came up. */
const ROOM_PERFORMANCE_DELAY = 60000;

/** `GarbageMonitor` over one weakly held `GarbageTester`: true once the browser has collected it, and a new one is held. */
const createGarbageMonitor = () => {
    let tester = new WeakRef({});

    return () => {
        if (tester.deref() !== undefined) return false;

        tester = new WeakRef({});

        return true;
    };
};

const createEnvironment = (): PerformanceEnvironment => {
    const userAgentData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
    const memory = (performance as Performance & { memory?: { usedJSHeapSize?: number } }).memory;

    return {
        userAgent: navigator.userAgent || 'unknown',
        flashVersion: clientBuild(),
        os: userAgentData?.platform || navigator.platform || '',
        browser: '',
        isDebugger: import.meta.env.DEV,
        readMemory: () => memory?.usedJSHeapSize ?? -1,
        readGarbageCollected: createGarbageMonitor(),
    };
};

type TrackingSession = {
    send: Send;
    performance: PerformanceTracker;
    framerate: FramerateTracker;
    lagWarning: LagWarningLogger;
};

let session: TrackingSession | undefined;
let chatLag = new ChatLagTracker();
const onceTrackedEvents = new Set<string>();

/** `trackGoogle(category, action, value)`: the page's `track`. */
export const trackGoogle = (category: string, action: string, value: number = -1) => tryCallPageFunction('FlashExternalInterface.track', category, action, value);

/** `trackLoginStep(step, data)`: the page's `logLoginStep`, only with `processlog.enabled`. */
export const trackLoginStep = (step: string, data?: string) => {
    if (!configBoolean('processlog.enabled')) return;

    if (data !== undefined) tryCallPageFunction('FlashExternalInterface.logLoginStep', step, data);
    else tryCallPageFunction('FlashExternalInterface.logLoginStep', step);
};

/** `trackEventLog(category, type, action, extraString, extraInt)`: an `EventLog`, only while connected. */
export const trackEventLog = (send: Send, category: string, type: string, action: string, extraString: string = '', extraInt: number = 0) => {
    send(new EventLogComposer({ event: category, data: type, action, extraString, extraInt }));
};

/** `trackEventLogOncePerSession`: the same, at most once per client session for one category, type and action. */
export const trackEventLogOncePerSession = (send: Send, category: string, type: string, action: string, extraString: string = '', extraInt: number = 0) => {
    const key = category + type + action;

    if (onceTrackedEvents.has(key)) return;

    trackEventLog(send, category, type, action, extraString, extraInt);
    onceTrackedEvents.add(key);
};

/** `trackTalentTrackOpen(track, source)`. */
export const trackTalentTrackOpen = (send: Send, track: string, source: string) => trackEventLog(send, 'Talent', track, 'talent.open', source);

/** `RoomSession.sendChatMessage`: the tracking id the next chat line goes with. */
export const nextChatTrackingId = () => chatLag.nextTrackingId(getTimer());

/** `RoomSession.receivedChatWithTrackingId`: an echo later than 2.5 s is `chatLagDetected`. */
export const receivedChatWithTrackingId = (trackingId: number) => {
    if (trackingId === -1) return;

    const now = getTimer();

    if (!chatLag.received(trackingId, now) || !session) return;

    const warningCount = session.lagWarning.chatLagDetected(now);

    if (warningCount !== undefined) session.send(new LagWarningReportComposer({ warningCount }));
};

/**
 * `HabboTracking.update`, on the shared ticker: a frame's time is the whole milliseconds since the
 * frame before, as Flash's `getTimer()` measures it.
 */
const startFrameTracking = (current: TrackingSession) => {
    const ticker = GetTicker();
    let lastTime = -1;

    const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') lastTime = -1;
    };

    const update = () => {
        const now = getTimer();

        if (lastTime < 0) {
            lastTime = now;

            return;
        }

        const time = now - lastTime;

        lastTime = now;

        if (current.performance.update(time, now)) current.send(new PerformanceLogComposer(current.performance.takeReport(now)));

        if (current.framerate.trackUpdate(time, now)) trackGoogle('performance', 'averageFramerate', current.framerate.frameRate);

        const warningCount = current.lagWarning.update(now);

        if (warningCount !== undefined) current.send(new LagWarningReportComposer({ warningCount }));
    };

    ticker.add(update);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
        ticker.remove(update);
        document.removeEventListener('visibilitychange', onVisibilityChange);
    };
};

/**
 * `onRoomAction`: `REE_INITIALIZED` starts a one-shot 60 s timer for the room, unless one runs;
 * `REE_DISPOSED` drops it. A room replaced by the next is disposed first. When it fires the room
 * on screen is counted: units, and floor plus wall items.
 */
const startRoomPerformanceTracking = (current: TrackingSession) => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const stopTimer = () => {
        clearTimeout(timer);
        timer = undefined;
    };

    const onTimer = (roomId: number) => {
        const room = getRoom();
        let objects = '';

        if (room) {
            const avatars = room.getTotalObjectsForManager(RoomObjectCategoryEnum.Unit);
            const items = room.getTotalObjectsForManager(RoomObjectCategoryEnum.Floor) + room.getTotalObjectsForManager(RoomObjectCategoryEnum.Wall);

            objects = `Avatars: ${avatars}, Objects: ${items}`;
        }

        trackEventLog(current.send, 'ClientPerformance', String(current.framerate.frameRate), 'fps', objects, roomId);
    };

    const unsubscribe = roomStore.subscribe((state, previous) => {
        if (state.room === previous.room) return;

        if (previous.room) stopTimer();

        // `RoomSession`'s chat tracking ids start over with each room session.
        chatLag = new ChatLagTracker();

        if (!state.room || timer) return;

        const roomId = state.room.roomId;

        timer = setTimeout(() => onTimer(roomId), ROOM_PERFORMANCE_DELAY);
    });

    return () => {
        unsubscribe();
        stopTimer();
    };
};

/** `HabboTracking.initComponent` for the connection: the per-frame trackers and the room timer. Returns the stop. */
export const startHabboTracking = (send: Send) => {
    const config = systemStore.getState().config;
    const current: TrackingSession = {
        send,
        performance: new PerformanceTracker(config, createEnvironment(), getTimer()),
        framerate: new FramerateTracker(config),
        lagWarning: new LagWarningLogger(config),
    };

    session = current;

    const stopFrames = startFrameTracking(current);
    const stopRoom = startRoomPerformanceTracking(current);

    return () => {
        stopFrames();
        stopRoom();

        if (session === current) session = undefined;
    };
};
