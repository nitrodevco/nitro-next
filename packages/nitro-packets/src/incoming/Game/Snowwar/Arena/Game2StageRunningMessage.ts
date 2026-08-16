import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StageRunningMessageType = {
  // no fields

};

export class Game2StageRunningMessage implements IIncomingPacket<Game2StageRunningMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StageRunningMessageType
  {

    const packet: Game2StageRunningMessageType = {
    };

    return packet;
  }
}
