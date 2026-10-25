import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IOutgoingIngredient {
    count: number;
    furnitureClassName: string;
}

export const OutgoingIngredientParser = (wrapper: IMessageDataWrapper): IOutgoingIngredient => {
    const data: IOutgoingIngredient = {
        count: 0,
        furnitureClassName: '',
    };

    data.count = wrapper.readInt();
    data.furnitureClassName = wrapper.readString();

    return data;
};
