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
