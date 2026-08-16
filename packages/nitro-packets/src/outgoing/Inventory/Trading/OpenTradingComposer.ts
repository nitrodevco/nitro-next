import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenTradingComposerType = object;

export class OpenTradingComposer implements IOutgoingPacket<OpenTradingComposerType> {
    public constructor(private params: OpenTradingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
