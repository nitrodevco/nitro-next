import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IRarityCategoryData {
    chance: number;
    breeds: number[];
}

export const RarityCategoryDataParser = (wrapper: IMessageDataWrapper): IRarityCategoryData => {
    const data: IRarityCategoryData = {
        chance: 0,
        breeds: [],
    };

    data.chance = wrapper.readInt();
    let v1 = wrapper.readInt();
    while (v1 > 0) {
        data.breeds.push(wrapper.readInt());
        v1--;
    }

    return data;
}
