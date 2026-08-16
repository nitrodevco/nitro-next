import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CancelQuestComposerType = object;

export class CancelQuestComposer implements IOutgoingPacket<CancelQuestComposerType> {
    public constructor(private params: CancelQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
