import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CheckUserNameComposerType = object;

export class CheckUserNameComposer implements IOutgoingPacket<CheckUserNameComposerType> {
    public constructor(private params: CheckUserNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
