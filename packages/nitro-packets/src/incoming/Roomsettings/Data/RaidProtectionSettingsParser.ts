import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRaidProtectionSettings } from './IRaidProtectionSettings';

/** `RaidProtectionSettingsSnapshot.readAfterRoomId`: everything after the room id. */
export const RaidProtectionSettingsAfterRoomIdParser = (roomId: number, wrapper: IMessageDataWrapper): IRaidProtectionSettings => ({
    roomId,
    enabled: wrapper.readBoolean(),
    detectionSensitivity: wrapper.readInt(),
    actionType: wrapper.readInt(),
    banDurationSeconds: wrapper.readInt(),
    guardEnabled: wrapper.readBoolean(),
    guardDurationSeconds: wrapper.readInt(),
    guardSensitivity: wrapper.readInt(),
    incidentActive: wrapper.readBoolean(),
    lastRaidAtEpochSeconds: wrapper.readInt(),
});

/** `RaidProtectionSettingsSnapshot.readFromMessage`. */
export const RaidProtectionSettingsParser = (wrapper: IMessageDataWrapper): IRaidProtectionSettings => RaidProtectionSettingsAfterRoomIdParser(wrapper.readInt(), wrapper);
