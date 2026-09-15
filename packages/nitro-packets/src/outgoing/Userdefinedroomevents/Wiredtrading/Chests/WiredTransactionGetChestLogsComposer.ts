import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredTransactionGetChestLogsComposerType = {
    chestId: number;
    offset: number;
    limit: number;
};

export class WiredTransactionGetChestLogsComposer implements IOutgoingPacket<WiredTransactionGetChestLogsComposerType> {
    public constructor(private params: WiredTransactionGetChestLogsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.offset,
            this.params.limit,
        ];
    }
}
