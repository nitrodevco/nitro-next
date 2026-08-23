import { AvatarGenderType, IUserInfo } from '@nitrodevco/nitro-api';
import type { StateCreator } from 'zustand';

type State = IUserInfo;

type Actions = {
    setUserInfo: (userInfo: IUserInfo) => void;
    setName: (name: string, nameChangeAllowed: boolean) => void;
    setFigure: (figure: string, sex: string) => void;
    setAccountSafetyLocked: (accountSafetyLocked: boolean) => void;
    setEmailVerified: (directMail: boolean) => void;
};

export const UserInfoSlice: State = {
    userId: -1,
    name: '',
    figure: '',
    sex: AvatarGenderType.Male,
    customData: '',
    realName: '',
    directMail: false,
    respectTotal: 0,
    respectLeft: 0,
    petRespectLeft: 0,
    streamPublishingAllowed: false,
    lastAccessDate: '',
    nameChangeAllowed: false,
    accountSafetyLocked: false,
};

export type UserInfoSlice = State & Actions;

export const createUserInfoSlice: StateCreator<UserInfoSlice, [], [], UserInfoSlice> = (set, get, store) => ({
    ...UserInfoSlice,
    setUserInfo: (userInfo: IUserInfo) => set({ ...userInfo }),
    setName: (name: string, nameChangeAllowed: boolean) => set({ name, nameChangeAllowed }),
    setFigure: (figure: string, sex: AvatarGenderType) => set({ figure, sex }),
    setAccountSafetyLocked: (accountSafetyLocked: boolean) => set({ accountSafetyLocked }),
    setEmailVerified: (directMail: boolean) => set({ directMail }),
});
