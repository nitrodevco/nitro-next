// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSellablePetPalettesComposerType = {
    /** The pet offer's localization id (`a0 pet<type>`), which the answer names again. */
    productCode: string;
};

/** Flash `GetSellablePetPalettesComposer(productCode)`; answered by `SellablePetPalettesMessage`. */
export class GetSellablePetPalettesComposer implements IOutgoingPacket<GetSellablePetPalettesComposerType> {
    public constructor(private params: GetSellablePetPalettesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.productCode,
        ];
    }
}
