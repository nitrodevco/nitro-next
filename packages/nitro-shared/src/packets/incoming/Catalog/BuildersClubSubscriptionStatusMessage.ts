import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BuildersClubSubscriptionStatusMessageType = {
  secondsLeft: number;
  furniLimit: number;
  maxFurniLimit: number;
  secondsLeftWithGrace: number;
};

export class BuildersClubSubscriptionStatusMessage implements IIncomingPacket<BuildersClubSubscriptionStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BuildersClubSubscriptionStatusMessageType
  {

    const packet: BuildersClubSubscriptionStatusMessageType = {
      secondsLeft: wrapper.readInt(),
      furniLimit: wrapper.readInt(),
      maxFurniLimit: wrapper.readInt(),
      secondsLeftWithGrace: wrapper.readInt(),
    };

    return packet;
  }
}
