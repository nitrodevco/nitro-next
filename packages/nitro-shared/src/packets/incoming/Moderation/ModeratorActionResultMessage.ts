import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorActionResultMessageType = {
  // no fields

};

export class ModeratorActionResultMessage implements IIncomingPacket<ModeratorActionResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ModeratorActionResultMessageType
  {

    const packet: ModeratorActionResultMessageType = {
    };

    return packet;
  }
}
