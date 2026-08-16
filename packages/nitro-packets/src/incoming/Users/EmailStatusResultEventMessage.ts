import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type EmailStatusResultEventMessageType = {
    email: string;
    isVerified: boolean;
    allowChange: boolean;
};

export class EmailStatusResultEventMessage implements IIncomingPacket<EmailStatusResultEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): EmailStatusResultEventMessageType {
        const packet: EmailStatusResultEventMessageType = {
            email: wrapper.readString(),
            isVerified: wrapper.readBoolean(),
            allowChange: wrapper.readBoolean(),
        };

        return packet;
    }
}
