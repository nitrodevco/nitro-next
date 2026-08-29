import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem } from './RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem';
import { RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItem } from './RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItem';
import { RecyclerPrizesWidgetLevelItemLayoutLevelTitleItem } from './RecyclerPrizesWidgetLevelItemLayoutLevelTitleItem';
import { RecyclerPrizesWidgetLevelItemLayoutStarIconItem } from './RecyclerPrizesWidgetLevelItemLayoutStarIconItem';

/** Row template `header_bar` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutHeaderBarItemProps {
    itemsHeaderBar?: ReactNode;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutHeaderBarItem = ({ itemsHeaderBar, layout }: RecyclerPrizesWidgetLevelItemLayoutHeaderBarItemProps) => {
    return (
        <Region
            name="header_bar"
            layout={{ width: 106, height: 23, flexShrink: 0, minHeight: 23, maxHeight: 23, flexDirection: 'row', ...layout }}
        >
            {itemsHeaderBar ?? (
                <>
                    <RecyclerPrizesWidgetLevelItemLayoutStarIconItem />
                    <RecyclerPrizesWidgetLevelItemLayoutLevelTitleItem />
                    <RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItem />
                    <RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem />
                </>
            )}
        </Region>
    );
};
