import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpPendingCallsDeletedMessageType = {
  // no fields

};

export class CallForHelpPendingCallsDeletedMessage implements IIncomingPacket<CallForHelpPendingCallsDeletedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CallForHelpPendingCallsDeletedMessageType
  {

    const packet: CallForHelpPendingCallsDeletedMessageType = {
    };

    return packet;
  }
}
