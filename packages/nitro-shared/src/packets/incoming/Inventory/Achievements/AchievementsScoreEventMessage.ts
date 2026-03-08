import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AchievementsScoreEventMessageType = {
  score: number;
};

export class AchievementsScoreEventMessage implements IIncomingPacket<AchievementsScoreEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AchievementsScoreEventMessageType
  {

    const packet: AchievementsScoreEventMessageType = {
      score: wrapper.readInt(),
    };

    return packet;
  }
}
