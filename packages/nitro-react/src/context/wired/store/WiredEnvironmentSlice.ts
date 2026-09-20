/**
 * What the room's wired tells every client in it - `WiredEnvironment`: whether a "user clicks
 * user" trigger is listening (so a click on an avatar is reported to the server before a menu
 * opens), the achievements the room can progress, and the click settings a `wf_act_click_conf`
 * box has switched on.
 *
 * `clickSettingsIgnored` is Flash's `§_-31R§`: someone who may edit the room's wired can switch
 * the click settings off for themselves through the toggle on the click settings notification.
 */
import { StateCreator } from 'zustand';

/** `WiredEnvironment.CLICK_USER_DEFAULT`. */
export const WIRED_CLICK_USER_DEFAULT = 0;
/** `WiredEnvironment.CLICK_USER_CLICK_WALK_BEHIND` - "game mode": avatars are clicked without menus or selection. */
export const WIRED_CLICK_USER_CLICK_WALK_BEHIND = 1;
/** `WiredEnvironment.CLICK_USER_PASS_THROUGH` - clicks go through avatars. */
export const WIRED_CLICK_USER_PASS_THROUGH = 2;
/** `WiredEnvironment.CLICK_FURNI_DEFAULT`. */
export const WIRED_CLICK_FURNI_DEFAULT = 0;
/** `WiredEnvironment.CLICK_FURNI_PASS_THROUGH` - clicks go through furni. */
export const WIRED_CLICK_FURNI_PASS_THROUGH = 1;

/** `WiredUserClickHandledEvent` - the server's answer to a reported click on a user. */
export interface WiredUserClickHandled {
    /** The clicked user's room index. */
    index: number;
    /** Whether the user's menu should open after all. */
    openMenu: boolean;
    /** Counts the answers, so two for the same user are still two events. */
    sequence: number;
}

type State = {
    hasClickUserWired: boolean;
    /**
     * `WiredEnvironment.achievements` - `achievementsInRoom`: the `ProgressAchievement` box's
     * dropdown (`WiredElementContext.achievementsInRoom`). Flash has two more readers, both in
     * subsystems this client does not have yet: the quest engine's `AchievementController`
     * (`achievementIsVisible` lists only the `WF_<name>` achievements named here in the
     * `wired_games` category) and the room tools' `button_achievements`, shown while this list is
     * not empty (`WIRED_ACHIEVEMENTS_UPDATED`) and opening `questengine/achievements/wired_games`.
     * When the achievements window is ported, both read this field; the button belongs in
     * `RoomToolsWidget`'s list before "settings" (the layout's order is zoom, achievements,
     * settings, chat history, like, camera, share).
     */
    wiredAchievements: string[];
    /** `§_-Gx§` as the server sent it; `clickUserOption` is what applies. */
    clickUserSetting: number;
    clickFurniSetting: number;
    clickSettingsIgnored: boolean;
    userClickHandled: WiredUserClickHandled | undefined;
};

type Actions = {
    setWiredEnvironment: (hasClickUserWired: boolean, wiredAchievements: string[]) => void;
    setHasClickUserWired: (hasClickUserWired: boolean) => void;
    setClickSettings: (clickUserSetting: number, clickFurniSetting: number) => void;
    setClickSettingsIgnored: (clickSettingsIgnored: boolean) => void;
    setUserClickHandled: (index: number, openMenu: boolean) => void;
};

/**
 * What `REE_DISPOSED` clears. Flash's `WiredEnvironment.clear` only drops `hasClickUserWired`;
 * the click settings are put back by `leaveRoom`, and the achievements are replaced by the next
 * room's `WiredEnvironment` packet. The last click answer belongs to the room it was given in.
 */
export const WiredEnvironmentSliceRoomState: Pick<State, 'hasClickUserWired' | 'userClickHandled'> = {
    hasClickUserWired: false,
    userClickHandled: undefined,
};

export const WiredEnvironmentSliceInitialState: State = {
    ...WiredEnvironmentSliceRoomState,
    wiredAchievements: [],
    clickUserSetting: WIRED_CLICK_USER_DEFAULT,
    clickFurniSetting: WIRED_CLICK_FURNI_DEFAULT,
    clickSettingsIgnored: false,
};

export type WiredEnvironmentSlice = State & Actions;

export const createWiredEnvironmentSlice: StateCreator<WiredEnvironmentSlice, [], [], WiredEnvironmentSlice> = set => ({
    ...WiredEnvironmentSliceInitialState,
    setWiredEnvironment: (hasClickUserWired, wiredAchievements) => set({ hasClickUserWired, wiredAchievements }),
    setHasClickUserWired: hasClickUserWired => set({ hasClickUserWired }),
    setClickSettings: (clickUserSetting, clickFurniSetting) => set({ clickUserSetting, clickFurniSetting }),
    setClickSettingsIgnored: clickSettingsIgnored => set({ clickSettingsIgnored }),
    setUserClickHandled: (index, openMenu) => set(x => ({ userClickHandled: { index, openMenu, sequence: (x.userClickHandled?.sequence ?? 0) + 1 } })),
});
