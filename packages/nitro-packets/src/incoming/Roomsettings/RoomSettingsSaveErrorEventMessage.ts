// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsSaveErrorEventMessageType = {
    roomId: number;
    errorCode: number;
    /** Which field the server refused, when it names one. */
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
