import { useUserStore } from '../useUserStore';

export const useOwnUserGender = () => useUserStore(x => x.sex);
