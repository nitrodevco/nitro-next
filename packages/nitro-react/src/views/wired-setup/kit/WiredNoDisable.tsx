/**
 * `WiredUIPreset.noDisable()` - the `DO_NOT_DISABLE` tag: what is underneath stays enabled and
 * at full blend whatever its ancestors' disabled state (the info text under a radio option
 * that must stay readable while the option is unselected).
 */
import { ReactNode } from 'react';

import { WiredDisabledReactContext } from './wiredKitContexts';

export interface WiredNoDisableProps {
    children?: ReactNode;
}

export const WiredNoDisable = ({ children }: WiredNoDisableProps) => (
    <WiredDisabledReactContext.Provider value={false}>
        {children}
    </WiredDisabledReactContext.Provider>
);
