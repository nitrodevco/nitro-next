import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorSetSearchCodeViewModeComposerType = {
    categoryName: string;
    viewMode: NavigatorViewModeType;
};

export class NavigatorSetSearchCodeViewModeComposer implements IOutgoingPacket<NavigatorSetSearchCodeViewModeComposerType> {
    public constructor(private params: NavigatorSetSearchCodeViewModeComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.categoryName,
            this.params.viewMode,
        ];
    }
}
