import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveItemFromTradeComposerType = object;

export class RemoveItemFromTradeComposer implements IOutgoingPacket<RemoveItemFromTradeComposerType> {
    public constructor(private params: RemoveItemFromTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
