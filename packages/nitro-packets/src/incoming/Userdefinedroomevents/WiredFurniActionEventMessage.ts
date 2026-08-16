import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WiredData: WiredDataSnapshot): Unknown type 'WiredDataSnapshot'. Add override mapping.

export type WiredFurniActionEventMessageType = {
  wiredData: any;
};

export class WiredFurniActionEventMessage implements IIncomingPacket<WiredFurniActionEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredFurniActionEventMessageType
  {

    const packet: WiredFurniActionEventMessageType = {
      wiredData: undefined as any, // Unknown type 'WiredDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
