import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StartCounterMessageMessageType = {
  // no fields

};

export class Game2StartCounterMessageMessage implements IIncomingPacket<Game2StartCounterMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StartCounterMessageMessageType
  {

    const packet: Game2StartCounterMessageMessageType = {
    };

    return packet;
  }
}
