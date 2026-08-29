import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `search_label` of MarketPlaceOwnItemsWidget2 - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidget2SearchLabelItemProps {
    captionSearchLabel?: string;
    layout?: BoxLayout;
    visibleSearchLabel?: boolean;
}

export const MarketPlaceOwnItemsWidget2SearchLabelItem = ({ captionSearchLabel, layout, visibleSearchLabel }: MarketPlaceOwnItemsWidget2SearchLabelItemProps) => {
    const t = useTranslation();

    return (
        (visibleSearchLabel ?? false) && (
            <Region
                name="search_label"
                layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            >
                {captionSearchLabel ?? t('generic.search')}
            </Region>
        )
    );
};
