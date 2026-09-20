/**
 * `wired_setup.uibuilder.presets.AlignRightWrapperPreset` (`WiredUIPreset.alignRight()`) - a
 * static-width child pushed to the right edge of the width it is given. Flash throws for a child
 * without a static width.
 */
import { ReactNode } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';

export interface WiredAlignRightProps {
    children?: ReactNode;
}

export const WiredAlignRight = ({ children }: WiredAlignRightProps) => {
    const fillLayout = useWiredFillLayout();

    return (
        <Box layout={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="row">
                {children}
            </WiredFlow>
        </Box>
    );
};
