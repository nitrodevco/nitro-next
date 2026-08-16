import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2FullGameStatusMessageType = {
  // no fields

};

export class Game2FullGameStatusMessage implements IIncomingPacket<Game2FullGameStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2FullGameStatusMessageType
  {

    const packet: Game2FullGameStatusMessageType = {
    };

    return packet;
  }
}
