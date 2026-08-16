import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MuteAllInRoomEventMessageType = {
  // no fields

};

export class MuteAllInRoomEventMessage implements IIncomingPacket<MuteAllInRoomEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MuteAllInRoomEventMessageType
  {

    const packet: MuteAllInRoomEventMessageType = {
    };

    return packet;
  }
}
