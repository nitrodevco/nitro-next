import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NavigatorSettingsMessageType = {
  homeRoomId: number;
  roomIdToEnter: number;
};

export class NavigatorSettingsMessage implements IIncomingPacket<NavigatorSettingsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorSettingsMessageType
  {

    const packet: NavigatorSettingsMessageType = {
      homeRoomId: wrapper.readInt(),
      roomIdToEnter: wrapper.readInt(),
    };

    return packet;
  }
}
