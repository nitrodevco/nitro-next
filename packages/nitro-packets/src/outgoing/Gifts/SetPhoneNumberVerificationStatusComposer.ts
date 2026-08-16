import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetPhoneNumberVerificationStatusComposerType = object;

export class SetPhoneNumberVerificationStatusComposer implements IOutgoingPacket<SetPhoneNumberVerificationStatusComposerType> {
    public constructor(private params: SetPhoneNumberVerificationStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
