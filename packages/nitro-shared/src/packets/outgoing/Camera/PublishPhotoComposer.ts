import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PublishPhotoComposerType = object;

export class PublishPhotoComposer implements IOutgoingPacket<PublishPhotoComposerType> {
    public constructor(private params: PublishPhotoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
