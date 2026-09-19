import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredRoomSettingsMessageType = {
    modifyPermissionMask: number;
    readPermissionMask: number;
    timezone: string;
};

export class WiredRoomSettingsMessage implements IIncomingPacket<WiredRoomSettingsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredRoomSettingsMessageType {
        const modifyPermissionMask = wrapper.readInt();
        const readPermissionMask = wrapper.readInt();
        const timezone = wrapper.readString();
        return { modifyPermissionMask, readPermissionMask, timezone };
    }
}
