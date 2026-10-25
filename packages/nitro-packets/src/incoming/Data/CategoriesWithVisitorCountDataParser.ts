import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ICategoriesWithVisitorCountData {
    categoryToCurrentUserCountMap: Record<number, number>;
    categoryToMaxUserCountMap: Record<number, number>;
}

export const CategoriesWithVisitorCountDataParser = (wrapper: IMessageDataWrapper): ICategoriesWithVisitorCountData => {
    const data: ICategoriesWithVisitorCountData = {
        categoryToCurrentUserCountMap: {},
        categoryToMaxUserCountMap: {},
    };

    let v1 = wrapper.readInt();
    while (v1 > 0) {
        const v2 = wrapper.readInt();
        const v3 = wrapper.readInt();
        const v4 = wrapper.readInt();
        data.categoryToCurrentUserCountMap[v2] = v3;
        data.categoryToMaxUserCountMap[v2] = v4;
        v1--;
    }

    return data;
};
