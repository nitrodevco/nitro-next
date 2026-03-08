import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MiniMailNewMessageType = {
  // no fields

};

export class MiniMailNewMessage implements IIncomingPacket<MiniMailNewMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MiniMailNewMessageType
  {

    const packet: MiniMailNewMessageType = {
    };

    return packet;
  }
}
