import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsSavedEventMessageType = object;

export class RoomSettingsSavedEventMessage implements IIncomingPacket<RoomSettingsSavedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomSettingsSavedEventMessageType {
        const packet: RoomSettingsSavedEventMessageType = {
        };

        return packet;
    }
}
