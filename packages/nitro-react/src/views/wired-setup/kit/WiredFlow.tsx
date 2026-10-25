/**
 * Tells the kit components underneath which way their container lays them out, so that they
 * fill it the way Flash's `resizeToWidth` made them (see `useWiredFillLayout`). The kit's own
 * containers provide it; an element view only needs it around a hand-made row `Box` that holds
 * kit components.
 */
import { ReactNode } from 'react';

import { WiredFlowDirection, WiredFlowReactContext } from './wiredKitContexts';

export interface WiredFlowProps {
    direction: WiredFlowDirection;
    children?: ReactNode;
}

export const WiredFlow = ({ direction, children }: WiredFlowProps) => (
    <WiredFlowReactContext.Provider value={direction}>
        {children}
    </WiredFlowReactContext.Provider>
);
