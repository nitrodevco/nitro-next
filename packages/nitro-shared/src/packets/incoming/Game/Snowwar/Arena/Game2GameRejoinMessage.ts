import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameRejoinMessageType = {
  // no fields

};

export class Game2GameRejoinMessage implements IIncomingPacket<Game2GameRejoinMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameRejoinMessageType
  {

    const packet: Game2GameRejoinMessageType = {
    };

    return packet;
  }
}
