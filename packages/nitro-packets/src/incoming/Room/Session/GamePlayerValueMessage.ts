import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GamePlayerValueMessageType = {
  userId: number;
  value: number;
};

export class GamePlayerValueMessage implements IIncomingPacket<GamePlayerValueMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GamePlayerValueMessageType
  {

    const packet: GamePlayerValueMessageType = {
      userId: wrapper.readInt(),
      value: wrapper.readInt(),
    };

    return packet;
  }
}
