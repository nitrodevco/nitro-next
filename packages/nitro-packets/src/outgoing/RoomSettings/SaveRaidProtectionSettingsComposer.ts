import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SaveRaidProtectionSettingsComposerType = {
    roomId: number;
    enabled: boolean;
    detectionSensitivity: number;
    actionType: number;
    banDurationSeconds: number;
    guardEnabled: boolean;
    guardDurationSeconds: number;
    guardSensitivity: number;
    /** The user confirmed turning protection on. */
    confirmed: boolean;
};

export class SaveRaidProtectionSettingsComposer implements IOutgoingPacket<SaveRaidProtectionSettingsComposerType> {
    public constructor(private params: SaveRaidProtectionSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
            this.params.enabled,
            this.params.detectionSensitivity,
            this.params.actionType,
            this.params.banDurationSeconds,
            this.params.guardEnabled,
            this.params.guardDurationSeconds,
            this.params.guardSensitivity,
            this.params.confirmed,
        ];
    }
}
