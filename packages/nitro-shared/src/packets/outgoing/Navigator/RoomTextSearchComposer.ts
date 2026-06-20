import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomTextSearchComposerType = {
    query: string;
};

export class RoomTextSearchComposer implements IOutgoingPacket<RoomTextSearchComposerType> {
    public constructor(private params: RoomTextSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.query,
        ];
    }
}
