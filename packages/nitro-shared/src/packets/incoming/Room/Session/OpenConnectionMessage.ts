import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OpenConnectionMessageType = {
  roomId: number;
};

export class OpenConnectionMessage implements IIncomingPacket<OpenConnectionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OpenConnectionMessageType
  {

    const packet: OpenConnectionMessageType = {
      roomId: wrapper.readInt(),
    };

    return packet;
  }
}
