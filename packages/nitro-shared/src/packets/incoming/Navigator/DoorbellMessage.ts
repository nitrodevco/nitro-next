import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type DoorbellMessageType = {
  username: string;
};

export class DoorbellMessage implements IIncomingPacket<DoorbellMessageType>
{
  public parse(wrapper: IMessageDataWrapper): DoorbellMessageType
  {

    const packet: DoorbellMessageType = {
      username: wrapper.readString(),
    };

    return packet;
  }
}
