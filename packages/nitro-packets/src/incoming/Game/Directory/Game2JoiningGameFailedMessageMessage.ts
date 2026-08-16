import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2JoiningGameFailedMessageMessageType = {
  // no fields

};

export class Game2JoiningGameFailedMessageMessage implements IIncomingPacket<Game2JoiningGameFailedMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2JoiningGameFailedMessageMessageType
  {

    const packet: Game2JoiningGameFailedMessageMessageType = {
    };

    return packet;
  }
}
