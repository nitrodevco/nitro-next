import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorAddCollapsedCategoryComposerType = {
  categoryName: string;
};

export class NavigatorAddCollapsedCategoryComposer implements IOutgoingPacket<NavigatorAddCollapsedCategoryComposerType>
{
  public constructor(private params: NavigatorAddCollapsedCategoryComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.categoryName,
    ];
  }
}
