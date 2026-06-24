import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSelectedNftWardrobeOutfitComposerType = object;

export class GetSelectedNftWardrobeOutfitComposer implements IOutgoingPacket<GetSelectedNftWardrobeOutfitComposerType> {
    public constructor(private params: GetSelectedNftWardrobeOutfitComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
