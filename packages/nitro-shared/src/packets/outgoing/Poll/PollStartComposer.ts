import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PollStartComposerType = object;

export class PollStartComposer implements IOutgoingPacket<PollStartComposerType> {
    public constructor(private params: PollStartComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
