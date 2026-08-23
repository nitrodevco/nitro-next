import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IOutfitData {
    slotId: number;
    figureString: string;
    gender: string;
}

export const OutfitDataParser = (wrapper: IMessageDataWrapper): IOutfitData => {
    const data: IOutfitData = {
        slotId: 0,
        figureString: '',
        gender: '',
    };

    data.slotId = wrapper.readInt();
    data.figureString = wrapper.readString();
    data.gender = wrapper.readString();

    return data;
};
