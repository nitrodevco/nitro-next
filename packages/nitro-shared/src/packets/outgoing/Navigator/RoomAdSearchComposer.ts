import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomAdSearchComposerType = {
    adIndex: number;
    tabId: number;
};

export class RoomAdSearchComposer implements IOutgoingPacket<RoomAdSearchComposerType> {
    public constructor(private params: RoomAdSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.adIndex,
            this.params.tabId,
        ];
    }
}
