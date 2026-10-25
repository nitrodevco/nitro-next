import { useUserStore } from '../useUserStore';

/** The purse's club half (`Purse.clubDays` ... `minutesSinceLastModified`), see `ClubSubscription`. */
export const useOwnClubSubscription = () => useUserStore(x => x.clubSubscription);
