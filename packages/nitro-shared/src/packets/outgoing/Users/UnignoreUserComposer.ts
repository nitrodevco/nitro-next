import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnignoreUserComposerType = object;

export class UnignoreUserComposer implements IOutgoingPacket<UnignoreUserComposerType> {
    public constructor(private params: UnignoreUserComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
