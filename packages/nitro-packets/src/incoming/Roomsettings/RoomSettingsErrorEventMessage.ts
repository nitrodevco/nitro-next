// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsErrorEventMessageType = {
    roomId: number;
    errorCode: number;
};

export class RoomSettingsErrorEventMessage implements IIncomingPacket<RoomSettingsErrorEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomSettingsErrorEventMessageType {
        return {
            roomId: wrapper.readInt(),
            errorCode: wrapper.readInt(),
        };
    }
}
