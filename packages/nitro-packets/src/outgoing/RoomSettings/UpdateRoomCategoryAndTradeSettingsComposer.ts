import { IOutgoingPacket, RoomTradeModeEnum } from '@nitrodevco/nitro-api';

export type UpdateRoomCategoryAndTradeSettingsComposerType = {
    roomId: number;
    categoryId: number;
    tradeType: RoomTradeModeEnum;
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
