import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConcurrentUsersGoalProgressMessageType = {
  // no fields

};

export class ConcurrentUsersGoalProgressMessage implements IIncomingPacket<ConcurrentUsersGoalProgressMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ConcurrentUsersGoalProgressMessageType
  {

    const packet: ConcurrentUsersGoalProgressMessageType = {
    };

    return packet;
  }
}
