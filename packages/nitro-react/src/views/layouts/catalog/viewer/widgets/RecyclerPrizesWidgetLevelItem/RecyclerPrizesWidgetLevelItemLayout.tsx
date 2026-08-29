import { BoxLayout, Region } from '#base/theme';

import { RecyclerPrizesWidgetLevelItemLayoutBg, RecyclerPrizesWidgetLevelItemLayoutBgProps } from './RecyclerPrizesWidgetLevelItemLayoutBg';

/** Generated from `1566_recyclerPrizesWidgetLevelItem_xml` (layout "recyclerPrizesWidgetLevelItem", 348x78) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RecyclerPrizesWidgetLevelItemLayoutProps {
    bg?: RecyclerPrizesWidgetLevelItemLayoutBgProps;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayout = ({ bg, layout }: RecyclerPrizesWidgetLevelItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 348, height: 78, ...layout }}>
            <RecyclerPrizesWidgetLevelItemLayoutBg {...bg} />
        </Region>
    );
};
