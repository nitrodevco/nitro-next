import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConvertedRoomIdMessageType = {
  globalId: string;
  convertedId: number;
};

export class ConvertedRoomIdMessage implements IIncomingPacket<ConvertedRoomIdMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ConvertedRoomIdMessageType
  {

    const packet: ConvertedRoomIdMessageType = {
      globalId: wrapper.readString(),
      convertedId: wrapper.readInt(),
    };

    return packet;
  }
}
