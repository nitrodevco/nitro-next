import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredRewardResultMessageType = {
  // no fields

};

export class WiredRewardResultMessage implements IIncomingPacket<WiredRewardResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredRewardResultMessageType
  {

    const packet: WiredRewardResultMessageType = {
    };

    return packet;
  }
}
