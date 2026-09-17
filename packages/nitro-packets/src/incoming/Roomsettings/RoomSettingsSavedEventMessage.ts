// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

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
