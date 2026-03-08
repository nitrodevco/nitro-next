import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IssueCloseNotificationMessageType = {
  // no fields

};

export class IssueCloseNotificationMessage implements IIncomingPacket<IssueCloseNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IssueCloseNotificationMessageType
  {

    const packet: IssueCloseNotificationMessageType = {
    };

    return packet;
  }
}
