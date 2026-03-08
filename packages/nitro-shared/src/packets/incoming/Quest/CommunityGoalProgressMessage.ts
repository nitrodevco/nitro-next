import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CommunityGoalProgressMessageType = {
  // no fields

};

export class CommunityGoalProgressMessage implements IIncomingPacket<CommunityGoalProgressMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CommunityGoalProgressMessageType
  {

    const packet: CommunityGoalProgressMessageType = {
    };

    return packet;
  }
}
