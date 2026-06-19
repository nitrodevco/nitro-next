import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NavigatorDeleteSavedSearchComposerType = {
  searchId: number;
};

export class NavigatorDeleteSavedSearchComposer implements IOutgoingPacket<NavigatorDeleteSavedSearchComposerType>
{
  public constructor(private params: NavigatorDeleteSavedSearchComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.searchId,
    ];
  }
}
