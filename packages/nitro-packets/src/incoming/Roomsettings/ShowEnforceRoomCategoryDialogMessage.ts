import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ShowEnforceRoomCategoryDialogMessageType = {
    selectionType: number;
};

export class ShowEnforceRoomCategoryDialogMessage implements IIncomingPacket<ShowEnforceRoomCategoryDialogMessageType> {
    public parse(wrapper: IMessageDataWrapper): ShowEnforceRoomCategoryDialogMessageType {
        const selectionType = wrapper.readInt();
        return { selectionType };
    }
}
