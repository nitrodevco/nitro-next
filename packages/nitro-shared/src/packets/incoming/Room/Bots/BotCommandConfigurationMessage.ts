import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotCommandConfigurationMessageType = {
  // no fields

};

export class BotCommandConfigurationMessage implements IIncomingPacket<BotCommandConfigurationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BotCommandConfigurationMessageType
  {

    const packet: BotCommandConfigurationMessageType = {
    };

    return packet;
  }
}
