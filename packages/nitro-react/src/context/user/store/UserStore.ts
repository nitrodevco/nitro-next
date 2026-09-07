import { ClubLevelEnum, NoobnessLevelEnum, RoomChatBubbleWidthType, RoomChatModeType, RoomChatScrollSpeedType, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

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

export type UserStore = State & Actions & UserInfoSlice & UserFriendsSlice & UserWalletSlice;

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
    ...createUserInfoSlice(set, get, store),
    ...createUserFriendsSlice(set, get, store),
    ...createUserWalletSlice(set, get, store),
}));
