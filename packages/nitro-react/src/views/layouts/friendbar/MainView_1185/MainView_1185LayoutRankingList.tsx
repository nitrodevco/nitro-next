import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { MainView_1185LayoutEntryTemplateItem } from './MainView_1185LayoutEntryTemplateItem';

/** Named region `ranking_list` of MainView_1185Layout - configured through the parent's `rankingList` prop. */
export interface MainView_1185LayoutRankingListProps {
    itemsRankingList?: ReactNode;
    layout?: BoxLayout;
}

export const MainView_1185LayoutRankingList = ({ itemsRankingList, layout }: MainView_1185LayoutRankingListProps) => {
    return (
        <Region
            name="ranking_list"
            layout={{ position: 'absolute', left: 7, right: 7, top: 60, bottom: 86, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsRankingList ?? (
                <MainView_1185LayoutEntryTemplateItem />
            )}
        </Region>
    );
};
