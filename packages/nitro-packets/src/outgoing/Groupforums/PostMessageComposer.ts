import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PostMessageComposerType = object;

export class PostMessageComposer implements IOutgoingPacket<PostMessageComposerType> {
    public constructor(private params: PostMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
