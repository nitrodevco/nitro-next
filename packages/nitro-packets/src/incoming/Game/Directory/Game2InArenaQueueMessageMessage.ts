import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2InArenaQueueMessageMessageType = {
  // no fields

};

export class Game2InArenaQueueMessageMessage implements IIncomingPacket<Game2InArenaQueueMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2InArenaQueueMessageMessageType
  {

    const packet: Game2InArenaQueueMessageMessageType = {
    };

    return packet;
  }
}
