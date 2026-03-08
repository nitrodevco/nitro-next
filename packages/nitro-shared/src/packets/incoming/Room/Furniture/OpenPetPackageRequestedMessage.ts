import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OpenPetPackageRequestedMessageType = {
  objectId: number;
};

export class OpenPetPackageRequestedMessage implements IIncomingPacket<OpenPetPackageRequestedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OpenPetPackageRequestedMessageType
  {

    const packet: OpenPetPackageRequestedMessageType = {
      objectId: wrapper.readInt(),
    };

    return packet;
  }
}
