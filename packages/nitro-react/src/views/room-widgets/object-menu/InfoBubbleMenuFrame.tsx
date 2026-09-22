/**
 * The bubble every room object menu is drawn in, with the geometry of its Flash layout
 * (`avatar_menu_widget`, `own_avatar_menu`, `pet_menu`, `own_pet_menu`, `own_avatar_decorating`,
 * `breed_pet_menu`):
 * a style 0 `bubble` tinted `0x6e6b67` whose `border` container holds the header, a one-pixel
 * black `background` rule, the `buttons` list and the `minimize` region - and, minimized, the
 * `minimized_menu` bubble instead.
 *
 * The sizes follow the layout's resize chain: `buttons` accommodates its rows
 * (`resize_on_item_update`, `spacing` 1) and reflects its height change onto `border`, which
 * reflects it onto the bubble (`reflect_vertical_resize_to_parent`), so the border stays its
 * layout height minus the list's, and the bubble its layout height minus the border's, away from
 * the list. `minimize` keeps its distance to the border's bottom (`relative_vertical_scale_move`).
 * The bubble is the Flash window (`Bubble` with `margins`), 8 wider than the border.
 */
import { ReactNode, useState } from 'react';

import { Box, Bubble, Icon, Region } from '#base/theme';

import { InfoBubbleMenuGeometry, LIST_SPACING, menuListHeight } from './InfoBubbleMenuGeometry';

/** `ContextInfoView.onMinimizeHover`: `4282950861` over, `16777215` out. */
const MINIMIZE_HOVER_TINT = '#48a4cd';
const MINIMIZE_TINT = '#ffffff';

/** The `minimize` region: icon style 7, tinted while the pointer is over it. */
const MinimizeRegion = ({ geometry, top, onToggle }: { geometry: NonNullable<InfoBubbleMenuGeometry['minimize']>; top: number; onToggle: () => void }) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Region
            name="minimize"
            cursor="pointer"
            onPointerTap={onToggle}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ position: 'absolute', left: geometry.left, top, width: geometry.width, height: geometry.height, flexDirection: 'row', justifyContent: 'center' }}
        >
            <Icon
                variant={7}
                tintColor={hovered ? MINIMIZE_HOVER_TINT : MINIMIZE_TINT}
                layout={(geometry.iconLeft === undefined) ? { marginTop: geometry.iconTop } : { position: 'absolute', left: geometry.iconLeft, top: geometry.iconTop }}
            />
        </Region>
    );
};

/** `minimized_menu`: a 45x35 bubble holding the 38x30 `minimize` region with icon style 6 at 14,11. */
const MinimizedMenu = ({ onToggle }: { onToggle: () => void }) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            margins={[ 4, 4, 4, 4 ]}
            layout={{ width: 45, height: 35 }}
        >
            <Region
                name="minimize"
                cursor="pointer"
                onPointerTap={onToggle}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                layout={{ position: 'absolute', left: 0, top: 0, width: 38, height: 30 }}
            >
                <Icon
                    variant={6}
                    tintColor={hovered ? MINIMIZE_HOVER_TINT : MINIMIZE_TINT}
                    layout={{ position: 'absolute', left: 14, top: 11 }}
                />
            </Region>
        </Bubble>
    );
};

export interface InfoBubbleMenuFrameProps {
    geometry: InfoBubbleMenuGeometry;
    /** The heights of the rows the list shows, in order - what `menuListHeight` sums. */
    rowHeights: number[];
    /** `profile_link` and what else the border holds above the rule, placed in the border's space. */
    header?: ReactNode;
    /** The rows, in the layout's child order. */
    children: ReactNode;
    collapsed?: boolean;
    /** `onMinimize` / `onMaximize`; without it there is no `minimize` region. */
    onToggleCollapsed?: () => void;
}

export const InfoBubbleMenuFrame = ({ geometry, rowHeights, header, children, collapsed = false, onToggleCollapsed }: InfoBubbleMenuFrameProps) => {
    if (collapsed && onToggleCollapsed) return <MinimizedMenu onToggle={onToggleCollapsed} />;

    const listHeight = menuListHeight(rowHeights);
    const borderHeight = listHeight + geometry.borderExtra;
    const bubbleHeight = borderHeight + geometry.bubbleExtra;

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            margins={[ 4, geometry.marginTop, 4, 4 ]}
            layout={{ width: geometry.width + 8, height: bubbleHeight }}
        >
            <Box layout={{ position: 'absolute', left: 0, top: 0, width: geometry.width, height: borderHeight }}>
                {header}
                <Region
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: geometry.rule.left, top: geometry.rule.top, width: geometry.rule.width, height: 1 }}
                />
                {/* Every row and grid of `buttons` sits at x 1 in it. */}
                <Box layout={{ position: 'absolute', left: geometry.list.left, top: geometry.list.top, width: geometry.list.width, height: listHeight, flexDirection: 'column', gap: LIST_SPACING, paddingLeft: 1 }}>
                    {children}
                </Box>
                {geometry.minimize && onToggleCollapsed && (
                    <MinimizeRegion
                        geometry={geometry.minimize}
                        top={borderHeight - geometry.minimize.fromBottom}
                        onToggle={onToggleCollapsed}
                    />
                )}
            </Box>
        </Bubble>
    );
};
