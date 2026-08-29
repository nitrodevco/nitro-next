import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { MessageLayoutMessageItem } from './MessageLayoutMessageItem';
import { MessageLayoutTitleItem } from './MessageLayoutTitleItem';

/** Generated from `71_message_xml` (layout "message", 121x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessageLayoutProps {
    itemsItems?: ReactNode;
    layout?: BoxLayout;
}

export const MessageLayout = ({ itemsItems, layout }: MessageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 37, ...layout }}>
            <Region
                name="message"
                backgroundColor="#4c5832"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 37 }}
            >
                <Region
                    name="items"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 31, flexDirection: 'column', gap: -1 }}
                >
                    {itemsItems ?? (
                        <>
                            <MessageLayoutTitleItem />
                            <MessageLayoutMessageItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
