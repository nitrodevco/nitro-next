import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CancelTypingComposerType = object;

export class CancelTypingComposer implements IOutgoingPacket<CancelTypingComposerType> {
    public constructor(private params: CancelTypingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
