import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetQuizQuestionsComposerType = object;

export class GetQuizQuestionsComposer implements IOutgoingPacket<GetQuizQuestionsComposerType> {
    public constructor(private params: GetQuizQuestionsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
