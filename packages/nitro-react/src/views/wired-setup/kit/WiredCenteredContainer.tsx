/**
 * `wired_setup.uibuilder.presets.CenteredContainerPreset` - one static-width child centred
 * across the width, with `margin` pixels above and below it. Flash throws for a child without a
 * static width; here such a child would simply fill.
 */
import { ReactNode } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';

export interface WiredCenteredContainerProps {
    /** `_topBottomMargin`. */
    margin: number;
    children?: ReactNode;
}

export const WiredCenteredContainer = ({ margin, children }: WiredCenteredContainerProps) => {
    const fillLayout = useWiredFillLayout();

    return (
        <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingTop: margin, paddingBottom: margin, flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="row">
                {children}
            </WiredFlow>
        </Box>
    );
};
