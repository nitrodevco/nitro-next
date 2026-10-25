import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TryVerificationCodeResultMessageType = object;

export class TryVerificationCodeResultMessage implements IIncomingPacket<TryVerificationCodeResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): TryVerificationCodeResultMessageType {
        const packet: TryVerificationCodeResultMessageType = {
        };

        return packet;
    }
}
