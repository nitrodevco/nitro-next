import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { MessengerLayoutMsgInfoItem } from './MessengerLayoutMsgInfoItem';
import { MessengerLayoutMsgInvitationItem } from './MessengerLayoutMsgInvitationItem';
import { MessengerLayoutMsgNormalItem } from './MessengerLayoutMsgNormalItem';
import { MessengerLayoutMsgNotificationItem } from './MessengerLayoutMsgNotificationItem';

/** Named region `conversation` of MessengerLayout - configured through the parent's `conversation` prop. */
export interface MessengerLayoutConversationProps {
    itemsConversation?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerLayoutConversation = ({ itemsConversation, layout }: MessengerLayoutConversationProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 7, right: -3, top: 84, bottom: 48, ...layout }}
        >
            <Region
                name="conversation"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsConversation ?? (
                    <>
                        <MessengerLayoutMsgNormalItem />
                        <MessengerLayoutMsgNotificationItem />
                        <MessengerLayoutMsgInvitationItem />
                        <MessengerLayoutMsgInfoItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
