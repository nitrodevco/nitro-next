import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2EnterArenaFailedMessageType = {
  // no fields

};

export class Game2EnterArenaFailedMessage implements IIncomingPacket<Game2EnterArenaFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2EnterArenaFailedMessageType
  {

    const packet: Game2EnterArenaFailedMessageType = {
    };

    return packet;
  }
}
