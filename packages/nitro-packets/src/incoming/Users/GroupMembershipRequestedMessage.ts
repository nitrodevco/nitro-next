import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GroupMembershipRequestedMessageType = {
  // no fields

};

export class GroupMembershipRequestedMessage implements IIncomingPacket<GroupMembershipRequestedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GroupMembershipRequestedMessageType
  {

    const packet: GroupMembershipRequestedMessageType = {
    };

    return packet;
  }
}
