import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* RoomSettingsSaveErrorParser (§_-94§/§_-92z§) — roomId, errorCode, info */
export type RoomSettingsSaveErrorEventMessageType = {
    roomId: number;
    errorCode: number;
    info: string;
};

export class RoomSettingsSaveErrorEventMessage implements IIncomingPacket<RoomSettingsSaveErrorEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomSettingsSaveErrorEventMessageType {
        return {
            roomId: wrapper.readInt(),
            errorCode: wrapper.readInt(),
            info: wrapper.readString(),
        };
    }
}
