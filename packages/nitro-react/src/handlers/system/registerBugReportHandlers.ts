/**
 * Not Flash's: the bug report plugin's `bugreport` extension. The server asks for a capture after
 * the user's own `:bugreport` (`TurboBugReportRequestMessage`); the client answers with what it
 * kept (`takeBugReportCapture`). A server that never accepted the extension never asks.
 */
import { TurboBugReportCaptureComposer, TurboBugReportRequestMessage } from '@nitrodevco/nitro-packets';

import { takeBugReportCapture } from '#base/context/bugreport';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerBugReportHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(TurboBugReportRequestMessage, (data) => {
        void takeBugReportCapture(data.screenshot).then(({ capture, screenshot }) => send(new TurboBugReportCaptureComposer({ reportId: data.reportId, capture, screenshot })));
    }),
]);
