// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ISellablePetPaletteData, SellablePetPaletteDataParser } from '../Data/SellablePetPaletteDataParser';

export type SellablePetPalettesMessageType = {
    /** The product code `GetSellablePetPalettesComposer` asked for. */
    productCode: string;
    sellablePalettes: ISellablePetPaletteData[];
};

/** Flash `SellablePetPalettesParser`: the product code, then a count and one `SellablePetPaletteData` each. */
export class SellablePetPalettesMessage implements IIncomingPacket<SellablePetPalettesMessageType> {
    public parse(wrapper: IMessageDataWrapper): SellablePetPalettesMessageType {
        const productCode = wrapper.readString();
        const sellablePalettes = ParseArray(wrapper, SellablePetPaletteDataParser);

        return { productCode, sellablePalettes };
    }
}
