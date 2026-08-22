import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { Box, type IconKey, NitroIcon, Text, useTextureFromUrl } from '#base/theme-pixi';

export interface ToolbarMenuItem {
    icon: IconKey;
    label: string;
}

export interface ToolbarMenuProps {
    items: ToolbarMenuItem[];
}

/**
 * Shared shape behind theme/ToolbarMeMenu.tsx and theme/ToolbarProgressionMenu.tsx - both are
 * otherwise-identical DOM components (same `.toolbar-menu`/`.toolbar-menu-button` CSS, same
 * `border-image` popup chrome) that differ only in which icons/labels they list, so their Pixi
 * ports share this one render implementation. DOM's per-button grayscale-filter hover
 * transition (icons render grayscale by default, hover restores full color) and the menu's own
 * pop-in animation have no direct Pixi equivalent without a tween/filter system this package
 * doesn't otherwise use - dropped rather than half-built, flagged here rather than silently
 * skipped.
 */
export const ToolbarMenu: ForwardRefExoticComponent<ToolbarMenuProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ToolbarMenuProps>(
    ({ items }, ref) => {
        const bgTexture = useTextureFromUrl('/assets/flash/toolbar/menu_bg.png');

        return (
            <Box
                ref={ref}
                layout={{ position: 'absolute', left: 4, bottom: 48, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingLeft: 12, paddingRight: 12, minWidth: 60, height: 55 }}
            >
                {bgTexture && (
                    <pixiNineSliceSprite
                        texture={bgTexture}
                        leftWidth={6}
                        topHeight={6}
                        rightWidth={6}
                        bottomHeight={6}
                        eventMode="none"
                        layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                    />
                )}
                {items.map(({ icon, label }) => (
                    <Box key={icon} eventMode="static" cursor="pointer" layout={{ width: 62, height: 43, flexDirection: 'column', alignItems: 'center' }}>
                        <NitroIcon icon={icon} layout={{ marginLeft: 'auto', marginRight: 'auto' }} />
                        <Text text={label} textStyle="text-style-regular" textOptions={{ fontSize: 9.6, fill: '#ffffff' }} />
                    </Box>
                ))}
            </Box>
        );
    }
);

ToolbarMenu.displayName = 'ToolbarMenu';
