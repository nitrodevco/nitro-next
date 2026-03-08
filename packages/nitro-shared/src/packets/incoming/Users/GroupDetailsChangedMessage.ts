import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GroupDetailsChangedMessageType = {
  // no fields

};

export class GroupDetailsChangedMessage implements IIncomingPacket<GroupDetailsChangedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GroupDetailsChangedMessageType
  {

    const packet: GroupDetailsChangedMessageType = {
    };

    return packet;
  }
}
