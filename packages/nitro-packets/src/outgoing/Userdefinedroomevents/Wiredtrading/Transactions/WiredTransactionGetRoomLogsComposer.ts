// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredTransactionGetRoomLogsComposerType = {
    /** Flash sends `TransactionConfig.PAGE_SIZE`, or the chests tab's smaller preview amount. */
    pageSize: number;
    /** 1-based. */
    page: number;
};

/**
 * Flash `_-X2r.WiredTransactionGetRoomLogsMessageComposer`, sent by `WiredMenuChestsTab` and by
 * `WiredTransactionLogsView` when paging a room log; answered by `WiredTransactionLogListMessage`.
 * The page size goes out before the page.
 */
export class WiredTransactionGetRoomLogsComposer implements IOutgoingPacket<WiredTransactionGetRoomLogsComposerType> {
    public constructor(private params: WiredTransactionGetRoomLogsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pageSize,
            this.params.page,
        ];
    }
}
