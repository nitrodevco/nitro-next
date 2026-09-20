import { ReactNode } from 'react';

import { AccordionContent, AccordionItem, AccordionTrigger, LayoutImage, ThemeImage, ThemeText } from '#base/theme';

export interface FriendListGroupProps {
    value: string;
    caption: string;
    children?: ReactNode;
    showArrows?: boolean;
}

/** Pixi port of views/friendlist/components/FriendListGroup.tsx. */
export const FriendListGroup = ({ value, caption, children, showArrows = true }: FriendListGroupProps) => (
    <AccordionItem value={value}>
        <AccordionTrigger layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 4, paddingTop: 2, paddingBottom: 2, height: 20 }}>
            {({ isOpen }) => (
                <>
                    <ThemeText
                        text={caption}
                        textStyle="text-style-button-bold"
                        textOptions={{ fill: '#000000' }}
                    />
                    {showArrows && (
                        // `FriendsView.refreshCategoryEntry` -> `refreshCatIcon`: the category
                        // row's caption trails the `arrow_down_black_png` / `arrow_right_black_png`
                        // library bitmaps of `friend_entry`.
                        <ThemeImage
                            name={isOpen ? 'arrow_down_black' : 'arrow_right_black'}
                            src={LayoutImage(isOpen ? 'friend-list/friendlist_arrow_down_black.png' : 'friend-list/friendlist_arrow_right_black.png')}
                            layout={{}}
                        />
                    )}
                </>
            )}
        </AccordionTrigger>
        <AccordionContent layout={{ flexDirection: 'column' }}>
            {children}
        </AccordionContent>
    </AccordionItem>
);
