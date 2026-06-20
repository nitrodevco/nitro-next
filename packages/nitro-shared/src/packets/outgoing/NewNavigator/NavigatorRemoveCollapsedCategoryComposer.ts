import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorRemoveCollapsedCategoryComposerType = {
    categoryName: string;
};

export class NavigatorRemoveCollapsedCategoryComposer implements IOutgoingPacket<NavigatorRemoveCollapsedCategoryComposerType> {
    public constructor(private params: NavigatorRemoveCollapsedCategoryComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.categoryName,
        ];
    }
}
