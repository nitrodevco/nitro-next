import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WiredData: WiredDataSnapshot): Unknown type 'WiredDataSnapshot'. Add override mapping.

export type WiredFurniConditionEventMessageType = {
  wiredData: any;
};

export class WiredFurniConditionEventMessage implements IIncomingPacket<WiredFurniConditionEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredFurniConditionEventMessageType
  {

    const packet: WiredFurniConditionEventMessageType = {
      wiredData: undefined as any, // Unknown type 'WiredDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
