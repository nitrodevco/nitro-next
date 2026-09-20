import { useRoom } from '#base/context/room';
import { useConfigData, useTranslation } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { getWiredElementMemory, useWiredHasWritePermission, useWiredMenuEnabled, useWiredStore } from '#base/context/wired';
import { wiredConfigString, WiredElementContext } from '#base/wired';

/**
 * The `WiredElementContext` an element's view is handed - what a Flash element reached through
 * `roomEvents` (`localization`, `getBoolean` / `getProperty`, `wiredMenu`, the session). The
 * non-React twin, for `createForm` and the save path, is `getWiredElementContext` in
 * `commands/wiredCommands.ts`.
 */
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

    return {
        localize: (key, replacements) => t(key, key, replacements),
        configBoolean: key => config[key] === true,
        configString: key => wiredConfigString(config[key]),
        menuEnabled,
        hasWritePermission,
        userId,
        roomId,
        guildMemberships,
        achievementsInRoom,
        elementMemory: (holder, code) => getWiredElementMemory(elementMemory, holder, code),
    };
};
