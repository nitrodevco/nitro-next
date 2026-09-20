/**
 * `wired_setup.uibuilder.presets.ScrollListPreset` with `params.ListScrollParams` - a column of
 * kit components in the `vertical_scroll_list_view` layout (a `scrollable_itemlist_vertical` of
 * style 100), `genericVerticalSpacing` apart by default.
 *
 * The list is as high as its content, clamped to `[minHeight, maxHeight]` (`fixHeight`); past
 * `maxHeight` a scrollbar appears 3px to the right of the content, which then narrows to make
 * room for it (`SCROLLBAR_WIDTH` 9 + `SCROLLBAR_MARGIN` 3). `centerHorizontally` (the
 * constructor's last argument) centres static-width children across the list.
 *
 * `ListScrollParams.alwaysShowScrollbar` sets Flash's `autoHideScrollBar` - despite its name it
 * lets the bar hide - which is what the theme's scroll area does anyway; `stickyHeader` /
 * `stickyFooter` are read by the frame preset, not by this list, and are not props here.
 */
import { Container } from 'pixi.js';
import { ReactNode, useState } from 'react';

import { Box, ColorLayer, ScrollArea, useLayoutSize } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';

/** `SCROLLBAR_MARGIN` - between the content and the scrollbar. */
const SCROLLBAR_MARGIN = 3;

export interface WiredScrollListProps {
    /** `ListScrollParams.minHeight`. */
    minHeight: number;
    /** `ListScrollParams.maxHeight`. */
    maxHeight: number;
    /** The constructor's `param6` - centre static-width children. Default `false`. */
    centerHorizontally?: boolean;
    /** `spacing`. Default: the style's `genericVerticalSpacing`. */
    spacing?: number;
    /** `backgroundColor` - a CSS colour. */
    backgroundColor?: string;
    children?: ReactNode;
}

export const WiredScrollList = ({ minHeight, maxHeight, centerHorizontally = false, spacing, backgroundColor, children }: WiredScrollListProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout();
    const [ contentNode, setContentNode ] = useState<Container | null>(null);
    const { height: contentHeight } = useLayoutSize(contentNode);
    const height = Math.min(maxHeight, Math.max(minHeight, Math.ceil(contentHeight)));

    return (
        <Box layout={{ flexDirection: 'column', height, flexShrink: 0, ...fillLayout }}>
            {backgroundColor && <ColorLayer color={backgroundColor} />}
            <ScrollArea
                variant="100"
                layout={{ width: '100%', height, gap: SCROLLBAR_MARGIN }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
            >
                <Box
                    ref={setContentNode}
                    layout={{ flexDirection: 'column', alignItems: centerHorizontally ? 'center' : 'stretch', gap: spacing ?? style.genericVerticalSpacing, width: '100%' }}
                >
                    <WiredFlow direction="column">
                        {children}
                    </WiredFlow>
                </Box>
            </ScrollArea>
        </Box>
    );
};
