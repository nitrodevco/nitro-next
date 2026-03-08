import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotInventoryEventMessageType = {
  // no fields

};

export class BotInventoryEventMessage implements IIncomingPacket<BotInventoryEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotInventoryEventMessageType
  {

    const packet: BotInventoryEventMessageType = {
    };

    return packet;
  }
}
