import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `2897_chat_msg_xml` (layout "chat_msg", 259x64) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatMsgLayoutProps {
    layout?: BoxLayout;
    msgWidget?: ReactNode;
}

export const ChatMsgLayout = ({ layout, msgWidget }: ChatMsgLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 259, height: 64, ...layout }}>
            <WidgetSlot
                widgetType="illumina_chat_bubble"
                name="msg_widget"
                layout={{ position: 'absolute', left: 0, width: 259, top: 0, height: 64 }}
            >
                {msgWidget}
            </WidgetSlot>
        </Region>
    );
};
