import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddSpamWallPostItComposerType = {
    objectId: number;
    location: string;
    colorHex: string;
    text: string;
};

export class AddSpamWallPostItComposer implements IOutgoingPacket<AddSpamWallPostItComposerType> {
    public constructor(private params: AddSpamWallPostItComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.location,
            this.params.colorHex,
            this.params.text,
        ];
    }
}
