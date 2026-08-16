import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredValidationErrorEventMessageType = {
  localizationKey: string;
};

export class WiredValidationErrorEventMessage implements IIncomingPacket<WiredValidationErrorEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredValidationErrorEventMessageType
  {

    const packet: WiredValidationErrorEventMessageType = {
      localizationKey: wrapper.readString(),
    };

    return packet;
  }
}
