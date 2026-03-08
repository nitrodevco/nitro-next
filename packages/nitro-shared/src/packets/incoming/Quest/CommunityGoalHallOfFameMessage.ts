import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CommunityGoalHallOfFameMessageType = {
  // no fields

};

export class CommunityGoalHallOfFameMessage implements IIncomingPacket<CommunityGoalHallOfFameMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CommunityGoalHallOfFameMessageType
  {

    const packet: CommunityGoalHallOfFameMessageType = {
    };

    return packet;
  }
}
