import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeUserNameComposerType = object;

export class ChangeUserNameComposer implements IOutgoingPacket<ChangeUserNameComposerType> {
    public constructor(private params: ChangeUserNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
