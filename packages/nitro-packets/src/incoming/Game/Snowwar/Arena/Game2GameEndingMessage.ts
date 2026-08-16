import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameEndingMessageType = {
  // no fields

};

export class Game2GameEndingMessage implements IIncomingPacket<Game2GameEndingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameEndingMessageType
  {

    const packet: Game2GameEndingMessageType = {
    };

    return packet;
  }
}
