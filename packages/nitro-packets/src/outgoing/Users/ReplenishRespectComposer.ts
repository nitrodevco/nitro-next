// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ReplenishRespectComposerType = object;

export class ReplenishRespectComposer implements IOutgoingPacket<ReplenishRespectComposerType> {
    public constructor(private params: ReplenishRespectComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [

        ];
    }
}
