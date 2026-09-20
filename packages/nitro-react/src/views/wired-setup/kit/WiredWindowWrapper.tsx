/**
 * `wired_setup.uibuilder.presets.WindowWrapperPreset` (`PresetManager.createWrapperPreset`,
 * `WiredUIPreset.wrapWindow`) - what lets a window that is not a preset sit in a preset list.
 * In React any element can be a child of a kit list, so all that is left of it is the width
 * contract: wrap hand-made content in this to make it fill, or to give it a static width.
 */
import { ReactNode } from 'react';

import { Box, BoxLayout } from '#base/theme';

import { useWiredFillLayout, WiredStaticWidth } from './useWiredFillLayout';

export interface WiredWindowWrapperProps {
    /** `_staticWidth` - the content's fixed width, or `'content'`; absent, the content fills. */
    staticWidth?: WiredStaticWidth;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const WiredWindowWrapper = ({ staticWidth, layout, children }: WiredWindowWrapperProps) => {
    const fillLayout = useWiredFillLayout(staticWidth);

    return (
        <Box layout={{ flexDirection: 'column', flexShrink: 0, ...fillLayout, ...layout }}>
            {children}
        </Box>
    );
};
