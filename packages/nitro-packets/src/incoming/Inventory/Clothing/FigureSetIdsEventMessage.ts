import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FigureSetIds: ImmutableArray<int>): Unknown type 'ImmutableArray<int>'. Add override mapping.
// TODO(BoundFurnitureNames: ImmutableArray<string>): Unknown type 'ImmutableArray<string>'. Add override mapping.

export type FigureSetIdsEventMessageType = {
  figureSetIds: any;
  boundFurnitureNames: any;
};

export class FigureSetIdsEventMessage implements IIncomingPacket<FigureSetIdsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FigureSetIdsEventMessageType
  {

    const packet: FigureSetIdsEventMessageType = {
      figureSetIds: undefined as any, // Unknown type 'ImmutableArray<int>'. Add override mapping.
      boundFurnitureNames: undefined as any, // Unknown type 'ImmutableArray<string>'. Add override mapping.
    };

    return packet;
  }
}
