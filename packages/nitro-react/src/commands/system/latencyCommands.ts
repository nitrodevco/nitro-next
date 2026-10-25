/**
 * `HabboTracking`'s `LatencyTracker`: a `LatencyPingRequest` every `latencytest.interval` ms, the
 * round trip of its answer kept as the latest latency (`HabboTracking.latencyPingMs`), and every
 * `latencytest.report.index` answers a `LatencyPingReport` when the average moved - the arithmetic
 * is `LatencyTracker` in `#base/utils`. `registerLatencyHandlers` starts it for the connection.
 *
 * `showOwnPingChat` is `ChatInputWidgetHandler`'s `:ping`: a client-side chat event of type 11 from
 * the user's own avatar in the generic style, carrying the latest latency (-1 before the first
 * answer) - `ChatBubbleFactory.applySpecialChatContent` makes it "Ping: <n> ms".
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { LatencyPingReportComposer, LatencyPingRequestComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { getTimer, LatencyTracker } from '#base/utils';

import { GENERIC_CHAT_STYLE, insertRoomChat } from '../room/freeFlowChatCommands';

let tracker: LatencyTracker | undefined;

/**
 * `LatencyTracker.init` on the configuration, then `update` - Flash asks every frame; here a timer
 * waits for the next test to be due. Returns the stop.
 */
export const startLatencyTracking = (send: Send) => {
    const current = new LatencyTracker();
    let timer: ReturnType<typeof setTimeout> | undefined;

    tracker = current;
    current.init(systemStore.getState().config);

    const schedule = () => {
        const due = current.nextTestTime;

        if (due === undefined) return;

        timer = setTimeout(() => {
            const requestId = current.update(getTimer());

            if (requestId !== undefined) send(new LatencyPingRequestComposer({ requestId }));

            schedule();
        }, Math.max(0, due - getTimer()));
    };

    schedule();

    return () => {
        clearTimeout(timer);

        if (tracker === current) tracker = undefined;
    };
};

/**
 * `LatencyTracker.onPingResponse`: the report, when the answer completes a set that warrants one.
 * The active canvas's fps counter takes the new latency (`RoomEngine.update` hands it
 * `latencyPingMs` every frame; it only changes here).
 */
export const onLatencyPingResponse = (send: Send, requestId: number) => {
    const report = tracker?.onPingResponse(requestId, getTimer());
    const canvas = getRoom()?.canvas;

    if (canvas) canvas.pingMs = getLatencyPingMs();

    if (report) send(new LatencyPingReportComposer(report));
};

/** `HabboTracking.latencyPingMs`: the last round trip in ms, -1 while none has been measured. */
export const getLatencyPingMs = () => tracker?.latestLatency ?? -1;

/** `ChatInputWidgetHandler` `:ping`: the latency as a chat bubble over the user's own avatar - only in a room. */
export const showOwnPingChat = () => {
    if (!getRoom()) return;

    insertRoomChat(roomStore.getState().ownRoomIndex, '', RoomChatTypeEnum.Ping, GENERIC_CHAT_STYLE, [], getLatencyPingMs());
};
