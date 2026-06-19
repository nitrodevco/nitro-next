import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetMannequinNameComposerType = object;

export class SetMannequinNameComposer implements IOutgoingPacket<SetMannequinNameComposerType> {
    public constructor(private params: SetMannequinNameComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
