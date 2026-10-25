// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenTradingComposerType = {
    objectId: number;
};

export class OpenTradingComposer implements IOutgoingPacket<OpenTradingComposerType> {
    public constructor(private params: OpenTradingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
