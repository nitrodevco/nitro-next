import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ActivateQuestComposerType = object;

export class ActivateQuestComposer implements IOutgoingPacket<ActivateQuestComposerType> {
    public constructor(private params: ActivateQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
