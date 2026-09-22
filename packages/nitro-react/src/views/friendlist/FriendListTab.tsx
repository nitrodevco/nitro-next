import { ReactNode } from 'react';

import { useFriendsActions } from '#base/context/friend';
import { useTranslation } from '#base/context/system';
import { AccordionContent, AccordionItem, AccordionTrigger, Box, ColorLayer, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * The rows of a tab's 1x18 header bitmap (`hdr_friends_png`, `hdr_friend_requests_png`,
 * `hdr_search_png`), stretched to the tab's width: one row of the lower band, eight of the upper,
 * eight of the lower and a dark bottom line. Drawn as those four fills, which is the bitmap
 * pixel for pixel.
 */
export type FriendListTabHeaderColors = readonly [ upper: string, lower: string, line: string ];

export interface FriendListTabProps {
    value: string;
    /** The tab's name (`FriendListTab.name`); the header reads `name (count)`. */
    caption: string;
    /** `ITabView.getEntryCount`. */
    count: number;
    tooltip?: string;
    headerColors: FriendListTabHeaderColors;
    /** `FriendListLaf.getTabTextColor` for this tab. */
    textColor: string;
    /** `FriendListLaf.getTabBgColor` - the `tab_content` container's colour. */
    contentBackgroundColor: string;
    /**
     * `refreshHeader` draws the black arrows on the friends tab (id 1) while no new message has
     * arrived, the white ones on every other header.
     */
    blackArrows?: boolean;
    children?: ReactNode;
}

/**
 * One tab of the friend list (`FriendListTabsView.refreshHeader` + `refreshTabContent`): the
 * 18px `header` of `main_window`'s `flt_<id>` with its `caption_text` at (4, 2) and the
 * open/closed arrow at `caption_text.textWidth + 12` (down, y 6) or `+ 15` (right, y 4) - the
 * caption box carries a 2px gutter on each side, so 4 or 7 pixels after it - and, when open, the
 * `tab_content` it holds.
 *
 * Flash draws the two dark tabs' arrows from the white `arrow_*_white_png` pair; the port ships
 * only the black pair (`public/assets/friend-list`), so every tab draws the black one.
 */
export const FriendListTab = ({ value, caption, count, tooltip = '', headerColors, textColor, contentBackgroundColor, blackArrows = false, children }: FriendListTabProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const t = useTranslation();
    const hover = tooltip ? tooltipHandlers(tooltip) : undefined;
    const [ upper, lower, line ] = headerColors;

    return (
        <AccordionItem value={value}>
            <AccordionTrigger
                layout={{ position: 'relative', width: '100%', height: 18, flexShrink: 0 }}
                onPointerOver={hover?.onMouseEnter}
                onPointerOut={hover?.onMouseLeave}
            >
                {({ isOpen }) => (
                    <>
                        <ColorLayer
                            color={lower}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 1 }}
                        />
                        <ColorLayer
                            color={upper}
                            layout={{ position: 'absolute', left: 0, top: 1, width: '100%', height: 8 }}
                        />
                        <ColorLayer
                            color={lower}
                            layout={{ position: 'absolute', left: 0, top: 9, width: '100%', height: 8 }}
                        />
                        <ColorLayer
                            color={line}
                            layout={{ position: 'absolute', left: 0, top: 17, width: '100%', height: 1 }}
                        />
                        <Box layout={{ position: 'absolute', left: 4, top: 0, flexDirection: 'row', alignItems: 'flex-start' }}>
                            <ThemeText
                                text={`${t(caption)} (${count})`}
                                textStyle="regular"
                                textOptions={{ fill: textColor }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                verticalAlign="top"
                                layout={{ marginTop: 2 }}
                            />
                            <ThemeImage
                                name={`arrow_${isOpen ? 'down' : 'right'}_${blackArrows ? 'black' : 'white'}`}
                                src={blackArrows
                                    ? LayoutImage(isOpen ? 'friend-list/friendlist_arrow_down_black.png' : 'friend-list/friendlist_arrow_right_black.png')
                                    : LayoutImage(isOpen ? 'friend-list/friendlist_arrow_down_white.png' : 'friend-list/friendlist_arrow_right_white.png')}
                                layout={isOpen ? { marginLeft: 4, marginTop: 6 } : { marginLeft: 7, marginTop: 4 }}
                            />
                        </Box>
                    </>
                )}
            </AccordionTrigger>
            <AccordionContent layout={{ flexDirection: 'column', flex: 1, minHeight: 0 }}>
                {/* `tab_content`: the list at (5, 5), the footer along the bottom. */}
                <Region
                    backgroundColor={contentBackgroundColor}
                    layout={{ flex: 1, minHeight: 0, flexDirection: 'column', paddingTop: 5 }}
                >
                    {children}
                </Region>
            </AccordionContent>
        </AccordionItem>
    );
};
