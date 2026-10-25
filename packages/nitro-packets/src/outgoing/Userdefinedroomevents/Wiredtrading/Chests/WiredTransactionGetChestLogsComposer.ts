// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredTransactionGetChestLogsComposerType = {
    /** The chest; when paging, `IWiredTransactionLogList.logListId`. */
    chestId: number;
    /** Flash sends `TransactionConfig.PAGE_SIZE`. */
    pageSize: number;
    /** 1-based. */
    page: number;
};

/**
 * Flash `_-X2r.WiredTransactionGetChestLogsMessageComposer`, sent by `WiredChestWrapperView` as
 * `(chestId, PAGE_SIZE, 1)` and by `WiredTransactionLogsView` when paging; answered by
 * `WiredTransactionLogListMessage`. The page size goes out before the page.
 */
export class WiredTransactionGetChestLogsComposer implements IOutgoingPacket<WiredTransactionGetChestLogsComposerType> {
    public constructor(private params: WiredTransactionGetChestLogsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.pageSize,
            this.params.page,
        ];
    }
}
