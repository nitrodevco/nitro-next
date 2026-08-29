import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { FeedDisplayLayoutDescriptionItem } from './FeedDisplayLayoutDescriptionItem';
import { FeedDisplayLayoutInfoOkItem } from './FeedDisplayLayoutInfoOkItem';
import { FeedDisplayLayoutIngressItem } from './FeedDisplayLayoutIngressItem';
import { FeedDisplayLayoutSpaceDescriptionItem } from './FeedDisplayLayoutSpaceDescriptionItem';
import { FeedDisplayLayoutSpaceIngressItem } from './FeedDisplayLayoutSpaceIngressItem';
import { FeedDisplayLayoutSpaceOkItem } from './FeedDisplayLayoutSpaceOkItem';
import { FeedDisplayLayoutTitleItem } from './FeedDisplayLayoutTitleItem';

/** Named region `welcome_list` of FeedDisplayLayout - configured through the parent's `welcomeList` prop. */
export interface FeedDisplayLayoutWelcomeListProps {
    itemsWelcomeList?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutWelcomeList = ({ itemsWelcomeList, layout }: FeedDisplayLayoutWelcomeListProps) => {
    return (
        <Region
            name="welcome_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: 12, flexDirection: 'column', ...layout }}
        >
            {itemsWelcomeList ?? (
                <>
                    <FeedDisplayLayoutTitleItem />
                    <FeedDisplayLayoutSpaceIngressItem />
                    <FeedDisplayLayoutIngressItem />
                    <FeedDisplayLayoutSpaceDescriptionItem />
                    <FeedDisplayLayoutDescriptionItem />
                    <FeedDisplayLayoutSpaceOkItem />
                    <FeedDisplayLayoutInfoOkItem />
                </>
            )}
        </Region>
    );
};
