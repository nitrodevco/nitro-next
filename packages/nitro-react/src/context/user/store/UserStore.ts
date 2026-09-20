import { ClubLevelEnum, NoobnessLevelEnum, RoomChatBubbleWidthType, RoomChatModeType, RoomChatScrollSpeedType, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { createUserEffectsSlice, UserEffectsSlice } from './UserEffectsSlice';
import { createUserFriendsSlice, UserFriendsSlice } from './UserFriendsSlice';
import { createUserInfoSlice, UserInfoSlice } from './UserInfoSlice';
import { createUserSocialSlice, UserSocialSlice } from './UserSocialSlice';
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
    /** `SessionDataManager.isRoomCameraFollowDisabled` - `AccountPreferences.roomCameraFollowDisabled`: the room camera stays put when the avatar walks. */
    isRoomCameraFollowDisabled: boolean;
    /** `HabboMessenger.getRoomInvitesIgnored` - `AccountPreferences.roomInvitesIgnored`. */
    roomInvitesIgnored: boolean;
    /** `HabboMessenger.getOnlineIndicatorPreference` - `AccountPreferences.onlineIndicatorPreference`: who is told when this user comes online. */
    onlineIndicatorPreference: number;
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
    /** `SessionDataManager.hasNftChatStyle` - the NFT chat styles (ids 1000-9999) the account holds (`UserNftChatStylesMessage`). */
    nftChatStyles: number[];
    /** `SessionDataManager.hasPurchasableChatStyle` - the bought chat styles (`UserPurchasableChatStylesMessage`, then one at a time). */
    purchasableChatStyles: number[];
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
    setRoomCameraFollowDisabled: (isRoomCameraFollowDisabled: boolean) => void;
    setRoomInvitesIgnored: (roomInvitesIgnored: boolean) => void;
    setOnlineIndicatorPreference: (onlineIndicatorPreference: number) => void;
    /** Flips one bit and hands back the whole word, so the caller can send it on. */
    setUiFlag: (flag: UiFlagEnum, on: boolean) => number;
    setNftChatStyles: (nftChatStyles: number[]) => void;
    setPurchasableChatStyles: (purchasableChatStyles: number[]) => void;
    /** `SessionDataManager.onPurchasableChatStyleChanged`: one style bought or taken away. */
    setPurchasableChatStyleOwned: (styleId: number, owned: boolean) => void;
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
    roomInvitesIgnored: false,
    onlineIndicatorPreference: 0,
    uiFlags: 0,
    preferredChatStyle: 0,
    freeFlowChatDisabled: false,
    chatSizePreference: 0,
    chatMode: RoomChatModeType.FreeFlow,
    chatBubbleWidth: RoomChatBubbleWidthType.Normal,
    chatScrollSpeed: RoomChatScrollSpeedType.Normal,
    nftChatStyles: [],
    purchasableChatStyles: [],
};

export type UserStore = State & Actions & UserInfoSlice & UserFriendsSlice & UserWalletSlice & UserEffectsSlice & UserSocialSlice;

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
    setRoomCameraFollowDisabled: (isRoomCameraFollowDisabled: boolean) => set({ isRoomCameraFollowDisabled }),
    setRoomInvitesIgnored: (roomInvitesIgnored: boolean) => set({ roomInvitesIgnored }),
    setOnlineIndicatorPreference: (onlineIndicatorPreference: number) => set({ onlineIndicatorPreference }),
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
    ...createUserInfoSlice(set, get, store),
    ...createUserFriendsSlice(set, get, store),
    ...createUserWalletSlice(set, get, store),
    ...createUserEffectsSlice(set, get, store),
    ...createUserSocialSlice(set, get, store),
}));

/**
 * The one UserStore for the whole client. It lives as long as the app does, so there is nothing a
 * provider would add: components read it through their hooks, and code outside React - packet
 * handlers, commands - reads and writes it through `getState()`, which is always current.
 */
export const userStore = createUserStore();
