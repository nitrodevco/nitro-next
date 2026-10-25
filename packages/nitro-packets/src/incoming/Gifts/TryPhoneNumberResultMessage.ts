import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TryPhoneNumberResultMessageType = object;

export class TryPhoneNumberResultMessage implements IIncomingPacket<TryPhoneNumberResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): TryPhoneNumberResultMessageType {
        const packet: TryPhoneNumberResultMessageType = {
        };

        return packet;
    }
}
