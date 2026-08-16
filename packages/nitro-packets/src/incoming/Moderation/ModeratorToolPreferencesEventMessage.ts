import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorToolPreferencesEventMessageType = {
  // no fields

};

export class ModeratorToolPreferencesEventMessage implements IIncomingPacket<ModeratorToolPreferencesEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ModeratorToolPreferencesEventMessageType
  {

    const packet: ModeratorToolPreferencesEventMessageType = {
    };

    return packet;
  }
}
