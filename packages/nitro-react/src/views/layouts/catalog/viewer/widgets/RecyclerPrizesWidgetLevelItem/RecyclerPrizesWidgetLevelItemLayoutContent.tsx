import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RecyclerPrizesWidgetLevelItemLayoutHeaderBarItem } from './RecyclerPrizesWidgetLevelItemLayoutHeaderBarItem';

/** Named region `content` of RecyclerPrizesWidgetLevelItemLayout - configured through the parent's `content` prop. */
export interface RecyclerPrizesWidgetLevelItemLayoutContentProps {
    itemsContent?: ReactNode;
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutContent = ({ itemsContent, itemsItemGrid, layout }: RecyclerPrizesWidgetLevelItemLayoutContentProps) => {
    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 68, flexDirection: 'column', ...layout }}
        >
            {itemsContent ?? (
                <RecyclerPrizesWidgetLevelItemLayoutHeaderBarItem />
            )}
            <Region
                backgroundColor="#000000"
                layout={{ width: 338, height: 1, flexShrink: 0 }}
            />
            <Region
                backgroundColor="#eaeaea"
                layout={{ width: 338, height: 44, flexShrink: 0 }}
            >
                <Region
                    name="itemGrid"
                    backgroundColor="#eaeaea"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 36, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                >
                    {itemsItemGrid}
                </Region>
            </Region>
        </Region>
    );
};
