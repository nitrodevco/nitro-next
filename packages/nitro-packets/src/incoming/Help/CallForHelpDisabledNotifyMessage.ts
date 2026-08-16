import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpDisabledNotifyMessageType = {
  // no fields

};

export class CallForHelpDisabledNotifyMessage implements IIncomingPacket<CallForHelpDisabledNotifyMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CallForHelpDisabledNotifyMessageType
  {

    const packet: CallForHelpDisabledNotifyMessageType = {
    };

    return packet;
  }
}
