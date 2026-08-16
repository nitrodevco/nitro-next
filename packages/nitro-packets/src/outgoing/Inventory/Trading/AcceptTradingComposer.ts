import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AcceptTradingComposerType = object;

export class AcceptTradingComposer implements IOutgoingPacket<AcceptTradingComposerType> {
    public constructor(private params: AcceptTradingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
