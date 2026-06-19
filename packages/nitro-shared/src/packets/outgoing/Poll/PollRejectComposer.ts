import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PollRejectComposerType = object;

export class PollRejectComposer implements IOutgoingPacket<PollRejectComposerType> {
    public constructor(private params: PollRejectComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
