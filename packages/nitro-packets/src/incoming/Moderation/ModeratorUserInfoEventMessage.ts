import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorUserInfoEventMessageType = {
  // no fields

};

export class ModeratorUserInfoEventMessage implements IIncomingPacket<ModeratorUserInfoEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ModeratorUserInfoEventMessageType
  {

    const packet: ModeratorUserInfoEventMessageType = {
    };

    return packet;
  }
}
