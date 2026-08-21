import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IPetFigureData {
    typeId: number;
    paletteId: number;
    color: string;
    breedId: number;
    customParts: number[];
}

export const PetFigureDataParser = (wrapper: IMessageDataWrapper): IPetFigureData => {
    const data: IPetFigureData = {
        typeId: 0,
        paletteId: 0,
        color: '',
        breedId: 0,
        customParts: [],
    };

    data.typeId = wrapper.readInt();
    data.paletteId = wrapper.readInt();
    data.color = wrapper.readString();
    data.breedId = wrapper.readInt();
    let v1 = wrapper.readInt();
    while (v1 > 0) {
        data.customParts.push(wrapper.readInt());
        data.customParts.push(wrapper.readInt());
        data.customParts.push(wrapper.readInt());
        v1--;
    }

    return data;
}
