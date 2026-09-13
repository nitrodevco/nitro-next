import { createContext } from 'react';

import { InteractionState } from '../hooks/useInteractionState';
import { DynamicStyleName } from '../utils/dynamicStyles';

/** The nearest `dynamicStyle` host: which style it names and the window state it is in. */
export interface DynamicStyleContextValue {
    name: DynamicStyleName;
    state: InteractionState;
}

export const DynamicStyleContext = createContext<DynamicStyleContextValue | undefined>(undefined);
