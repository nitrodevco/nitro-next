import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CheckUserNameComposerType = {
    name: string;
};

export class CheckUserNameComposer implements IOutgoingPacket<CheckUserNameComposerType> {
    public constructor(private params: CheckUserNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.name,
        ];
    }
}
