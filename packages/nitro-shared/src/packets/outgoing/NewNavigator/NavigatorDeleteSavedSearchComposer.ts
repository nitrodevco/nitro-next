import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorDeleteSavedSearchComposerType = {
    searchId: number;
};

export class NavigatorDeleteSavedSearchComposer implements IOutgoingPacket<NavigatorDeleteSavedSearchComposerType> {
    public constructor(private params: NavigatorDeleteSavedSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.searchId,
        ];
    }
}
