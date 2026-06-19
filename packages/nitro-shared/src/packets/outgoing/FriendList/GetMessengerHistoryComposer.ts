import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMessengerHistoryComposerType = {
  chatId: number;
  message: string;
};

export class GetMessengerHistoryComposer implements IOutgoingPacket<GetMessengerHistoryComposerType>
{
  public constructor(private params: GetMessengerHistoryComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.chatId,
      this.params.message,
    ];
  }
}
