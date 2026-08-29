import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `open_page_button` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutOpenPageButtonItemProps {
    layout?: BoxLayout;
    onOpenPageButton?: () => void;
}

export const CatalogPromoLayoutOpenPageButtonItem = ({ layout, onOpenPageButton }: CatalogPromoLayoutOpenPageButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="open_page_button"
            onPointerTap={onOpenPageButton}
            layout={{ width: 250, height: 48, flexShrink: 0, minWidth: 250, maxWidth: 250, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('landing.view.catalogpromo.opencatalog')}
        </Button>
    );
};
