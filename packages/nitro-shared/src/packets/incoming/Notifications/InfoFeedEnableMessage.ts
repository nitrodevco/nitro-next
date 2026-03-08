import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InfoFeedEnableMessageType = {
  enabled: boolean;
};

export class InfoFeedEnableMessage implements IIncomingPacket<InfoFeedEnableMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InfoFeedEnableMessageType
  {

    const packet: InfoFeedEnableMessageType = {
      enabled: wrapper.readBoolean(),
    };

    return packet;
  }
}
