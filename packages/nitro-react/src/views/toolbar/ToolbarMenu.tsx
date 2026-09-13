import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, IconKey, NitroIcon, ThemeText, useTextureFromUrl } from '#base/theme';

export interface ToolbarMenuItem {
    icon: IconKey;
    label: string;
}

export interface ToolbarMenuProps {
    items: ToolbarMenuItem[];
}


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
                    <Box
                        key={icon}
                        eventMode="static"
                        cursor="pointer"
                        layout={{ width: 62, height: 43, flexDirection: 'column', alignItems: 'center' }}
                    >
                        <NitroIcon
                            icon={icon}
                            layout={{ marginLeft: 'auto', marginRight: 'auto' }}
                        />
                        <ThemeText
                            text={label}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Box>
                ))}
            </Box>
        );
    },
);

ToolbarMenu.displayName = 'ToolbarMenu';
