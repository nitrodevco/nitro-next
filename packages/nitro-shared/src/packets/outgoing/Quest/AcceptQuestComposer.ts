import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AcceptQuestComposerType = object;

export class AcceptQuestComposer implements IOutgoingPacket<AcceptQuestComposerType> {
    public constructor(private params: AcceptQuestComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
