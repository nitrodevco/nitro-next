import { Border, BoxLayout, Region } from '#base/theme';

import { RecyclerPrizesWidgetLevelItemLayoutContent, RecyclerPrizesWidgetLevelItemLayoutContentProps } from './RecyclerPrizesWidgetLevelItemLayoutContent';

/** Named region `bg` of RecyclerPrizesWidgetLevelItemLayout - configured through the parent's `bg` prop. */
export interface RecyclerPrizesWidgetLevelItemLayoutBgProps {
    content?: RecyclerPrizesWidgetLevelItemLayoutContentProps;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutBg = ({ content, layout }: RecyclerPrizesWidgetLevelItemLayoutBgProps) => {
    return (
        <Region
            name="bg"
            layout={{ position: 'absolute', left: 0, width: 348, top: 0, height: 78, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <RecyclerPrizesWidgetLevelItemLayoutContent {...content} />
            </Border>
        </Region>
    );
};
