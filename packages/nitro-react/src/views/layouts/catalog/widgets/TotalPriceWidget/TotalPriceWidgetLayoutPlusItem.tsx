import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plus` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutPlusItem = ({ captionPlus, layout }: TotalPriceWidgetLayoutPlusItemProps) => {
    return (
        <ThemeText
            text={captionPlus ?? ' '}
            name="plus"
            layout={{ width: 8, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        />
    );
};
