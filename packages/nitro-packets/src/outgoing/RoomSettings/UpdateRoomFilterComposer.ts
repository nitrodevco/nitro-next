import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateRoomFilterComposerType = {
    roomId: number;
    isAddingWord: boolean;
    word: string;
};

export class UpdateRoomFilterComposer implements IOutgoingPacket<UpdateRoomFilterComposerType> {
    public constructor(private params: UpdateRoomFilterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
            this.params.isAddingWord,
            this.params.word,
        ];
    }
}
