import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `level_chances` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelChancesItemProps {
    captionLevelChances?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem = ({ captionLevelChances, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelChancesItemProps) => {
    return (
        <ThemeText
            text={captionLevelChances ?? 'Chances'}
            name="level_chances"
            layout={{ width: 50, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
