import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredSaveSuccessEventMessageType = {
  // no fields

};

export class WiredSaveSuccessEventMessage implements IIncomingPacket<WiredSaveSuccessEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredSaveSuccessEventMessageType
  {

    const packet: WiredSaveSuccessEventMessageType = {
    };

    return packet;
  }
}
