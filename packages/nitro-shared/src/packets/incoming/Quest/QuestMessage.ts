import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestMessageType = {
  // no fields

};

export class QuestMessage implements IIncomingPacket<QuestMessageType>
{
  public parse(wrapper: IMessageDataWrapper): QuestMessageType
  {

    const packet: QuestMessageType = {
    };

    return packet;
  }
}
