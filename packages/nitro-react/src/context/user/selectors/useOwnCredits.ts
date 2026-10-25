import { useUserStore } from '../useUserStore';

/** The user's credits, as the purse holds them (`Purse.credits`). */
export const useOwnCredits = () => useUserStore(x => x.credits);
