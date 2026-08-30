import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plus` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetPlusItem = ({ captionPlus, layout }: TotalPriceWidgetPlusItemProps) => {
    return (
        <ThemeText
            text={captionPlus ?? ' '}
            name="plus"
            layout={{ width: 8, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
