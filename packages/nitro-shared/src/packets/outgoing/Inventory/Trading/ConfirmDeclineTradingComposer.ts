import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ConfirmDeclineTradingComposerType = object;

export class ConfirmDeclineTradingComposer implements IOutgoingPacket<ConfirmDeclineTradingComposerType> {
    public constructor(private params: ConfirmDeclineTradingComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
