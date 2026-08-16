import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnignoreUserComposerType = {
    name: string;
};

export class UnignoreUserComposer implements IOutgoingPacket<UnignoreUserComposerType> {
    public constructor(private params: UnignoreUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.name
        ];
    }
}
