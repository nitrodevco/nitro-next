/**
 * `wired_setup.uibuilder.presets.HorizontalSectionListPreset` - sections side by side with no
 * gap, a vertical ruler (the style's `ruler_view_vertical`, 1px of `templates.rulerVertical`)
 * between two of them. Static-width children keep their width and the rest share what is left
 * in equal parts, the last of them taking the remainder. The row is as high as its tallest
 * child, and each ruler reaches `sectionSpacing` further down than the row.
 *
 * Pass the sections (usually `WiredSection`s, whose splitters then run under each column) as
 * children; `null` children are skipped.
 */
import { Children, Fragment, isValidElement, ReactNode } from 'react';

import { Box, Region } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredHorizontalSectionListProps {
    children?: ReactNode;
}

export const WiredHorizontalSectionList = ({ children }: WiredHorizontalSectionListProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout();
    const items = Children.toArray(children).filter(child => isValidElement(child));

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="row">
                {items.map((child, index) => (
                    <Fragment key={index}>
                        {(index > 0) && (
                            <Box layout={{ width: 1, alignSelf: 'stretch', flexShrink: 0 }}>
                                <Region
                                    backgroundColor={style.templates.rulerVertical.color}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: 1, bottom: -style.sectionSpacing }}
                                />
                            </Box>
                        )}
                        {child}
                    </Fragment>
                ))}
            </WiredFlow>
        </Box>
    );
};
