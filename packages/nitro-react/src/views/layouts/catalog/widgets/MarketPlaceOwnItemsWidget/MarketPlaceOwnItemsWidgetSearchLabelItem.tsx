import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `search_label` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSearchLabelItemProps {
    captionSearchLabel?: string;
    layout?: BoxLayout;
    visibleSearchLabel?: boolean;
}

export const MarketPlaceOwnItemsWidgetSearchLabelItem = ({ captionSearchLabel, layout, visibleSearchLabel }: MarketPlaceOwnItemsWidgetSearchLabelItemProps) => {
    const t = useTranslation();

    return (
        (visibleSearchLabel ?? false) && (
            <ThemeText
                text={captionSearchLabel ?? t('generic.search')}
                name="search_label"
                layout={{ width: 70, height: 15, flexShrink: 0, ...layout }}
            />
        )
    );
};
