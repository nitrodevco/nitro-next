import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PromoArticlesMessageType = {
  // no fields

};

export class PromoArticlesMessage implements IIncomingPacket<PromoArticlesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PromoArticlesMessageType
  {

    const packet: PromoArticlesMessageType = {
    };

    return packet;
  }
}
