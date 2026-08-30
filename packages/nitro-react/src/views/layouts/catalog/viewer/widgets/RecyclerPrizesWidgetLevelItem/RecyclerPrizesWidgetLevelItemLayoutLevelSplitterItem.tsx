import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `level_splitter` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItemProps {
    captionLevelSplitter?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItem = ({ captionLevelSplitter, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItemProps) => {
    return (
        <ThemeText
            text={captionLevelSplitter ?? ' -'}
            name="level_splitter"
            layout={{ width: 10, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
