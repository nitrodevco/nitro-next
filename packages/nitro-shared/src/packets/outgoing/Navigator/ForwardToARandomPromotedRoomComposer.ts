import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToARandomPromotedRoomComposerType = {
  category: string;
};

export class ForwardToARandomPromotedRoomComposer implements IOutgoingPacket<ForwardToARandomPromotedRoomComposerType>
{
  public constructor(private params: ForwardToARandomPromotedRoomComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.category,
    ];
  }
}
