import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type EditEventComposerType = {
  id: number;
  name: string;
  description: string;
};

export class EditEventComposer implements IOutgoingPacket<EditEventComposerType>
{
  public constructor(private params: EditEventComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.id,
      this.params.name,
      this.params.description,
    ];
  }
}
