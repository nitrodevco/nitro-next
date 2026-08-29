import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { GuideAcceptLayoutAcceptButtonItem } from './GuideAcceptLayoutAcceptButtonItem';
import { GuideAcceptLayoutRequestDescriptionWrapperItem } from './GuideAcceptLayoutRequestDescriptionWrapperItem';
import { GuideAcceptLayoutRequestTitleItem } from './GuideAcceptLayoutRequestTitleItem';
import { GuideAcceptLayoutRequestTypeItem } from './GuideAcceptLayoutRequestTypeItem';
import { GuideAcceptLayoutSkipLinkItem } from './GuideAcceptLayoutSkipLinkItem';

/** Named region `itemlist` of GuideAcceptLayout - configured through the parent's `itemlist` prop. */
export interface GuideAcceptLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutItemlist = ({ itemsItemlist, layout }: GuideAcceptLayoutItemlistProps) => {
    return (
        <Region
            name="itemlist"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 221, flexDirection: 'column', ...layout }}
        >
            {itemsItemlist ?? (
                <>
                    <GuideAcceptLayoutRequestTitleItem />
                    <GuideAcceptLayoutRequestTypeItem />
                    <GuideAcceptLayoutRequestDescriptionWrapperItem />
                    <GuideAcceptLayoutAcceptButtonItem />
                    <GuideAcceptLayoutSkipLinkItem />
                </>
            )}
        </Region>
    );
};
