// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** The two constants on Flash `WiredTransactionLogList`, told apart in `WiredTransactionLogsView` by which composer pages them. */
export enum WiredTransactionLogListType {
    /** `_-M7`: the logs of one chest; `logListId` is the chest id and paging goes through `WiredTransactionGetChestLogsComposer`. */
    Chest = 0,
    /** `_-E2L`: the logs of the room; `logListId` is the room id and paging goes through `WiredTransactionGetRoomLogsComposer`. */
    Room = 1,
}
