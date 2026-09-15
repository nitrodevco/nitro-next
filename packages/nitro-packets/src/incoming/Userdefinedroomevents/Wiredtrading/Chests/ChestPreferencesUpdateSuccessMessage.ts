import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChestPreferencesUpdateSuccessMessageType = {
    chestId: number;
    /** The notification preferences were saved, as opposed to the chest preferences. */
    isNotificationPreferences: boolean;
};

export class ChestPreferencesUpdateSuccessMessage implements IIncomingPacket<ChestPreferencesUpdateSuccessMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChestPreferencesUpdateSuccessMessageType {
        const packet: ChestPreferencesUpdateSuccessMessageType = {
            chestId: wrapper.readInt(),
            isNotificationPreferences: wrapper.readBoolean(),
        };

        return packet;
    }
}
