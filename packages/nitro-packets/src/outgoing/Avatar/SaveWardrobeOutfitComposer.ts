import { AvatarGenderType, IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SaveWardrobeOutfitComposerType = {
    slotId: number;
    figure: string;
    gender: AvatarGenderType;
};

export class SaveWardrobeOutfitComposer implements IOutgoingPacket<SaveWardrobeOutfitComposerType> {
    public constructor(private params: SaveWardrobeOutfitComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.slotId,
            this.params.figure,
            this.params.gender,
        ];
    }
}
