import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IssueInfoMessageType = {
  // no fields

};

export class IssueInfoMessage implements IIncomingPacket<IssueInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IssueInfoMessageType
  {

    const packet: IssueInfoMessageType = {
    };

    return packet;
  }
}
