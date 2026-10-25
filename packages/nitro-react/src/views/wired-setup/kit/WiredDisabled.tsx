/**
 * `WiredUIPreset.disabled` for a whole subtree: every kit component underneath greys out (half
 * blend) and stops taking input, as `Util.disableSection` does to a window and its children.
 * It adds no box of its own. An ancestor's disabled state cannot be switched back on from
 * here - that is `WiredNoDisable`.
 */
import { ReactNode } from 'react';

import { useWiredDisabled } from './useWiredDisabled';
import { WiredDisabledReactContext } from './wiredKitContexts';

export interface WiredDisabledProps {
    disabled: boolean;
    children?: ReactNode;
}

export const WiredDisabled = ({ disabled, children }: WiredDisabledProps) => {
    const resolved = useWiredDisabled(disabled);

    return (
        <WiredDisabledReactContext.Provider value={resolved}>
            {children}
        </WiredDisabledReactContext.Provider>
    );
};
