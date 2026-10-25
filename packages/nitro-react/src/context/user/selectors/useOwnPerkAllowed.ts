import { PerkCode } from '../perks';
import { useUserStore } from '../useUserStore';

/** `SessionDataManager.isPerkAllowed`: whether the server sent the perk, allowed. */
export const useOwnPerkAllowed = (code: PerkCode) => useUserStore(x => x.perks.get(code)?.isAllowed === true);
