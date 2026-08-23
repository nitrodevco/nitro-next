import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredRoomSettingsEventMessageType = object;

export class WiredRoomSettingsEventMessage implements IIncomingPacket<WiredRoomSettingsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredRoomSettingsEventMessageType {
        const packet: WiredRoomSettingsEventMessageType = {
        };

        return packet;
    }
}
