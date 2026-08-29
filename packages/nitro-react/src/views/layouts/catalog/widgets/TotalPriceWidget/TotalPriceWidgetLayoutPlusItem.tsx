import { BoxLayout, Region } from '#base/theme';

/** Row template `plus` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutPlusItem = ({ captionPlus, layout }: TotalPriceWidgetLayoutPlusItemProps) => {
    return (
        <Region
            name="plus"
            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlus ?? ' '}
        </Region>
    );
};
