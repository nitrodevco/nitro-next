import type { IUserInfo } from '@nitrodevco/nitro-api';
import type { StateCreator } from 'zustand';

type State = {
    tags: string[];
    clubLevel: number;
    securityLevel: number;
    isAmbassador: boolean;
    noobnessLevel: number;
    isEmailVerified: boolean;
} & IUserInfo;

type Actions = {
    setUserInfo: (userInfo: IUserInfo) => void;
    setName: (name: string, nameChangeAllowed: boolean) => void;
    setFigure: (figure: string, sex: string) => void;
    setAccountSafetyLocked: (accountSafetyLocked: boolean) => void;
    setRights: (clubLevel: number, securityLevel: number, isAmbassador: boolean) => void;
    setNoobnessLevel: (noobnessLevel: number) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
    setEmailVerified: (directMail: boolean) => void;
    setTags: (tags: string[]) => void;
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
};

export type UserInfoSlice = State & Actions;

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set, get) => ({
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
    setRights: (clubLevel: number, securityLevel: number, isAmbassador: boolean) =>
        set({ clubLevel, securityLevel, isAmbassador }),
    setNoobnessLevel: (noobnessLevel: number) => set({ noobnessLevel }),
    increasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft + 1 })),
    decreasePetRespects: () => set(state => ({ petRespectLeft: state.petRespectLeft - 1 })),
    setEmailVerified: (directMail: boolean) => set({ directMail }),
    setTags: (tags: string[]) => set({ tags }),
});
