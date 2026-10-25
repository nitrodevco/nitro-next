/**
 * `HabboTracking`'s latency test (`LatencyTracker`): the pings it sends for the connection and their
 * answers (`onPingResponse`). What each does is in `latencyCommands`.
 */
import { LatencyPingResponseMessage } from '@nitrodevco/nitro-packets';

import { onLatencyPingResponse, startLatencyTracking } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerLatencyHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const unsubscribe = subscribeAll(subscribe, [
        on(LatencyPingResponseMessage, data => onLatencyPingResponse(send, data.requestId)),
    ]);

    const stop = startLatencyTracking(send);

    return () => {
        stop();
        unsubscribe();
    };
};
