import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MysteryBoxWaitingCanceledComposerType = object;

export class MysteryBoxWaitingCanceledComposer implements IOutgoingPacket<MysteryBoxWaitingCanceledComposerType> {
    public constructor(private params: MysteryBoxWaitingCanceledComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
