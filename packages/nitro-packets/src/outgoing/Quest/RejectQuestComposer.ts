import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RejectQuestComposerType = object;

export class RejectQuestComposer implements IOutgoingPacket<RejectQuestComposerType> {
    public constructor(private params: RejectQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
