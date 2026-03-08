import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type DiceValueMessageType = {
  furniId: number;
  value: number;
};

export class DiceValueMessage implements IIncomingPacket<DiceValueMessageType>
{
  public parse(wrapper: IMessageDataWrapper): DiceValueMessageType
  {

    const packet: DiceValueMessageType = {
      furniId: wrapper.readInt(),
      value: wrapper.readInt(),
    };

    return packet;
  }
}
