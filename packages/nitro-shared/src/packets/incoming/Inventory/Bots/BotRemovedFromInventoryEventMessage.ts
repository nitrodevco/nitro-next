import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotRemovedFromInventoryEventMessageType = {
  // no fields

};

export class BotRemovedFromInventoryEventMessage implements IIncomingPacket<BotRemovedFromInventoryEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotRemovedFromInventoryEventMessageType
  {

    const packet: BotRemovedFromInventoryEventMessageType = {
    };

    return packet;
  }
}
