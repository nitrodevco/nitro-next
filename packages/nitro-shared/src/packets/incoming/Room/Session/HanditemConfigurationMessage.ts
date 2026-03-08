import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HanditemConfigurationMessageType = {
  isHanditemControlBlocked: boolean;
};

export class HanditemConfigurationMessage implements IIncomingPacket<HanditemConfigurationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HanditemConfigurationMessageType
  {

    const packet: HanditemConfigurationMessageType = {
      isHanditemControlBlocked: wrapper.readBoolean(),
    };

    return packet;
  }
}
