import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `level_title` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelTitleItemProps {
    captionLevelTitle?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelTitleItem = ({ captionLevelTitle, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelTitleItemProps) => {
    return (
        <ThemeText
            text={captionLevelTitle ?? 'Title'}
            name="level_title"
            layout={{ width: 28, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
