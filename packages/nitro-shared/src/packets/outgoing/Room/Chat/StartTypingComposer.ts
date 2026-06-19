import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type StartTypingComposerType = object;

export class StartTypingComposer implements IOutgoingPacket<StartTypingComposerType> {
    public constructor(private params: StartTypingComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
