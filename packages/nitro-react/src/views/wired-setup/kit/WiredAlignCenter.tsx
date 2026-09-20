/**
 * `wired_setup.uibuilder.presets.AlignCenterWrapperPreset` (`WiredUIPreset.alignCenter()`) - a
 * static-width child centred across the width it is given; a child without one fills it.
 */
import { ReactNode } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';

export interface WiredAlignCenterProps {
    children?: ReactNode;
}

export const WiredAlignCenter = ({ children }: WiredAlignCenterProps) => {
    const fillLayout = useWiredFillLayout();

    return (
        <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="row">
                {children}
            </WiredFlow>
        </Box>
    );
};
