import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SaveUserNftWardrobeComposerType = object;

export class SaveUserNftWardrobeComposer implements IOutgoingPacket<SaveUserNftWardrobeComposerType> {
    public constructor(private params: SaveUserNftWardrobeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
