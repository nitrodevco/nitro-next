import { useUserStore } from '../useUserStore';

/** `SessionDataManager.isAccountSafetyLocked`: whether the account is safety locked. */
export const useAccountSafetyLocked = () => useUserStore(x => x.accountSafetyLocked);
