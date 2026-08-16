import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCraftableProductsComposerType = object;

export class GetCraftableProductsComposer implements IOutgoingPacket<GetCraftableProductsComposerType> {
    public constructor(private params: GetCraftableProductsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
