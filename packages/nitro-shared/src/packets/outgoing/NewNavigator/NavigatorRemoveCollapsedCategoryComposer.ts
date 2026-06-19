import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorRemoveCollapsedCategoryComposerType = {
  categoryName: string;
};

export class NavigatorRemoveCollapsedCategoryComposer implements IOutgoingPacket<NavigatorRemoveCollapsedCategoryComposerType>
{
  public constructor(private params: NavigatorRemoveCollapsedCategoryComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.categoryName,
    ];
  }
}
