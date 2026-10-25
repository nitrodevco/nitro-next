import { useUserStore } from '../useUserStore';

/** The effects the user owns, in the order the server listed them. */
export const useAvatarEffects = () => useUserStore(x => x.avatarEffects);
