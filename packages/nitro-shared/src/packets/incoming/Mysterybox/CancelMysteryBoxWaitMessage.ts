import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CancelMysteryBoxWaitMessageType = {
  // no fields

};

export class CancelMysteryBoxWaitMessage implements IIncomingPacket<CancelMysteryBoxWaitMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CancelMysteryBoxWaitMessageType
  {

    const packet: CancelMysteryBoxWaitMessageType = {
    };

    return packet;
  }
}
