import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `SaveUserNftWardrobeMessageComposer(id)`: the NFT outfit to wear. */
export type SaveUserNftWardrobeComposerType = {
    id: string;
};

export class SaveUserNftWardrobeComposer implements IOutgoingPacket<SaveUserNftWardrobeComposerType> {
    public constructor(private params: SaveUserNftWardrobeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.id,
        ];
    }
}
