import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestCancelledMessageType = {
  // no fields

};

export class QuestCancelledMessage implements IIncomingPacket<QuestCancelledMessageType>
{
  public parse(wrapper: IMessageDataWrapper): QuestCancelledMessageType
  {

    const packet: QuestCancelledMessageType = {
    };

    return packet;
  }
}
