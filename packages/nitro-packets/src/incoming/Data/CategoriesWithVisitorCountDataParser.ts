import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface ICategoriesWithVisitorCountData {
    categoryToCurrentUserCountMap: Record<number, number>;
    categoryToMaxUserCountMap: Record<number, number>;
}

export const CategoriesWithVisitorCountDataParser = (wrapper: IMessageDataWrapper): ICategoriesWithVisitorCountData => {
    const data: ICategoriesWithVisitorCountData = {
        categoryToCurrentUserCountMap: {} as any,
        categoryToMaxUserCountMap: {} as any,
    };

    let v1 = wrapper.readInt();
    while (v1 > 0) {
        let v2 = wrapper.readInt();
        let v3 = wrapper.readInt();
        let v4 = wrapper.readInt();
        data.categoryToCurrentUserCountMap[v2] = v3;
        data.categoryToMaxUserCountMap[v2] = v4;
        v1--;
    }

    return data;
}
