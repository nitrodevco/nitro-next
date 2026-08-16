import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnacceptTradingComposerType = object;

export class UnacceptTradingComposer implements IOutgoingPacket<UnacceptTradingComposerType> {
    public constructor(private params: UnacceptTradingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
