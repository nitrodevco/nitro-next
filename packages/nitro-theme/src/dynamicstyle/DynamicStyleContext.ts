import { createContext } from 'react';

import { InteractionState } from '../hooks/useInteractionState';
import { DynamicStyleName } from '../utils/dynamicStyles';

/** The nearest `dynamicStyle` host: which style it names and the window state it is in. */
export interface DynamicStyleContextValue {
    name: DynamicStyleName;
    state: InteractionState;
}

/** The nearest `dynamicStyle` host, which its `#icon` / `#bg` tagged descendants take their rules from. */
export const DynamicStyleContext = createContext<DynamicStyleContextValue | undefined>(undefined);
