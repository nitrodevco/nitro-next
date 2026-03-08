import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StopCounterMessageMessageType = {
  // no fields

};

export class Game2StopCounterMessageMessage implements IIncomingPacket<Game2StopCounterMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StopCounterMessageMessageType
  {

    const packet: Game2StopCounterMessageMessageType = {
    };

    return packet;
  }
}
