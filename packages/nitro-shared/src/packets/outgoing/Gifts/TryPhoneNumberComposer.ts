import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TryPhoneNumberComposerType = object;

export class TryPhoneNumberComposer implements IOutgoingPacket<TryPhoneNumberComposerType> {
    public constructor(private params: TryPhoneNumberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
