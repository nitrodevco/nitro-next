import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StageStartingMessageType = {
  // no fields

};

export class Game2StageStartingMessage implements IIncomingPacket<Game2StageStartingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StageStartingMessageType
  {

    const packet: Game2StageStartingMessageType = {
    };

    return packet;
  }
}
