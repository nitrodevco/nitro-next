import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotForceOpenContextMenuMessageType = {
  botId: number;
};

export class BotForceOpenContextMenuMessage implements IIncomingPacket<BotForceOpenContextMenuMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotForceOpenContextMenuMessageType
  {
    const packet: BotForceOpenContextMenuMessageType = {
      botId: wrapper.readInt(),
    };

    return packet;
  }
}
