import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameStatusMessageType = {
  // no fields

};

export class Game2GameStatusMessage implements IIncomingPacket<Game2GameStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameStatusMessageType
  {

    const packet: Game2GameStatusMessageType = {
    };

    return packet;
  }
}
