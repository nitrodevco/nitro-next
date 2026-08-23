import { useShallow } from 'zustand/shallow';

import { useUserContext } from '../useUserContext';

export const useOwnUserLook = () => useUserContext(useShallow(x => ({
    ownFigure: x.figure,
    ownGender: x.sex,
})));
