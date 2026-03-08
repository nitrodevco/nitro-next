import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionErrorMessageType = {
  // no fields

};

export class GuideSessionErrorMessage implements IIncomingPacket<GuideSessionErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionErrorMessageType
  {

    const packet: GuideSessionErrorMessageType = {
    };

    return packet;
  }
}
