import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CfhChatlogEventMessageType = {
  // no fields

};

export class CfhChatlogEventMessage implements IIncomingPacket<CfhChatlogEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CfhChatlogEventMessageType
  {

    const packet: CfhChatlogEventMessageType = {
    };

    return packet;
  }
}
