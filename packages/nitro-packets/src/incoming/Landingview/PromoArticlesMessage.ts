import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PromoArticlesMessageType = object;

export class PromoArticlesMessage implements IIncomingPacket<PromoArticlesMessageType> {
    public parse(wrapper: IMessageDataWrapper): PromoArticlesMessageType {
        const packet: PromoArticlesMessageType = {
        };

        return packet;
    }
}
