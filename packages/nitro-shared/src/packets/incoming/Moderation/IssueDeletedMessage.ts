import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IssueDeletedMessageType = {
  // no fields

};

export class IssueDeletedMessage implements IIncomingPacket<IssueDeletedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IssueDeletedMessageType
  {

    const packet: IssueDeletedMessageType = {
    };

    return packet;
  }
}
