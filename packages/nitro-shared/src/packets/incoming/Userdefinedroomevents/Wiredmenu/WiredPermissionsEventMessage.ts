import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredPermissionsEventMessageType = {
  canModify: boolean;
  canRead: boolean;
};

export class WiredPermissionsEventMessage implements IIncomingPacket<WiredPermissionsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredPermissionsEventMessageType
  {

    const packet: WiredPermissionsEventMessageType = {
      canModify: wrapper.readBoolean(),
      canRead: wrapper.readBoolean(),
    };

    return packet;
  }
}
