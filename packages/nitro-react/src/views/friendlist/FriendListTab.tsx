import { ReactNode } from 'react';

import { useFriendsActions } from '#base/context/friend';
import { useTranslation } from '#base/context/system';
import { AccordionContent, AccordionItem, AccordionTrigger, Box, ColorLayer, LayoutImage, ThemeImage, ThemeText } from '#base/theme';

export interface FriendListTabProps {
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
export const FriendListTab = ({ value, caption, tooltip = '', gradientColors, darkHeader, contentBackgroundColor, children }: FriendListTabProps) => {
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
                            <ThemeText
                                text={t(caption)}
                                textStyle="text-style-regular"
                                textOptions={{ fill: darkHeader ? '#ffffff' : '#000000' }}
                            />
                            {/* `FriendListTabsView.refreshHeader` trails the caption with the
                                `arrow_down_black_png` / `arrow_right_black_png` library bitmaps
                                (`refreshArrowIcon`), never an icon-set style. Flash also has a
                                white pair for the two dark headers; this port tints its own text
                                instead and keeps the black arrows. */}
                            <ThemeImage
                                name={isOpen ? 'arrow_down_black' : 'arrow_right_black'}
                                src={LayoutImage(isOpen ? 'friend-list/friendlist_arrow_down_black.png' : 'friend-list/friendlist_arrow_right_black.png')}
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
