import type { ReactNode } from 'react';

import { useFriendsActions, useTranslation } from '#base/context';
import { AccordionContent, AccordionItem, AccordionTrigger, Box, ColorLayer, NitroIcon, Text } from '#base/theme-pixi';

export interface FriendListTabPixiProps {
    value: string;
    caption: string;
    tooltip?: string;
    /** DOM's `triggerClassName` gradient (`bg-linear-to-b from-50% to-50%`) is a hard-edged
     *  two-band split, not a smooth blend - both color stops sit at the same 50% mark - so it's
     *  reproduced here as two stacked `ColorLayer` halves rather than a Pixi gradient fill. */
    gradientColors?: readonly [top: string, bottom: string];
    darkHeader?: boolean;
    contentBackgroundColor?: string;
    children?: ReactNode;
}

/** Pixi port of views/friendlist/FriendListTab.tsx. */
export const FriendListTabPixi = ({ value, caption, tooltip = '', gradientColors, darkHeader, contentBackgroundColor, children }: FriendListTabPixiProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const t = useTranslation();
    const hover = tooltip ? tooltipHandlers(tooltip) : undefined;

    return (
        <AccordionItem value={value}>
            <AccordionTrigger
                layout={{ height: 18, flexShrink: 0 }}
                onPointerOver={hover?.onMouseEnter}
                onPointerOut={hover?.onMouseLeave}
            >
                {({ isOpen }) => (
                    <>
                        {gradientColors && (
                            <Box layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', flexDirection: 'column' }}>
                                <ColorLayer
                                    color={gradientColors[0]}
                                    layout={{ width: '100%', height: '50%' }}
                                />
                                <ColorLayer
                                    color={gradientColors[1]}
                                    layout={{ width: '100%', height: '50%' }}
                                />
                            </Box>
                        )}
                        <Box layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 8, gap: 6 }}>
                            <Text
                                text={t(caption)}
                                textStyle="text-style-regular"
                                textOptions={{ fontSize: 10.88, fill: darkHeader ? '#ffffff' : '#000000' }}
                            />
                            <NitroIcon
                                icon={isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black'}
                                layout={{}}
                            />
                        </Box>
                    </>
                )}
            </AccordionTrigger>
            <AccordionContent layout={{ flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <ColorLayer color={contentBackgroundColor} />
                {children}
            </AccordionContent>
        </AccordionItem>
    );
};
