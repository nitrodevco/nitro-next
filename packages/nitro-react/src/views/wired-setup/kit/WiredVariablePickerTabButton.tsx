/**
 * `newvariablepicker/tabbuttons/TabButtonView` - one tab of the expanded variable picker
 * (`button_template` of the `search_tree_dropdown` layout): an icon on a tinted `button_border`
 * with a 2px `button_shadow` line under it, both of which follow the active / hovered state
 * (`updateColoring`).
 *
 * `button_border` is `<border style="3" color="0xfafafa">` - a skinned border whose colour tints
 * the art, and style 3's art is rounded at all four corners. Drawn as a flat rectangle instead,
 * the first and last tab square off the rounded top corners of the popup's own border, which is
 * what put a coloured square over the curve. `button_shadow` is a plain `background` container,
 * so that one is a flat fill in Flash too.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, LayoutImage, Region, ThemeImage } from '#base/theme';
import { WiredVariablePickerTab } from '#base/wired';

/** `TabButtonView.SELECTED_BG` / `HOVER_BG` / `NONE_BG` and the shadow colour that goes with each. */
const SELECTED_COLORS = { fill: '#e0e0e0', shadow: '#aaaaaa', blend: 0.6 };
const HOVER_COLORS = { fill: '#efefef', shadow: '#cccccc', blend: 0.5 };
const NONE_COLORS = { fill: '#fafafa', shadow: '#dddddd', blend: 0.4 };

export interface WiredVariablePickerTabButtonProps {
    tab: WiredVariablePickerTab;
    width: number;
    active: boolean;
    onPress: () => void;
}

export const WiredVariablePickerTabButton = ({ tab, width, active, onPress }: WiredVariablePickerTabButtonProps) => {
    const t = useTranslation();
    const [ hovered, setHovered ] = useState(false);
    const colors = active ? SELECTED_COLORS : (hovered ? HOVER_COLORS : NONE_COLORS);

    return (
        <Region
            tooltip={t(tab.tooltipKey, tab.tooltipKey)}
            cursor="pointer"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerTap={onPress}
            layout={{ width, height: 20, flexShrink: 0 }}
        >
            <Border
                variant="3"
                tintColor={colors.fill}
                layout={{ position: 'absolute', left: 0, top: 0, width, height: 20 }}
            >
                <Box layout={{ width, height: 18, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeImage
                        src={LayoutImage(`wired/${tab.asset}.png`)}
                        alpha={colors.blend}
                    />
                </Box>
            </Border>
            <Region
                backgroundColor={colors.shadow}
                layout={{ position: 'absolute', left: 0, top: 18, width, height: 2 }}
            />
        </Region>
    );
};
