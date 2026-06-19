import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ConfirmAcceptTradingComposerType = object;

export class ConfirmAcceptTradingComposer implements IOutgoingPacket<ConfirmAcceptTradingComposerType> {
    public constructor(private params: ConfirmAcceptTradingComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
