import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelectClubGiftComposerType = {
    productCode: string;
};

export class SelectClubGiftComposer implements IOutgoingPacket<SelectClubGiftComposerType> {
    public constructor(private params: SelectClubGiftComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.productCode,
        ];
    }
}
