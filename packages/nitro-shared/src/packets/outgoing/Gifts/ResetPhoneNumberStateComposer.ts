import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ResetPhoneNumberStateComposerType = object;

export class ResetPhoneNumberStateComposer implements IOutgoingPacket<ResetPhoneNumberStateComposerType> {
    public constructor(private params: ResetPhoneNumberStateComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
