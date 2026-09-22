/**
 * `wired_setup.uibuilder.presets.AlignCenterWrapperPreset` (`WiredUIPreset.alignCenter()`) - a
 * static-width child centred across the width it is given; a child without one fills it.
 * Standing directly in the frame's list it is an element of its own (`WiredFrameListItem`).
 */
import { ReactNode } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { WiredFrameListItem } from './WiredFrameListItem';

export interface WiredAlignCenterProps {
    children?: ReactNode;
}

export const WiredAlignCenter = ({ children }: WiredAlignCenterProps) => (
    <WiredFrameListItem>
        {() => <WiredAlignCenterBox>{children}</WiredAlignCenterBox>}
    </WiredFrameListItem>
);

const WiredAlignCenterBox = ({ children }: WiredAlignCenterProps) => {
    const fillLayout = useWiredFillLayout();

    return (
        <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="row">
                {children}
            </WiredFlow>
        </Box>
    );
};
