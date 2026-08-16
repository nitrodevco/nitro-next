import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddItemToTradeComposerType = object;

export class AddItemToTradeComposer implements IOutgoingPacket<AddItemToTradeComposerType> {
    public constructor(private params: AddItemToTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
