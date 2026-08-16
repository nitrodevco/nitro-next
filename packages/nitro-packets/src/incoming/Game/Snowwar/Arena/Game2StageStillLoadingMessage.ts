import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2StageStillLoadingMessageType = {
  // no fields

};

export class Game2StageStillLoadingMessage implements IIncomingPacket<Game2StageStillLoadingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2StageStillLoadingMessageType
  {

    const packet: Game2StageStillLoadingMessageType = {
    };

    return packet;
  }
}
