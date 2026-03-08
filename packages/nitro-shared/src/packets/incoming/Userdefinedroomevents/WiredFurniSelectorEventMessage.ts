import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WiredData: WiredDataSnapshot): Unknown type 'WiredDataSnapshot'. Add override mapping.

export type WiredFurniSelectorEventMessageType = {
  wiredData: any;
};

export class WiredFurniSelectorEventMessage implements IIncomingPacket<WiredFurniSelectorEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredFurniSelectorEventMessageType
  {

    const packet: WiredFurniSelectorEventMessageType = {
      wiredData: undefined as any, // Unknown type 'WiredDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
