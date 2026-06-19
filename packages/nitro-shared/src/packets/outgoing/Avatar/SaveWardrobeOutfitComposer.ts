import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SaveWardrobeOutfitComposerType = object;

export class SaveWardrobeOutfitComposer implements IOutgoingPacket<SaveWardrobeOutfitComposerType> {
    public constructor(private params: SaveWardrobeOutfitComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
