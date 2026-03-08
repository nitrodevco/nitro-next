import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StartingGameFailedMessageMessageType = {
  // no fields

};

export class Game2StartingGameFailedMessageMessage implements IIncomingPacket<Game2StartingGameFailedMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StartingGameFailedMessageMessageType
  {

    const packet: Game2StartingGameFailedMessageMessageType = {
    };

    return packet;
  }
}
