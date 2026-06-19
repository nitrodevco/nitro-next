import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddItemsToTradeComposerType = object;

export class AddItemsToTradeComposer implements IOutgoingPacket<AddItemsToTradeComposerType> {
    public constructor(private params: AddItemsToTradeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
