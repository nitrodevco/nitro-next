import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plus` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutPlusItem = ({ captionPlus, layout }: GridItemWithPriceMultiLayoutPlusItemProps) => {
    return (
        <ThemeText
            text={captionPlus ?? ' '}
            name="plus"
            layout={{ width: 10, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
