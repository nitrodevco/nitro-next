import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestCompletedMessageType = {
  // no fields

};

export class QuestCompletedMessage implements IIncomingPacket<QuestCompletedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): QuestCompletedMessageType
  {

    const packet: QuestCompletedMessageType = {
    };

    return packet;
  }
}
