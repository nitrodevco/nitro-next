import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PostQuizAnswersComposerType = object;

export class PostQuizAnswersComposer implements IOutgoingPacket<PostQuizAnswersComposerType> {
    public constructor(private params: PostQuizAnswersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
