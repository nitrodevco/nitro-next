import { ReactNode } from 'react';

import { AccordionContent, AccordionItem, AccordionTrigger, NitroIcon, ThemeText } from '#base/theme';

export interface FriendListGroupPixiProps {
    value: string;
    caption: string;
    children?: ReactNode;
    showArrows?: boolean;
}

/** Pixi port of views/friendlist/components/FriendListGroup.tsx. */
export const FriendListGroupPixi = ({ value, caption, children, showArrows = true }: FriendListGroupPixiProps) => (
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
                        <NitroIcon
                            icon={isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black'}
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
