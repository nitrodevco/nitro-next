import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotAddedToInventoryEventMessageType = {
  // no fields

};

export class BotAddedToInventoryEventMessage implements IIncomingPacket<BotAddedToInventoryEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotAddedToInventoryEventMessageType
  {

    const packet: BotAddedToInventoryEventMessageType = {
    };

    return packet;
  }
}
