import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InitDiffieHandshakeMessageType = {
  prime: string;
  generator: string;
};

export class InitDiffieHandshakeMessage implements IIncomingPacket<InitDiffieHandshakeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InitDiffieHandshakeMessageType
  {

    const packet: InitDiffieHandshakeMessageType = {
      prime: wrapper.readString(),
      generator: wrapper.readString(),
    };

    return packet;
  }
}
