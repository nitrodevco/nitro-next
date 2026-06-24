import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorAddSavedSearchComposerType = {
    searchCode: string;
    filter: string;
};

export class NavigatorAddSavedSearchComposer implements IOutgoingPacket<NavigatorAddSavedSearchComposerType> {
    public constructor(private params: NavigatorAddSavedSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.searchCode,
            this.params.filter,
        ];
    }
}
