import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WiredData: WiredDataSnapshot): Unknown type 'WiredDataSnapshot'. Add override mapping.

export type WiredFurniTriggerEventMessageType = {
  wiredData: any;
};

export class WiredFurniTriggerEventMessage implements IIncomingPacket<WiredFurniTriggerEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredFurniTriggerEventMessageType
  {

    const packet: WiredFurniTriggerEventMessageType = {
      wiredData: undefined as any, // Unknown type 'WiredDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
