import { ReactNode } from 'react';

import { AccordionContent, AccordionItem, AccordionTrigger, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

export interface FriendListGroupProps {
    value: string;
    caption: string;
    /** The caption row's `color` - `FriendListLaf.getRowShadingColor` for its index in the list. */
    color?: string;
    children?: ReactNode;
    /**
     * `friend_entry`'s category row (true: `FriendsView.refreshCategoryEntry`, the bold `caption`
     * at (0, 4) trailed by the open/closed arrow) or `search_entry`'s caption row (false:
     * `SearchView.refreshEntry`, the Volter Bold `caption` text at (5, 3) with no arrow).
     */
    showArrows?: boolean;
}

/**
 * A caption row of the friend list and the rows it opens. `refreshCatIcon` puts the arrow at
 * `caption.textWidth + 6` (down, y 8) or `+ 9` (right, y 5); the caption's box is its text plus
 * the 2px gutter on each side, so the arrow follows it 2 or 5 pixels on.
 */
export const FriendListGroup = ({ value, caption, color, children, showArrows = true }: FriendListGroupProps) => (
    <AccordionItem value={value}>
        <AccordionTrigger layout={{ position: 'relative', width: '100%', height: 20, flexShrink: 0 }}>
            {({ isOpen }) => (
                <Region
                    backgroundColor={color}
                    layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 20 }}
                >
                    {showArrows
                        ? (
                                <Box layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <ThemeText
                                        text={caption}
                                        textStyle="bold"
                                        verticalAlign="top"
                                        layout={{ marginTop: 4 }}
                                    />
                                    {/* `arrow_down_black_png` / `arrow_right_black_png`, the friend list's own library bitmaps. */}
                                    <ThemeImage
                                        name={isOpen ? 'arrow_down_black' : 'arrow_right_black'}
                                        src={LayoutImage(isOpen ? 'friend-list/friendlist_arrow_down_black.png' : 'friend-list/friendlist_arrow_right_black.png')}
                                        layout={isOpen ? { marginLeft: 2, marginTop: 8 } : { marginLeft: 5, marginTop: 5 }}
                                    />
                                </Box>
                            )
                        : (
                                <ThemeText
                                    text={caption}
                                    textOptions={{ fontFamily: 'VolterBold' }}
                                    flashFormat={{ antiAliasType: 'advanced' }}
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 5, top: 3, width: 200, height: 20 }}
                                />
                            )}
                </Region>
            )}
        </AccordionTrigger>
        <AccordionContent layout={{ flexDirection: 'column', width: '100%' }}>
            {children}
        </AccordionContent>
    </AccordionItem>
);
