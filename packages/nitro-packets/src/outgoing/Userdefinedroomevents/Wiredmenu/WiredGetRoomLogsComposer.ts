// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetRoomLogsComposerType = {
    /** 1-based. */
    page: number;
    /** Flash sends `WiredRoomLogsConfig.PAGE_SIZE`, 50. */
    pageSize: number;
    /** `IWiredLogEntry.logLevel` to narrow to, -1 for all. */
    logLevelFilter: number;
    /** `IWiredLogEntry.logSource` to narrow to, -1 for all. */
    logSourceFilter: number;
    /** Text to search the messages for; empty for none. */
    query: string;
};

/**
 * Flash `_-F26.WiredGetRoomLogsComposer`, sent by `WiredRoomLogListView.requestPageWithFilters`
 * (which passes the level before the source) and, as `(1, 50, -1, -1, '')`, when the monitor tab
 * opens the log; answered by `WiredRoomLogsMessage`.
 */
export class WiredGetRoomLogsComposer implements IOutgoingPacket<WiredGetRoomLogsComposerType> {
    public constructor(private params: WiredGetRoomLogsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.page,
            this.params.pageSize,
            this.params.logLevelFilter,
            this.params.logSourceFilter,
            this.params.query,
        ];
    }
}
