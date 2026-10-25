import { ClubLevelEnum, NoobnessLevelEnum, RoomChatBubbleWidthType, RoomChatModeType, RoomChatScrollSpeedType, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { DiscordPreferencesMessageType, IPerk } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { createUserChatCommandsSlice, UserChatCommandsSlice } from './UserChatCommandsSlice';
import { createUserEffectsSlice, UserEffectsSlice } from './UserEffectsSlice';
import { createUserFriendsSlice, UserFriendsSlice } from './UserFriendsSlice';
import { createUserInfoSlice, UserInfoSlice } from './UserInfoSlice';
import { createUserSocialSlice, UserSocialSlice } from './UserSocialSlice';
import { createUserSoundSettingsSlice, UserSoundSettingsSlice } from './UserSoundSettingsSlice';
import { createUserWalletSlice, UserWalletSlice } from './UserWalletSlice';
import { createUserWordFilterSlice, UserWordFilterSlice } from './UserWordFilterSlice';

/**
 * The user store: everything about the logged-in account - `SessionDataManager`'s rights, perks,
 * preferences and availability, plus the info, friends, wallet, effects, social, sound settings,
 * word filter and chat command slices.
 */
type State = {
    tags: string[];
    clubLevel: ClubLevelEnum;
    securityLevel: SecurityLevelEnum;
    isAmbassador: boolean;
    /**
     * Not Flash's: the client-facing permission nodes a Turbo server says the user holds (its
     * `permission.nodes` extension), or `null` when the server never sent them - any other server,
     * or a Turbo that declined. With them, every `ClientGate` asks its node; without, its
     * `securityLevel` threshold, as Flash does.
     */
    permissionNodes: ReadonlySet<string> | null;
    /** Not Flash's: the Turbo extensions the server accepted (`TurboServerCapabilitiesMessage`), by name, at the agreed version. */
    turboCapabilities: ReadonlyMap<string, number>;
    /** `PerkManager` - every perk the server sent, by code. */
    perks: ReadonlyMap<string, IPerk>;
    noobnessLevel: number;
    isEmailVerified: boolean;
    systemOpen: boolean;
    systemShutdown: boolean;
    isAuthenticHabbo: boolean;
    /** `SessionDataManager.isRoomCameraFollowDisabled` - `AccountPreferences.roomCameraFollowDisabled`: the room camera stays put when the avatar walks. */
    isRoomCameraFollowDisabled: boolean;
    /** `HabboMessenger.getRoomInvitesIgnored` - `AccountPreferences.roomInvitesIgnored`. */
    roomInvitesIgnored: boolean;
    /** `HabboMessenger.getOnlineIndicatorPreference` - `AccountPreferences.onlineIndicatorPreference`: who is told when this user comes online. */
    onlineIndicatorPreference: number;
    /**
     * `DiscordSettingsController.preferences` - `DiscordPreferencesMessage`, asked for once at
     * start; `null` until it answers.
     */
    discordPreferences: DiscordPreferencesMessageType | null;
    /**
     * `AccountPreferencesEventMessage.uiFlags`: the account's remembered UI switches, one bit
     * each, kept whole because `SetUIFlagsComposer` sends the whole word back.
     */
    uiFlags: number;
    /**
     * `RoomToolsToolbarCtrl.isCollapsed`: the room tools folded to their strip. Set once as the room's tools are
     * built (`RoomToolsWidget`), then only by their own strip; `RoomToolsCtrlBase` starts it collapsed.
     */
    roomToolsCollapsed: boolean;
    /** `AccountPreferencesEventMessage.preferedChatStyle` - the bubble style the user's own messages are sent with. */
    preferredChatStyle: number;
    /**
     * `HabboFreeFlowChat.chatFontSizeMode` - `AccountPreferencesEventMessage.chatSizePreference`,
     * clamped to 0 (S) - 4 (XXL): how much larger the bubbles' text is drawn (`chatFontSizeScale`).
     */
    chatSizePreference: number;
    /** The account-level FreeFlow settings the newer client moved out of the room settings: `chatMode` / `chatBubbleWidth` / `chatScrollSpeed`. */
    chatMode: RoomChatModeType;
    chatBubbleWidth: RoomChatBubbleWidthType;
    chatScrollSpeed: RoomChatScrollSpeedType;
    /** `SessionDataManager.hasNftChatStyle` - the NFT chat styles (ids 1000-9999) the account holds (`UserNftChatStylesMessage`). */
    nftChatStyles: number[];
    /**
     * `BuildersClubSubscriptionStatusMessage` - how long the account's Builder's Club has left, in
     * seconds. `BCFloorPlanEditor` counts it down for the whole session from the first status and
     * disables the save once it runs out, so it is the account's fact rather than the room's.
     */
    buildersClubSecondsLeft: number;
    /** The same subscription with its grace period, which is what the catalogue's Builder's Club page shows. */
    buildersClubSecondsLeftWithGrace: number;
    /** How many furni the subscription currently allows, and the most it ever would. */
    buildersClubFurniLimit: number;
    buildersClubMaxFurniLimit: number;
    /** `SessionDataManager.hasPurchasableChatStyle` - the bought chat styles (`UserPurchasableChatStylesMessage`, then one at a time). */
    purchasableChatStyles: number[];
    /**
     * `SessionDataManager.mysteryBoxColor` / `mysteryKeyColor` (`onMysteryBoxKeys`): the colour of
     * the mystery box and of the key the account is collecting, as the server names them
     * (`MYSTERY_BOX_KEY_COLORS`); empty for none.
     */
    mysteryBoxColor: string;
    mysteryKeyColor: string;
};

/** The bits of `uiFlags` this client knows about (`SessionDataManager.setUIFlag`). */
export enum UiFlagEnum {
    /** Set while the friend bar is open; cleared while it is folded to its tools (`setFriendBarState`). */
    FriendBarExpanded = 1,
    /** Set while the room tools are expanded; cleared while they are collapsed. */
    RoomToolsExpanded = 2,
}

export interface UserChatPreferences {
    preferredChatStyle: number;
    chatSizePreference: number;
    chatMode: RoomChatModeType;
    chatBubbleWidth: RoomChatBubbleWidthType;
    chatScrollSpeed: RoomChatScrollSpeedType;
}

type Actions = {
    setTags: (tags: string[]) => void;
    /** `SessionDataManager.onAvailabilityStatus`: whether the hotel is open, shutting down, and the account authentic. */
    setAvailabilityStatus: (systemOpen: boolean, systemShutdown: boolean, isAuthenticHabbo: boolean) => void;
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => void;
    setPermissionNodes: (permissionNodes: ReadonlySet<string> | null) => void;
    setTurboCapabilities: (turboCapabilities: ReadonlyMap<string, number>) => void;
    /** `PerkManager.onPerkAllowances` merges: a message carrying some perks updates those and keeps the rest. */
    mergePerks: (perks: IPerk[]) => void;
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
    setChatPreferences: (preferences: UserChatPreferences) => void;
    setPreferredChatStyle: (preferredChatStyle: number) => void;
    /** `HabboFreeFlowChat.chatFontSizeMode = mode` - the caller clamps it, as the setter does. */
    setChatSizePreference: (chatSizePreference: number) => void;
    setUiFlags: (uiFlags: number) => void;
    setRoomToolsCollapsed: (roomToolsCollapsed: boolean) => void;
    setRoomCameraFollowDisabled: (isRoomCameraFollowDisabled: boolean) => void;
    setRoomInvitesIgnored: (roomInvitesIgnored: boolean) => void;
    setOnlineIndicatorPreference: (onlineIndicatorPreference: number) => void;
    setDiscordPreferences: (discordPreferences: DiscordPreferencesMessageType) => void;
    /** Flips one bit and hands back the whole word, so the caller can send it on. */
    setUiFlag: (flag: UiFlagEnum, on: boolean) => number;
    setNftChatStyles: (nftChatStyles: number[]) => void;
    setPurchasableChatStyles: (purchasableChatStyles: number[]) => void;
    /** `SessionDataManager.onPurchasableChatStyleChanged`: one style bought or taken away. */
    setPurchasableChatStyleOwned: (styleId: number, owned: boolean) => void;
    setBuildersClubSubscription: (secondsLeft: number, secondsLeftWithGrace: number, furniLimit: number, maxFurniLimit: number) => void;
    /** The editor's own ten-second countdown (`BCFloorPlanEditor.onBcCountdownTimerEvent`), so the save stops working the moment the subscription does. */
    decreaseBuildersClubSecondsLeft: (seconds: number) => void;
    /** `SessionDataManager.onMysteryBoxKeys`: both colours at once, as `MysteryBoxKeysUpdateEvent` carries them. */
    setMysteryBoxKeys: (mysteryBoxColor: string, mysteryKeyColor: string) => void;
};

const initialState: State = {
    tags: [],
    clubLevel: ClubLevelEnum.None,
    securityLevel: 0,
    isAmbassador: false,
    permissionNodes: null,
    turboCapabilities: new Map(),
    perks: new Map(),
    noobnessLevel: -1,
    isEmailVerified: false,
    systemOpen: false,
    systemShutdown: false,
    isAuthenticHabbo: false,
    isRoomCameraFollowDisabled: false,
    roomInvitesIgnored: false,
    onlineIndicatorPreference: 0,
    discordPreferences: null,
    uiFlags: 0,
    roomToolsCollapsed: true,
    preferredChatStyle: 0,
    chatSizePreference: 0,
    chatMode: RoomChatModeType.FreeFlow,
    chatBubbleWidth: RoomChatBubbleWidthType.Normal,
    chatScrollSpeed: RoomChatScrollSpeedType.Normal,
    nftChatStyles: [],
    purchasableChatStyles: [],
    buildersClubSecondsLeft: 0,
    buildersClubSecondsLeftWithGrace: 0,
    buildersClubFurniLimit: 0,
    buildersClubMaxFurniLimit: 0,
    mysteryBoxColor: '',
    mysteryKeyColor: '',
};

export type UserStore = State & Actions & UserInfoSlice & UserFriendsSlice & UserWalletSlice & UserEffectsSlice & UserSocialSlice & UserSoundSettingsSlice & UserWordFilterSlice & UserChatCommandsSlice;

export const createUserStore = () => createStore<UserStore>()((set, get, store) => ({
    ...initialState,
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => set({ clubLevel, securityLevel, isAmbassador }),
    setPermissionNodes: (permissionNodes: ReadonlySet<string> | null) => set({ permissionNodes }),
    setTurboCapabilities: (turboCapabilities: ReadonlyMap<string, number>) => set({ turboCapabilities }),
    mergePerks: (perks: IPerk[]) => set(state => ({ perks: new Map([ ...state.perks, ...perks.map(perk => [ perk.code, perk ] as const) ]) })),
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => set({ noobnessLevel }),
    increasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft + 1 })),
    decreasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft - 1 })),
    setTags: (tags: string[]) => set({ tags }),
    setAvailabilityStatus: (systemOpen: boolean, systemShutdown: boolean, isAuthenticHabbo: boolean) => set({ systemOpen, systemShutdown, isAuthenticHabbo }),
    setChatPreferences: (preferences: UserChatPreferences) => set({ ...preferences }),
    setPreferredChatStyle: (preferredChatStyle: number) => set({ preferredChatStyle }),
    setChatSizePreference: (chatSizePreference: number) => set({ chatSizePreference }),
    setUiFlags: (uiFlags: number) => set({ uiFlags }),
    setRoomToolsCollapsed: (roomToolsCollapsed: boolean) => set({ roomToolsCollapsed }),
    setRoomCameraFollowDisabled: (isRoomCameraFollowDisabled: boolean) => set({ isRoomCameraFollowDisabled }),
    setRoomInvitesIgnored: (roomInvitesIgnored: boolean) => set({ roomInvitesIgnored }),
    setOnlineIndicatorPreference: (onlineIndicatorPreference: number) => set({ onlineIndicatorPreference }),
    setDiscordPreferences: (discordPreferences: DiscordPreferencesMessageType) => set({ discordPreferences }),
    setUiFlag: (flag: UiFlagEnum, on: boolean) => {
        const uiFlags = on ? (get().uiFlags | flag) : (get().uiFlags & ~flag);

        set({ uiFlags });

        return uiFlags;
    },
    setNftChatStyles: (nftChatStyles: number[]) => set({ nftChatStyles }),
    setPurchasableChatStyles: (purchasableChatStyles: number[]) => set({ purchasableChatStyles }),
    setPurchasableChatStyleOwned: (styleId: number, owned: boolean) => set(state => ({
        purchasableChatStyles: owned
            ? [ ...state.purchasableChatStyles, styleId ]
            : state.purchasableChatStyles.filter((id, index) => (index !== state.purchasableChatStyles.indexOf(styleId))),
    })),
    setBuildersClubSubscription: (buildersClubSecondsLeft: number, buildersClubSecondsLeftWithGrace: number, buildersClubFurniLimit: number, buildersClubMaxFurniLimit: number) => set({ buildersClubSecondsLeft, buildersClubSecondsLeftWithGrace, buildersClubFurniLimit, buildersClubMaxFurniLimit }),
    decreaseBuildersClubSecondsLeft: (seconds: number) => set(state => ({ buildersClubSecondsLeft: state.buildersClubSecondsLeft - seconds })),
    setMysteryBoxKeys: (mysteryBoxColor: string, mysteryKeyColor: string) => set({ mysteryBoxColor, mysteryKeyColor }),
    ...createUserInfoSlice(set, get, store),
    ...createUserFriendsSlice(set, get, store),
    ...createUserWalletSlice(set, get, store),
    ...createUserEffectsSlice(set, get, store),
    ...createUserSocialSlice(set, get, store),
    ...createUserSoundSettingsSlice(set, get, store),
    ...createUserWordFilterSlice(set, get, store),
    ...createUserChatCommandsSlice(set, get, store),
}));

/**
 * The one UserStore for the whole client. It lives as long as the app does, so there is nothing a
 * provider would add: components read it through their hooks, and code outside React - packet
 * handlers, commands - reads and writes it through `getState()`, which is always current.
 */
export const userStore = createUserStore();
