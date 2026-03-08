import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpPendingCallsMessageType = {
  // no fields

};

export class CallForHelpPendingCallsMessage implements IIncomingPacket<CallForHelpPendingCallsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CallForHelpPendingCallsMessageType
  {

    const packet: CallForHelpPendingCallsMessageType = {
    };

    return packet;
  }
}
