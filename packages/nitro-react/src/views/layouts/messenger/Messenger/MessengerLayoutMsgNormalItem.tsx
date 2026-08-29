import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `msg_normal` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgNormalItemProps {
    layout?: BoxLayout;
    msgNormal?: ReactNode;
}

export const MessengerLayoutMsgNormalItem = ({ layout, msgNormal }: MessengerLayoutMsgNormalItemProps) => {
    return (
        <WidgetSlot
            widgetType="illumina_chat_bubble"
            name="msg_normal"
            options={{ 'illumina_chat_bubble:figure': 'hd-180-1.ch-210-66.lg-270-82.sh-290-81' }}
            layout={{ width: 259, height: 60, flexShrink: 0, ...layout }}
        >
            {msgNormal}
        </WidgetSlot>
    );
};
