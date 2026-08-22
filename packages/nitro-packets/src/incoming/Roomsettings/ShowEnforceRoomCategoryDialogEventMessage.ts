import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* ShowEnforceRoomCategoryDialogParser (§_-94§/§_-g1a§) — selectionType only */
export type ShowEnforceRoomCategoryDialogEventMessageType = {
    selectionType: number;
};

export class ShowEnforceRoomCategoryDialogEventMessage implements IIncomingPacket<ShowEnforceRoomCategoryDialogEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ShowEnforceRoomCategoryDialogEventMessageType {
        return {
            selectionType: wrapper.readInt(),
        };
    }
}
