import { ClubLevelEnum, NoobnessLevelEnum, RoomChatBubbleWidthType, RoomChatModeType, RoomChatScrollSpeedType, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { createUserEffectsSlice, UserEffectsSlice } from './UserEffectsSlice';
import { createUserFriendsSlice, UserFriendsSlice } from './UserFriendsSlice';
import { createUserInfoSlice, UserInfoSlice } from './UserInfoSlice';
import { createUserWalletSlice, UserWalletSlice } from './UserWalletSlice';

type State = {
    tags: string[];
    clubLevel: ClubLevelEnum;
    securityLevel: SecurityLevelEnum;
    isAmbassador: boolean;
    noobnessLevel: number;
    isEmailVerified: boolean;
    systemOpen: boolean;
    systemShutdown: boolean;
    isAuthenticHabbo: boolean;
    isRoomCameraFollowDisabled: boolean;
    /**
     * `AccountPreferencesEventMessage.uiFlags`: the account's remembered UI switches, one bit
     * each, kept whole because `SetUIFlagsComposer` sends the whole word back.
     */
    uiFlags: number;
    /** `AccountPreferencesEventMessage.preferedChatStyle` - the bubble style the user's own messages are sent with. */
    preferredChatStyle: number;
    /** `AccountPreferencesEventMessage.freeFlowChatDisabled` - hides the in-room bubbles entirely. */
    freeFlowChatDisabled: boolean;
    chatSizePreference: number;
    /** The account-level FreeFlow settings the newer client moved out of the room settings: `chatMode` / `chatBubbleWidth` / `chatScrollSpeed`. */
    chatMode: RoomChatModeType;
    chatBubbleWidth: RoomChatBubbleWidthType;
    chatScrollSpeed: RoomChatScrollSpeedType;
};

/** The bits of `uiFlags` this client knows about (`SessionDataManager.setUIFlag`). */
export enum UiFlagEnum {
    /** Set while the room tools are expanded; cleared while they are collapsed. */
    RoomToolsExpanded = 2,
}

export interface UserChatPreferences {
    preferredChatStyle: number;
    freeFlowChatDisabled: boolean;
    chatSizePreference: number;
    chatMode: RoomChatModeType;
    chatBubbleWidth: RoomChatBubbleWidthType;
    chatScrollSpeed: RoomChatScrollSpeedType;
}

type Actions = {
    setTags: (tags: string[]) => void;
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => void;
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
    setChatPreferences: (preferences: UserChatPreferences) => void;
    setPreferredChatStyle: (preferredChatStyle: number) => void;
    setFreeFlowChatDisabled: (freeFlowChatDisabled: boolean) => void;
    setUiFlags: (uiFlags: number) => void;
    /** Flips one bit and hands back the whole word, so the caller can send it on. */
    setUiFlag: (flag: UiFlagEnum, on: boolean) => number;
};

const initialState: State = {
    tags: [],
    clubLevel: ClubLevelEnum.Club,
    securityLevel: 0,
    isAmbassador: false,
    noobnessLevel: -1,
    isEmailVerified: false,
    systemOpen: false,
    systemShutdown: false,
    isAuthenticHabbo: false,
    isRoomCameraFollowDisabled: false,
    uiFlags: 0,
    preferredChatStyle: 0,
    freeFlowChatDisabled: false,
    chatSizePreference: 0,
    chatMode: RoomChatModeType.FreeFlow,
    chatBubbleWidth: RoomChatBubbleWidthType.Normal,
    chatScrollSpeed: RoomChatScrollSpeedType.Normal,
};

export type UserStore = State & Actions & UserInfoSlice & UserFriendsSlice & UserWalletSlice & UserEffectsSlice;

export const createUserStore = () => createStore<UserStore>()((set, get, store) => ({
    ...initialState,
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => set({ clubLevel, securityLevel, isAmbassador }),
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => set({ noobnessLevel }),
    increasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft + 1 })),
    decreasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft - 1 })),
    setTags: (tags: string[]) => set({ tags }),
    setChatPreferences: (preferences: UserChatPreferences) => set({ ...preferences }),
    setPreferredChatStyle: (preferredChatStyle: number) => set({ preferredChatStyle }),
    setFreeFlowChatDisabled: (freeFlowChatDisabled: boolean) => set({ freeFlowChatDisabled }),
    setUiFlags: (uiFlags: number) => set({ uiFlags }),
    setUiFlag: (flag: UiFlagEnum, on: boolean) => {
        const uiFlags = on ? (get().uiFlags | flag) : (get().uiFlags & ~flag);

        set({ uiFlags });

        return uiFlags;
    },
    ...createUserInfoSlice(set, get, store),
    ...createUserFriendsSlice(set, get, store),
    ...createUserWalletSlice(set, get, store),
    ...createUserEffectsSlice(set, get, store),
}));

/**
 * The one UserStore for the whole client. It lives as long as the app does, so there is nothing a
 * provider would add: components read it through their hooks, and code outside React - packet
 * handlers, commands - reads and writes it through `getState()`, which is always current.
 */
export const userStore = createUserStore();
