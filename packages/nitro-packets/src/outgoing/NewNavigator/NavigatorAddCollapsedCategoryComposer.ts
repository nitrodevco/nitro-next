import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorAddCollapsedCategoryComposerType = {
    categoryName: string;
};

export class NavigatorAddCollapsedCategoryComposer implements IOutgoingPacket<NavigatorAddCollapsedCategoryComposerType> {
    public constructor(private params: NavigatorAddCollapsedCategoryComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.categoryName,
        ];
    }
}
