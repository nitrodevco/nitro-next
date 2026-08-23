import { useUserContext } from '../useUserContext';

export const useOwnUserGender = () => useUserContext(x => x.sex);
