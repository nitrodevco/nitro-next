import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StageLoadMessageType = {
  // no fields

};

export class Game2StageLoadMessage implements IIncomingPacket<Game2StageLoadMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StageLoadMessageType
  {

    const packet: Game2StageLoadMessageType = {
    };

    return packet;
  }
}
