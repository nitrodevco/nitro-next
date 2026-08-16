import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ScrSendKickbackInfoMessageType = {
  // no fields

};

export class ScrSendKickbackInfoMessage implements IIncomingPacket<ScrSendKickbackInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ScrSendKickbackInfoMessageType
  {

    const packet: ScrSendKickbackInfoMessageType = {
    };

    return packet;
  }
}
