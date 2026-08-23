import { ClubLevelEnum, NoobnessLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
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
};

type Actions = {
    setTags: (tags: string[]) => void;
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => void;
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
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
};

export type UserStore = State & Actions & UserInfoSlice & UserFriendsSlice & UserWalletSlice;

export const createUserStore = () => createStore<UserStore>()((set, get, store) => ({
    ...initialState,
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => set({ clubLevel, securityLevel, isAmbassador }),
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => set({ noobnessLevel }),
    increasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft + 1 })),
    decreasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft - 1 })),
    setTags: (tags: string[]) => set({ tags }),
    ...createUserInfoSlice(set, get, store),
    ...createUserFriendsSlice(set, get, store),
    ...createUserWalletSlice(set, get, store),
}));
