import type { StateCreator } from "zustand";

type State = {
    credits: number;
    emeralds: number;
    silver: number;
    activityPoints: Record<number, number>;
}

type Actions = {
    setCredits: (credits: number) => void,
    setEmeralds: (emeralds: number) => void,
    setSilver: (silver: number) => void,
    setActivityPoints: (type: number, amount: number) => void,
};

export const UserWalletSlice: State = {
    credits: 0,
    emeralds: 0,
    silver: 0,
    activityPoints: {}
};

export type UserWalletSlice = State & Actions;

export const createUserWalletSlice: StateCreator<UserWalletSlice, [], [], UserWalletSlice> = (set, get, store) => ({
    ...UserWalletSlice,
    setCredits: (credits: number) => set({ credits }),
    setEmeralds: (emeralds: number) => set({ emeralds }),
    setSilver: (silver: number) => set({ silver }),
    setActivityPoints: (type: number, amount: number) => set(x => {
        return {
            activityPoints: { ...x.activityPoints, [type]: amount }
        }
    })
});