import { BoxLayout, Region } from '#base/theme';

/** Row template `level_chances` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelChancesItemProps {
    captionLevelChances?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem = ({ captionLevelChances, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelChancesItemProps) => {
    return (
        <Region
            name="level_chances"
            layout={{ width: 50, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionLevelChances ?? 'Chances'}
        </Region>
    );
};
