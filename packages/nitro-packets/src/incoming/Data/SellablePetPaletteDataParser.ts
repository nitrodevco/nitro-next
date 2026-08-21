import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface ISellablePetPaletteData {
    type: number;
    breedId: number;
    paletteId: number;
    sellable: boolean;
    rare: boolean;
}

export const SellablePetPaletteDataParser = (wrapper: IMessageDataWrapper): ISellablePetPaletteData => {
    const data: ISellablePetPaletteData = {
        type: 0,
        breedId: 0,
        paletteId: 0,
        sellable: false,
        rare: false,
    };

    data.type = wrapper.readInt();
    data.breedId = wrapper.readInt();
    data.paletteId = wrapper.readInt();
    data.sellable = wrapper.readBoolean();
    data.rare = wrapper.readBoolean();

    return data;
}
