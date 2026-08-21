import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NotificationDialogMessageType = {
  type: string;
  parameters: Record<string, string>;
};

export class NotificationDialogMessage implements IIncomingPacket<NotificationDialogMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NotificationDialogMessageType
  {
    const packet: NotificationDialogMessageType = {
      type: '',
      parameters: {},
    };

    packet.type = wrapper.readString();
    let v1 = wrapper.readInt();
    while (v1 > 0) {
        let v2 = wrapper.readString();
        let v3 = wrapper.readString();
        packet.parameters[v2] = v3;
        v1--;
    }

    return packet;
  }
}
