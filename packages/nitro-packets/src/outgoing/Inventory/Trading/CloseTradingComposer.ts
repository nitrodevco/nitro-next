import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CloseTradingComposerType = object;

export class CloseTradingComposer implements IOutgoingPacket<CloseTradingComposerType> {
    public constructor(private params: CloseTradingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
