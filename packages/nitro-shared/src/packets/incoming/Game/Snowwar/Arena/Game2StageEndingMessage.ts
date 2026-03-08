import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StageEndingMessageType = {
  // no fields

};

export class Game2StageEndingMessage implements IIncomingPacket<Game2StageEndingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StageEndingMessageType
  {

    const packet: Game2StageEndingMessageType = {
    };

    return packet;
  }
}
