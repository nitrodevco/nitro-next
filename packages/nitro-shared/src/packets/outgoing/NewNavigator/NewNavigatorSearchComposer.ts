import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NewNavigatorSearchComposerType = {
    searchCodeOriginal: string;
    filteringData: string;
};

export class NewNavigatorSearchComposer implements IOutgoingPacket<NewNavigatorSearchComposerType> {
    public constructor(private params: NewNavigatorSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.searchCodeOriginal,
            this.params.filteringData,
        ];
    }
}
