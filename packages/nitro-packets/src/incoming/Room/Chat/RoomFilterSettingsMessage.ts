import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomFilterSettingsMessageType = {
  badWords: string[];
};

export class RoomFilterSettingsMessage implements IIncomingPacket<RoomFilterSettingsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomFilterSettingsMessageType
  {
    const packet: RoomFilterSettingsMessageType = {
      badWords: [],
    };

    let v1 = wrapper.readInt();
    while (v1 > 0) {
        packet.badWords.push(wrapper.readString());
        v1--;
    }

    return packet;
  }
}
