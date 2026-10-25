import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideTicketCreationResultMessageType = object;

export class GuideTicketCreationResultMessage implements IIncomingPacket<GuideTicketCreationResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuideTicketCreationResultMessageType {
        const packet: GuideTicketCreationResultMessageType = {
        };

        return packet;
    }
}
