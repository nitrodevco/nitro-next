import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OpenPetPackageResultMessageType = {
  objectId: number;
  nameValidationStatus: number;
  nameValidationInfo: string;
};

export class OpenPetPackageResultMessage implements IIncomingPacket<OpenPetPackageResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OpenPetPackageResultMessageType
  {

    const packet: OpenPetPackageResultMessageType = {
      objectId: wrapper.readInt(),
      nameValidationStatus: wrapper.readInt(),
      nameValidationInfo: wrapper.readString(),
    };

    return packet;
  }
}
