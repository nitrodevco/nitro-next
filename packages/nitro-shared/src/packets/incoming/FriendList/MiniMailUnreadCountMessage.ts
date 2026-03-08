import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MiniMailUnreadCountMessageType = {
  unreadCount: number;
};

export class MiniMailUnreadCountMessage implements IIncomingPacket<MiniMailUnreadCountMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MiniMailUnreadCountMessageType
  {

    const packet: MiniMailUnreadCountMessageType = {
      unreadCount: wrapper.readInt(),
    };

    return packet;
  }
}
