import { StateCreator } from 'zustand';

type State = {
    credits: number;
    emeralds: number;
    silver: number;
    activityPoints: Record<number, number>;
    /** The purse's club half (`Purse.clubDays` ... `minutesSinceLastModified`), from `ScrSendUserInfoMessage` - see `ClubSubscription`. */
    clubSubscription: ClubSubscription;
};

/**
 * The subscription fields Flash's `Purse` keeps, as `HabboCatalog.onSubscriptionInfo` writes them:
 * days and periods never below 0, `isExpiring` for response type 3. `hasClubLeft` and the club
 * type are derived (`getPurseHasClubLeft`, `getPurseClubType`).
 */
export interface ClubSubscription {
    clubDays: number;
    clubPeriods: number;
    isVip: boolean;
    pastClubDays: number;
    pastVipDays: number;
    isExpiring: boolean;
    minutesUntilExpiration: number;
    minutesSinceLastModified: number;
}

/** `Purse.hasClubLeft`: any days or periods left. */
export const getPurseHasClubLeft = (subscription: ClubSubscription) => ((subscription.clubDays > 0) || (subscription.clubPeriods > 0));

/** `ClubBuyController.getClubType`: 0 none, 1 HC, 2 VIP - only while club is left. */
export const getPurseClubType = (subscription: ClubSubscription) => (getPurseHasClubLeft(subscription) ? (subscription.isVip ? 2 : 1) : 0);

type Actions = {
    setCredits: (credits: number) => void;
    setEmeralds: (emeralds: number) => void;
    setSilver: (silver: number) => void;
    setManyActivityPoints: (updates: Record<number, number>) => void;
    setActivityPoints: (type: number, amount: number) => void;
    setClubSubscription: (clubSubscription: ClubSubscription) => void;
};

/**
 * The purse: credits, emeralds, silver and the activity point currencies by type, and the
 * subscription (`ClubSubscription`) Flash's `Purse` carries beside them.
 */
export const UserWalletSlice: State = {
    credits: 0,
    emeralds: 0,
    silver: 0,
    activityPoints: {},
    clubSubscription: { clubDays: 0, clubPeriods: 0, isVip: false, pastClubDays: 0, pastVipDays: 0, isExpiring: false, minutesUntilExpiration: 0, minutesSinceLastModified: 0 },
};

export type UserWalletSlice = State & Actions;

export const createUserWalletSlice: StateCreator<UserWalletSlice, [], [], UserWalletSlice> = (set, get, store) => ({
    ...UserWalletSlice,
    setCredits: (credits: number) => set({ credits }),
    setEmeralds: (emeralds: number) => set({ emeralds }),
    setSilver: (silver: number) => set({ silver }),
    setManyActivityPoints: (updates: Record<number, number>) => set((x) => {
        const activityPoints = { ...x.activityPoints };
        const keys = Object.keys(updates);

        for (const key of keys) activityPoints[key] = updates[key];

        return { activityPoints };
    }),
    setClubSubscription: (clubSubscription: ClubSubscription) => set({ clubSubscription }),
    setActivityPoints: (type: number, amount: number) => set((x) => {
        return {
            activityPoints: { ...x.activityPoints, [type]: amount },
        };
    }),
});
