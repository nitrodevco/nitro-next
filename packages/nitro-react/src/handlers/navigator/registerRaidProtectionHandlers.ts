/**
 * `RaidProtectionSettingsController`'s listeners: its three packets, the room sessions
 * (`RSE_CREATED` / `RSE_STARTED` / `RSE_ENDED`, which here are the room store's room coming and
 * going) and `HCE_CONFIGURATION_LOADED` (a change of `raid.protection.enabled` drops everything).
 * What each does is in `raidProtectionCommands`.
 */
import { RaidProtectionCapabilityMessage, RaidProtectionSettingsMessage, RaidProtectionSettingsResultMessage } from '@nitrodevco/nitro-packets';

import { clearAllRaidProtection, isRaidProtectionEnabled, onRaidProtectionCapability, onRaidProtectionRoomChanged, onRaidProtectionSettings, onRaidProtectionSettingsResult } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerRaidProtectionHandlers = ({ subscribe }: WebSocketConnection) => {
    const unsubscribePackets = subscribeAll(subscribe, [
        on(RaidProtectionCapabilityMessage, data => onRaidProtectionCapability(data.roomId, data.canManage)),
        on(RaidProtectionSettingsMessage, data => onRaidProtectionSettings(data.settings)),
        on(RaidProtectionSettingsResultMessage, data => onRaidProtectionSettingsResult(data.resultCode, data.settings)),
    ]);

    const unsubscribeRoom = roomStore.subscribe((state, previous) => {
        if (state.room !== previous.room) onRaidProtectionRoomChanged(state.room?.roomId, previous.room?.roomId);
    });

    let enabled = isRaidProtectionEnabled();

    const unsubscribeConfig = systemStore.subscribe(() => {
        if (isRaidProtectionEnabled() === enabled) return;

        enabled = !enabled;
        clearAllRaidProtection();
    });

    return () => {
        unsubscribePackets();
        unsubscribeRoom();
        unsubscribeConfig();
    };
};
