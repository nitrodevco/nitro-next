import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MysteryBoxKeysMessageType = {
  boxColor: string;
  keyColor: string;
};

export class MysteryBoxKeysMessage implements IIncomingPacket<MysteryBoxKeysMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MysteryBoxKeysMessageType
  {

    const packet: MysteryBoxKeysMessageType = {
      boxColor: wrapper.readString(),
      keyColor: wrapper.readString(),
    };

    return packet;
  }
}
