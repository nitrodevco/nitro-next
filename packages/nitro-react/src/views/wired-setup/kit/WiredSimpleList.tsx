/**
 * `wired_setup.uibuilder.presets.SimpleListViewPreset` (`interfaces.IListPreset`) - the kit's
 * list: children stacked in a column, or laid out in a row.
 *
 * In a row the children with a static width keep it and the rest share what is left in equal
 * parts; when every child is static the list itself is (it is as wide as they are).
 * `centerVertically` is the constructor's third argument and only exists for rows. A child
 * that renders nothing takes no room and no gap, which is what Flash's `visible = false` plus
 * `onInvisibilityChanged` amount to.
 *
 * Flash's default gap is the style's `genericHorizontalSpacing` for a column and
 * `genericVerticalSpacing` for a row - crossed over, and kept that way (both are 5 in every
 * style).
 */
import { ReactNode } from 'react';

import { Box, BoxLayout, ColorLayer } from '#base/theme';

import { useWiredFillLayout, WiredStaticWidth } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredSimpleListProps {
    /** `true` stacks the children (`vertical_list_view`), `false` lays them in a row. Default `true`. */
    vertical?: boolean;
    /** Rows only: centres the children on the row's height. */
    centerVertically?: boolean;
    /** `IListPreset.spacing`. Default: the style's generic spacing. */
    spacing?: number;
    /** `SimpleListViewPreset.minHeight`. */
    minHeight?: number;
    /** `IListPreset.backgroundColor` - a CSS colour. */
    backgroundColor?: string;
    /** Rows only: the list's own static width - `'content'` when all children are static. Default: it fills. */
    staticWidth?: WiredStaticWidth;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const WiredSimpleList = ({ vertical = true, centerVertically = false, spacing, minHeight, backgroundColor, staticWidth, layout, children }: WiredSimpleListProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout(vertical ? undefined : staticWidth);
    const gap = spacing ?? (vertical ? style.genericHorizontalSpacing : style.genericVerticalSpacing);

    return (
        <Box layout={{
            flexDirection: vertical ? 'column' : 'row',
            alignItems: vertical ? 'stretch' : (centerVertically ? 'center' : 'flex-start'),
            gap,
            minHeight,
            flexShrink: 0,
            ...fillLayout,
            ...layout,
        }}
        >
            {backgroundColor && <ColorLayer color={backgroundColor} />}
            <WiredFlow direction={vertical ? 'column' : 'row'}>
                {children}
            </WiredFlow>
        </Box>
    );
};
