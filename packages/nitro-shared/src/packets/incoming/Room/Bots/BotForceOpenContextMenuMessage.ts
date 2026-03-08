import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotForceOpenContextMenuMessageType = {
  // no fields

};

export class BotForceOpenContextMenuMessage implements IIncomingPacket<BotForceOpenContextMenuMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotForceOpenContextMenuMessageType
  {

    const packet: BotForceOpenContextMenuMessageType = {
    };

    return packet;
  }
}
