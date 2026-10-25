import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SignComposerType = {
    signType: number;
};

export class SignComposer implements IOutgoingPacket<SignComposerType> {
    public constructor(private params: SignComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.signType,
        ];
    }
}
