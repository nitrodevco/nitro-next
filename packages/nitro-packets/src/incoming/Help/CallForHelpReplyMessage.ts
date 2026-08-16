import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpReplyMessageType = {
  // no fields

};

export class CallForHelpReplyMessage implements IIncomingPacket<CallForHelpReplyMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CallForHelpReplyMessageType
  {

    const packet: CallForHelpReplyMessageType = {
    };

    return packet;
  }
}
