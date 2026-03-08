import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ScaleType: RoomScaleType): Unknown type 'RoomScaleType'. Add override mapping.
// TODO(AreaHideData: List<AreaHideDataSnapshot>): List<T> requires custom read loop (length + items).

export type FloorHeightMapMessageType = {
  scaleType: any;
  fixedWallsHeight: number;
  modelData: string;
  areaHideData: any[];
};

export class FloorHeightMapMessage implements IIncomingPacket<FloorHeightMapMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FloorHeightMapMessageType
  {

    const packet: FloorHeightMapMessageType = {
      scaleType: undefined as any, // Unknown type 'RoomScaleType'. Add override mapping.
      fixedWallsHeight: wrapper.readInt(),
      modelData: wrapper.readString(),
      areaHideData: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
