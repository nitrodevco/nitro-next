import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CompleteDiffieHandshakeMessageType = {
  publicKey: string;
  serverClientEncryption: boolean;
};

export class CompleteDiffieHandshakeMessage implements IIncomingPacket<CompleteDiffieHandshakeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CompleteDiffieHandshakeMessageType
  {

    const packet: CompleteDiffieHandshakeMessageType = {
      publicKey: wrapper.readString(),
      serverClientEncryption: wrapper.readBoolean(),
    };

    return packet;
  }
}
