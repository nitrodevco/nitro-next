import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(PointsByCategoryId: ImmutableDictionary<int, int>): Unknown type 'ImmutableDictionary<int, int>'. Add override mapping.

export type ActivityPointsMessageType = {
  pointsByCategoryId: any;
};

export class ActivityPointsMessage implements IIncomingPacket<ActivityPointsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ActivityPointsMessageType
  {

    const packet: ActivityPointsMessageType = {
      pointsByCategoryId: undefined as any, // Unknown type 'ImmutableDictionary<int, int>'. Add override mapping.
    };

    return packet;
  }
}
