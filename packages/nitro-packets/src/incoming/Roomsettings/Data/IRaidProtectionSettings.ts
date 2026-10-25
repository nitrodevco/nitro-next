/** `RaidProtectionSettingsSnapshot`: one room's raid protection, as the server sends it. */
export interface IRaidProtectionSettings {
    roomId: number;
    enabled: boolean;
    /** 0 low, 1 medium, 2 high. */
    detectionSensitivity: number;
    /** 0 kick, 1 temporary ban. */
    actionType: number;
    banDurationSeconds: number;
    guardEnabled: boolean;
    guardDurationSeconds: number;
    /** 0 low, 1 medium, 2 high. */
    guardSensitivity: number;
    incidentActive: boolean;
    /** 0 when the room has never been raided. */
    lastRaidAtEpochSeconds: number;
}
