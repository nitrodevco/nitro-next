import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { GuardianChatReviewAcceptLayoutRequestDescriptionItem } from './GuardianChatReviewAcceptLayoutRequestDescriptionItem';

/** Row template `request_description_wrapper` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItemProps {
    itemsRequestDescriptionWrapper?: ReactNode;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItem = ({ itemsRequestDescriptionWrapper, layout }: GuardianChatReviewAcceptLayoutRequestDescriptionWrapperItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 205, height: 80, flexShrink: 0, ...layout }}
        >
            <Region
                name="request_description_wrapper"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsRequestDescriptionWrapper ?? (
                    <GuardianChatReviewAcceptLayoutRequestDescriptionItem />
                )}
            </Region>
        </ScrollArea>
    );
};
