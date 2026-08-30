import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `search_button` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSearchButtonItemProps {
    layout?: BoxLayout;
    onSearchButton?: () => void;
}

export const MarketPlaceOwnItemsWidgetSearchButtonItem = ({ layout, onSearchButton }: MarketPlaceOwnItemsWidgetSearchButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="search_button"
            onPointerTap={onSearchButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 69, height: 25, flexShrink: 0, minWidth: 69, maxWidth: 69, minHeight: 25, maxHeight: 25, ...layout }}
        >
            {t('generic.search')}
        </Button>
    );
};
