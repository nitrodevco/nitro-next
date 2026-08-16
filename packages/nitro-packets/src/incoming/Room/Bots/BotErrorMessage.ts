import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotErrorMessageType = {
  // no fields

};

export class BotErrorMessage implements IIncomingPacket<BotErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotErrorMessageType
  {

    const packet: BotErrorMessageType = {
    };

    return packet;
  }
}
