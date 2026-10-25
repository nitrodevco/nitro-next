// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomAdSearchComposerType = {
    adIndex: number;
    tabId: number;
};

export class RoomAdSearchComposer implements IOutgoingPacket<RoomAdSearchComposerType> {
    public constructor(private params: RoomAdSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.adIndex,
            this.params.tabId,
        ];
    }
}
