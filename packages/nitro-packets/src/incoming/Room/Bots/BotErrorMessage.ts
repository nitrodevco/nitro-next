import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotErrorMessageType = {
    errorCode: number;
};

export class BotErrorMessage implements IIncomingPacket<BotErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotErrorMessageType {
        const packet: BotErrorMessageType = {
            errorCode: 0,
        };

        packet.errorCode = wrapper.readInt();

        return packet;
    }
}
