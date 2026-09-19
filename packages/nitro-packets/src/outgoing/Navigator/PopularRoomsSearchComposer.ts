// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PopularRoomsSearchComposerType = {
    query: string;
    adIndex: number;
};

export class PopularRoomsSearchComposer implements IOutgoingPacket<PopularRoomsSearchComposerType> {
    public constructor(private params: PopularRoomsSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.query,
            this.params.adIndex,
        ];
    }
}
