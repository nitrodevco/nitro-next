import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSoundMachinePlayListComposerType = object;

export class GetSoundMachinePlayListComposer implements IOutgoingPacket<GetSoundMachinePlayListComposerType> {
    public constructor(private params: GetSoundMachinePlayListComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
