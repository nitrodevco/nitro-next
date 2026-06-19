import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SignComposerType = object;

export class SignComposer implements IOutgoingPacket<SignComposerType> {
    public constructor(private params: SignComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
