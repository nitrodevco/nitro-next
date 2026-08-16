import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ShowEnforceRoomCategoryDialogEventMessageType = {
  // no fields

};

export class ShowEnforceRoomCategoryDialogEventMessage implements IIncomingPacket<ShowEnforceRoomCategoryDialogEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ShowEnforceRoomCategoryDialogEventMessageType
  {

    const packet: ShowEnforceRoomCategoryDialogEventMessageType = {
    };

    return packet;
  }
}
