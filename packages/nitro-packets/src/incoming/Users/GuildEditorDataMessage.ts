import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildEditorDataMessageType = {
  // no fields

};

export class GuildEditorDataMessage implements IIncomingPacket<GuildEditorDataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildEditorDataMessageType
  {

    const packet: GuildEditorDataMessageType = {
    };

    return packet;
  }
}
