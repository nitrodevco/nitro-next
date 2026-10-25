/**
 * `wired_setup.uibuilder.presets.FloatVerticallyPreset` (`WiredUIPreset.floatVertically()`) - a
 * child that takes its width in the list but only one pixel of its height, so what follows is
 * laid out underneath it as if it were not there and the child floats over it.
 */
import { ReactNode } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout, useWiredFlow, WiredStaticWidth } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';

export interface WiredFloatVerticallyProps {
    /** The child's static width, when it has one (`hasStaticWidth` is passed through). */
    staticWidth?: WiredStaticWidth;
    children?: ReactNode;
}

export const WiredFloatVertically = ({ staticWidth, children }: WiredFloatVerticallyProps) => {
    const fillLayout = useWiredFillLayout(staticWidth);
    const flow = useWiredFlow();

    return (
        <Box layout={{ flexDirection: 'column', height: 1, overflow: 'visible', flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction={(staticWidth === undefined) ? 'column' : flow}>
                {children}
            </WiredFlow>
        </Box>
    );
};
