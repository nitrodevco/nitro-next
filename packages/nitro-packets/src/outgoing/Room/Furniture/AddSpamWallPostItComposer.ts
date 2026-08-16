import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddSpamWallPostItComposerType = object;

export class AddSpamWallPostItComposer implements IOutgoingPacket<AddSpamWallPostItComposerType> {
    public constructor(private params: AddSpamWallPostItComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
