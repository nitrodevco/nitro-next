import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type VerifyCodeComposerType = object;

export class VerifyCodeComposer implements IOutgoingPacket<VerifyCodeComposerType> {
    public constructor(private params: VerifyCodeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
