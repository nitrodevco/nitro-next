import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `catalog_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
    srcIcon?: string;
    visibleIcon?: boolean;
}

export const FurniViewLayoutCatalogButtonItem = ({ layout, onCatalogButton, srcIcon, visibleIcon }: FurniViewLayoutCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="0"
            name="catalog_button"
            onPointerTap={onCatalogButton}
            layout={{ width: 72, height: 23, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 2, width: 64, top: 0, height: 22, flexDirection: 'row' }}>
                {(visibleIcon ?? true) && (
                    <ThemeImage
                        name="icon"
                        src={srcIcon ?? layoutImage('infostand_furni_shop.png')}
                        layout={{ width: 20, height: 18, flexShrink: 0 }}
                    />
                )}
                <ThemeText
                    text={t('infostand.button.buy')}
                    textStyle="text-style-regular"
                    layout={{ width: 44, height: 13, flexShrink: 0 }}
                />
            </Region>
        </ContainerButton>
    );
};
