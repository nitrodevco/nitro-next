import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* RoomSettingsSavedParser (§_-94§/§_-B1H§) — roomId only */
export type RoomSettingsSavedEventMessageType = {
    roomId: number;
};

export class RoomSettingsSavedEventMessage implements IIncomingPacket<RoomSettingsSavedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomSettingsSavedEventMessageType {
        return {
            roomId: wrapper.readInt(),
        };
    }
}
