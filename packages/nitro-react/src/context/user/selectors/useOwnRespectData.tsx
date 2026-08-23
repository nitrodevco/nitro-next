import { useShallow } from 'zustand/shallow';

import { useUserContext } from '../useUserContext';

export const useOwnRespectData = () => useUserContext(useShallow(x => ({
    respectTotal: x.respectTotal,
    respectLeft: x.respectLeft,
    petRespectLeft: x.petRespectLeft,
})));
