import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Rotation: Rotation): Unknown type 'Rotation'. Add override mapping.

export type RoomEntryTileMessageType = {
  x: number;
  y: number;
  rotation: any;
};

export class RoomEntryTileMessage implements IIncomingPacket<RoomEntryTileMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomEntryTileMessageType
  {

    const packet: RoomEntryTileMessageType = {
      x: wrapper.readInt(),
      y: wrapper.readInt(),
      rotation: undefined as any, // Unknown type 'Rotation'. Add override mapping.
    };

    return packet;
  }
}
