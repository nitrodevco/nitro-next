import { BoxLayout, Region } from '#base/theme';

/** Row template `plus` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutPlusItem = ({ captionPlus, layout }: GridItemWithPriceMultiLayoutPlusItemProps) => {
    return (
        <Region
            name="plus"
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlus ?? ' '}
        </Region>
    );
};
