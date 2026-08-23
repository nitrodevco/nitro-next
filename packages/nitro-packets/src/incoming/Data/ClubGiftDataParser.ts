import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IClubGiftData {
    offerId: number;
    isVip: boolean;
    daysRequired: number;
    isSelectable: boolean;
}

export const ClubGiftDataParser = (wrapper: IMessageDataWrapper): IClubGiftData => {
    const data: IClubGiftData = {
        offerId: 0,
        isVip: false,
        daysRequired: 0,
        isSelectable: false,
    };

    data.offerId = wrapper.readInt();
    data.isVip = wrapper.readBoolean();
    data.daysRequired = wrapper.readInt();
    data.isSelectable = wrapper.readBoolean();

    return data;
};
