import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorInitMessageType = {
  // no fields

};

export class ModeratorInitMessage implements IIncomingPacket<ModeratorInitMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ModeratorInitMessageType
  {

    const packet: ModeratorInitMessageType = {
    };

    return packet;
  }
}
