import type { ClubLevelEnum, IUserInfo, NoobnessLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

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
} & IUserInfo;

type Actions = {
    setUserInfo: (userInfo: IUserInfo) => void;
    setName: (name: string, nameChangeAllowed: boolean) => void;
    setFigure: (figure: string, sex: string) => void;
    setAccountSafetyLocked: (accountSafetyLocked: boolean) => void;
    setEmailVerified: (directMail: boolean) => void;
    setTags: (tags: string[]) => void;
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) => void;
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
};

const initialState: State = {
    userId: undefined,
    name: undefined,
    figure: undefined,
    sex: undefined,
    customData: undefined,
    realName: undefined,
    directMail: false,
    respectTotal: 0,
    respectLeft: 0,
    petRespectLeft: 0,
    streamPublishingAllowed: false,
    lastAccessDate: '',
    nameChangeAllowed: false,
    accountSafetyLocked: false,
    tags: [],
    clubLevel: 0,
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

export type UserStore = State & Actions;

export const createUserStore = () => createStore<UserStore>()((set, get, store) => ({
    ...initialState,
    setUserInfo: (userInfo: IUserInfo) =>
        set(state => {
            return {
                ...userInfo,
            };
        }),
    setName: (name: string, nameChangeAllowed: boolean) =>
        set(state => {
            return {
                name,
                nameChangeAllowed,
            };
        }),
    setFigure: (figure: string, sex: string) => set({ figure, sex }),
    setAccountSafetyLocked: (accountSafetyLocked: boolean) => set({ accountSafetyLocked }),
    setRights: (clubLevel: ClubLevelEnum, securityLevel: SecurityLevelEnum, isAmbassador: boolean) =>
        set({ clubLevel, securityLevel, isAmbassador }),
    setNoobnessLevel: (noobnessLevel: NoobnessLevelEnum) => set({ noobnessLevel }),
    increasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft + 1 })),
    decreasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft - 1 })),
    setEmailVerified: (directMail: boolean) => set({ directMail }),
    setTags: (tags: string[]) => set({ tags }),
}));
