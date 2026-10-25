import { ReactNode, useMemo } from 'react';

import { InteractionState } from '../hooks/useInteractionState';
import { DynamicStyleName } from '../utils/dynamicStyles';
import { DynamicStyleContext } from './DynamicStyleContext';

/**
 * Wraps a `dynamicStyle` host's children so their `#icon` / `#bg` rules (`dynamicRole`) follow
 * the host's hover/press/disabled state - the client's `WindowController` walking its
 * descendants with the host's state. Without a style name it is a plain fragment.
 */
export const DynamicStyleProvider = ({ name, state, children }: { name: DynamicStyleName | undefined; state: InteractionState; children: ReactNode }) => {
    const value = useMemo(() => (name ? { name, state } : undefined), [ name, state ]);

    if (!value) return <>{children}</>;

    return <DynamicStyleContext.Provider value={value}>{children}</DynamicStyleContext.Provider>;
};
