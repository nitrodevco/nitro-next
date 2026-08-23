import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IFurnitureProductItem {
    recipeCode: string;
    productCode: string;
    furnitureClassName: string;
}

export const FurnitureProductItemParser = (wrapper: IMessageDataWrapper): IFurnitureProductItem => {
    const data: IFurnitureProductItem = {
        recipeCode: '',
        productCode: '',
        furnitureClassName: '',
    };

    data.recipeCode = wrapper.readString();
    data.productCode = wrapper.readString();
    data.furnitureClassName = wrapper.readString();

    return data;
};
