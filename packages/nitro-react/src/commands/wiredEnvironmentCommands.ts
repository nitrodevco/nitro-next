/**
 * `WiredEnvironment`'s click settings, applied to the room: `wf_act_click_conf` can make clicks
 * pass through avatars or furni (the engine's click settings, under the key `wired_env`) or turn
 * avatars into click-and-walk-behind "game mode", which the engine reads as playing a game.
 *
 * Someone who may edit the room's wired gets a toggle on the click settings notification that
 * switches all of it off for themselves - `clickSettingsIgnored` - so they can still select
 * things while the settings are on.
 */
import { getRoom, roomStore } from '#base/context/room';
import { WIRED_CLICK_FURNI_PASS_THROUGH, WIRED_CLICK_USER_CLICK_WALK_BEHIND, WIRED_CLICK_USER_DEFAULT, WIRED_CLICK_USER_PASS_THROUGH, wiredStore } from '#base/context/wired';

/** `WiredEnvironment.§_-a2b§` - this feature's key among the engine's click settings. */
const CLICK_SETTINGS_KEY = 'wired_env';

/** `HabboUserDefinedRoomEvents.isGameMode` - `clickUserOption == 1`, where the option reads as default while ignored. */
const syncWiredGameMode = () => {
    const { clickUserSetting, clickSettingsIgnored } = wiredStore.getState();
    const clickUserOption = clickSettingsIgnored ? WIRED_CLICK_USER_DEFAULT : clickUserSetting;

    roomStore.getState().setIsWiredGameMode(clickUserOption === WIRED_CLICK_USER_CLICK_WALK_BEHIND);
};

/** `WiredEnvironment.applyClickSettings`. */
export const applyWiredClickSettings = (clickUserOption: number, clickFurniOption: number) => {
    getRoom()?.setClickSettings(CLICK_SETTINGS_KEY, clickUserOption === WIRED_CLICK_USER_PASS_THROUGH, clickFurniOption === WIRED_CLICK_FURNI_PASS_THROUGH);

    syncWiredGameMode();
};

/** `WiredEnvironment.onToggleClickSettingsNotification` - the notification's stop / resume button. */
export const setWiredClickSettingsIgnored = (ignored: boolean) => {
    const { clickUserSetting, clickFurniSetting, setClickSettingsIgnored } = wiredStore.getState();

    setClickSettingsIgnored(ignored);

    if (ignored) applyWiredClickSettings(WIRED_CLICK_USER_DEFAULT, 0);
    else applyWiredClickSettings(clickUserSetting, clickFurniSetting);
};
