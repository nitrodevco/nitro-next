import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(AreaHideData: AreaHideDataSnapshot): Unknown type 'AreaHideDataSnapshot'. Add override mapping.

export type AreaHideMessageType = {
  areaHideData: any;
};

export class AreaHideMessage implements IIncomingPacket<AreaHideMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AreaHideMessageType
  {

    const packet: AreaHideMessageType = {
      areaHideData: undefined as any, // Unknown type 'AreaHideDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}
