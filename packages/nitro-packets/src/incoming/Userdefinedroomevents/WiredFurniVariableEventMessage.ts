import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WiredData: WiredDataSnapshot): Unknown type 'WiredDataSnapshot'. Add override mapping.

export type WiredFurniVariableEventMessageType = {
  wiredData: any;
};

export class WiredFurniVariableEventMessage implements IIncomingPacket<WiredFurniVariableEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredFurniVariableEventMessageType
  {

    const packet: WiredFurniVariableEventMessageType = {
      wiredData: undefined as any, // Unknown type 'WiredDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
