import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSellablePetPalettesComposerType = {
    localizationId: number;
};

export class GetSellablePetPalettesComposer implements IOutgoingPacket<GetSellablePetPalettesComposerType> {
    public constructor(private params: GetSellablePetPalettesComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.localizationId,
        ];
    }
}
