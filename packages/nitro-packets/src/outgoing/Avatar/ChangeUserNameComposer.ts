import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeUserNameComposerType = {
    name: string;
};

export class ChangeUserNameComposer implements IOutgoingPacket<ChangeUserNameComposerType> {
    public constructor(private params: ChangeUserNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.name,
        ];
    }
}
