import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type HabboSearchComposerType = {
    searchQuery: string;
};

export class HabboSearchComposer implements IOutgoingPacket<HabboSearchComposerType> {
    public constructor(private params: HabboSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.searchQuery,
        ];
    }
}
