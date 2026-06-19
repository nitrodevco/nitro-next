import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeEmailComposerType = object;

export class ChangeEmailComposer implements IOutgoingPacket<ChangeEmailComposerType> {
    public constructor(private params: ChangeEmailComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
