// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredLogPage } from './Data/IWiredLogPage';
import { WiredLogPageParser } from './Data/WiredLogPageParser';

export type WiredRoomLogsMessageType = {
    page: IWiredLogPage;
};

/** The answer to `WiredGetRoomLogsComposer`. Flash `WiredRoomLogsMessageParser`, shown by the monitor tab's `WiredRoomLogListView`. */
export class WiredRoomLogsMessage implements IIncomingPacket<WiredRoomLogsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredRoomLogsMessageType {
        const page = WiredLogPageParser(wrapper);

        return { page };
    }
}
