import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { GuideAcceptLayoutRequestDescriptionItem } from './GuideAcceptLayoutRequestDescriptionItem';

/** Row template `request_description_wrapper` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestDescriptionWrapperItemProps {
    itemsRequestDescriptionWrapper?: ReactNode;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestDescriptionWrapperItem = ({ itemsRequestDescriptionWrapper, layout }: GuideAcceptLayoutRequestDescriptionWrapperItemProps) => {
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
                    <GuideAcceptLayoutRequestDescriptionItem />
                )}
            </Region>
        </ScrollArea>
    );
};
