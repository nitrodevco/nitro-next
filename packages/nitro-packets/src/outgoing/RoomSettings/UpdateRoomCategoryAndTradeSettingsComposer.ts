import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateRoomCategoryAndTradeSettingsComposerType = {
    roomId: RoomId;
    categoryId: number;
    tradeType: RoomTradeModeType;
};

export class UpdateRoomCategoryAndTradeSettingsComposer implements IOutgoingPacket<UpdateRoomCategoryAndTradeSettingsComposerType> {
    public constructor(private params: UpdateRoomCategoryAndTradeSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
            this.params.categoryId,
            this.params.tradeType,
        ];
    }
}
