import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CloseChestComposerType = {
    chestId: number;
};

export class CloseChestComposer implements IOutgoingPacket<CloseChestComposerType> {
    public constructor(private params: CloseChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
        ];
    }
}
