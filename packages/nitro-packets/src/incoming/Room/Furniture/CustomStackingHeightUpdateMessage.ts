import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CustomStackingHeightUpdateMessageType = {
  furniId: number;
  height: number;
};

export class CustomStackingHeightUpdateMessage implements IIncomingPacket<CustomStackingHeightUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CustomStackingHeightUpdateMessageType
  {

    const packet: CustomStackingHeightUpdateMessageType = {
      furniId: wrapper.readInt(),
      height: wrapper.readInt(),
    };

    return packet;
  }
}
