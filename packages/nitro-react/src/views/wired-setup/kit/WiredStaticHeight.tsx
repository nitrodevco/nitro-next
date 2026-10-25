/**
 * `wired_setup.uibuilder.presets.StaticHeightPreset` (`WiredUIPreset.staticHeight(n)`) - a child
 * that fills the width in a box of a fixed height, whatever its own height is.
 */
import { ReactNode } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';

export interface WiredStaticHeightProps {
    height: number;
    children?: ReactNode;
}

export const WiredStaticHeight = ({ height, children }: WiredStaticHeightProps) => {
    const fillLayout = useWiredFillLayout();

    return (
        <Box layout={{ flexDirection: 'column', height, flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="column">
                {children}
            </WiredFlow>
        </Box>
    );
};
