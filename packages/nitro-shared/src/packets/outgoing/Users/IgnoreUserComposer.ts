import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type IgnoreUserComposerType = {
    userId: number;
};

export class IgnoreUserComposer implements IOutgoingPacket<IgnoreUserComposerType> {
    public constructor(private params: IgnoreUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [this.params.userId];
    }
}
