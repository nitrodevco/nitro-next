import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `catalog_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
}

export const JukeboxViewLayoutCatalogButtonItem = ({ layout, onCatalogButton }: JukeboxViewLayoutCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="catalog_button"
            onPointerTap={onCatalogButton}
            textStyle="text-style-button-regular"
            layout={{ width: 60, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buy')}
        </Button>
    );
};
