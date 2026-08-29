import { BoxLayout, Region } from '#base/theme';

/** Row template `plus` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetPlusItem = ({ captionPlus, layout }: TotalPriceWidgetPlusItemProps) => {
    return (
        <Region
            name="plus"
            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlus ?? ' '}
        </Region>
    );
};
