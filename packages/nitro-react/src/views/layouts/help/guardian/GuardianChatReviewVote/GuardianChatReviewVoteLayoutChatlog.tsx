import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { GuardianChatReviewVoteLayoutOtherUserTemplateItem } from './GuardianChatReviewVoteLayoutOtherUserTemplateItem';
import { GuardianChatReviewVoteLayoutReportedUserTemplateItem } from './GuardianChatReviewVoteLayoutReportedUserTemplateItem';
import { GuardianChatReviewVoteLayoutSeparatorTemplateItem } from './GuardianChatReviewVoteLayoutSeparatorTemplateItem';

/** Named region `chatlog` of GuardianChatReviewVoteLayout - configured through the parent's `chatlog` prop. */
export interface GuardianChatReviewVoteLayoutChatlogProps {
    itemsChatlog?: ReactNode;
    layout?: BoxLayout;
}

export const GuardianChatReviewVoteLayoutChatlog = ({ itemsChatlog, layout }: GuardianChatReviewVoteLayoutChatlogProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 12, width: 244, top: 2, bottom: 3, ...layout }}
        >
            <Region
                name="chatlog"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsChatlog ?? (
                    <>
                        <GuardianChatReviewVoteLayoutReportedUserTemplateItem />
                        <GuardianChatReviewVoteLayoutSeparatorTemplateItem />
                        <GuardianChatReviewVoteLayoutOtherUserTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
