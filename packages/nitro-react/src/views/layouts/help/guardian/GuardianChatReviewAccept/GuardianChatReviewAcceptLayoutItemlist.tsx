import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { GuardianChatReviewAcceptLayoutAcceptButtonItem } from './GuardianChatReviewAcceptLayoutAcceptButtonItem';
import { GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItem } from './GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItem';
import { GuardianChatReviewAcceptLayoutRequestTitleItem } from './GuardianChatReviewAcceptLayoutRequestTitleItem';
import { GuardianChatReviewAcceptLayoutRequestTypeItem } from './GuardianChatReviewAcceptLayoutRequestTypeItem';
import { GuardianChatReviewAcceptLayoutSkipLinkItem } from './GuardianChatReviewAcceptLayoutSkipLinkItem';

/** Named region `itemlist` of GuardianChatReviewAcceptLayout - configured through the parent's `itemlist` prop. */
export interface GuardianChatReviewAcceptLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutItemlist = ({ itemsItemlist, layout }: GuardianChatReviewAcceptLayoutItemlistProps) => {
    return (
        <Region
            name="itemlist"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 3, flexDirection: 'column', ...layout }}
        >
            {itemsItemlist ?? (
                <>
                    <GuardianChatReviewAcceptLayoutRequestTitleItem />
                    <GuardianChatReviewAcceptLayoutRequestTypeItem />
                    <GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItem />
                    <GuardianChatReviewAcceptLayoutAcceptButtonItem />
                    <GuardianChatReviewAcceptLayoutSkipLinkItem />
                </>
            )}
        </Region>
    );
};
