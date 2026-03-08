import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ControllerLevel: RoomControllerType): Unknown type 'RoomControllerType'. Add override mapping.

export type YouAreControllerMessageType = {
  roomId: number;
  controllerLevel: any;
};

export class YouAreControllerMessage implements IIncomingPacket<YouAreControllerMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YouAreControllerMessageType
  {

    const packet: YouAreControllerMessageType = {
      roomId: wrapper.readInt(),
      controllerLevel: undefined as any, // Unknown type 'RoomControllerType'. Add override mapping.
    };

    return packet;
  }
}
