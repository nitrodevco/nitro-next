import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WiredData: WiredDataSnapshot): Unknown type 'WiredDataSnapshot'. Add override mapping.

export type WiredFurniAddonEventMessageType = {
  wiredData: any;
};

export class WiredFurniAddonEventMessage implements IIncomingPacket<WiredFurniAddonEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredFurniAddonEventMessageType
  {

    const packet: WiredFurniAddonEventMessageType = {
      wiredData: undefined as any, // Unknown type 'WiredDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
