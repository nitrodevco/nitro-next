/**
 * The `WiredElementContext` an element's view is handed - what a Flash element reached through
 * `roomEvents` (`localization`, `getBoolean` / `getProperty`, `wiredMenu`, the session). The
 * non-React twin, for `createForm` and the save path, is `getWiredElementContext` in
 * `commands/wired/wiredCommands.ts`.
 */
import { useRoom } from '#base/context/room';
import { useConfigData, useTranslation } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { getWiredElementMemory, useWiredHasWritePermission, useWiredMenuEnabled, useWiredStore } from '#base/context/wired';
import { configReader } from '#base/utils';
import { getWiredRoomVariables, WiredElementContext } from '#base/wired';

export const useWiredElementContext = (): WiredElementContext => {
    const t = useTranslation();
    const config = useConfigData();
    const menuEnabled = useWiredMenuEnabled();
    const hasWritePermission = useWiredHasWritePermission();
    const userId = useOwnUserId();
    const roomId = useRoom()?.roomId ?? 0;
    const guildMemberships = useWiredStore(x => x.guildMemberships);
    const achievementsInRoom = useWiredStore(x => x.wiredAchievements);
    const elementMemory = useWiredStore(x => x.elementMemory);
    const triggerable = useWiredStore(x => x.setup?.triggerable);
    const { configBoolean, configString, configHas } = configReader(config);

    return {
        localize: (key, replacements) => t(key, key, replacements),
        configBoolean,
        configString,
        configHas,
        menuEnabled,
        hasWritePermission,
        userId,
        roomId,
        guildMemberships,
        achievementsInRoom,
        roomVariables: triggerable ? getWiredRoomVariables(triggerable) : [],
        elementMemory: (holder, code) => getWiredElementMemory(elementMemory, holder, code),
    };
};
