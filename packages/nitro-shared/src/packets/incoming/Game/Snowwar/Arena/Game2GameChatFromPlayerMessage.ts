import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameChatFromPlayerMessageType = {
  // no fields

};

export class Game2GameChatFromPlayerMessage implements IIncomingPacket<Game2GameChatFromPlayerMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameChatFromPlayerMessageType
  {

    const packet: Game2GameChatFromPlayerMessageType = {
    };

    return packet;
  }
}
