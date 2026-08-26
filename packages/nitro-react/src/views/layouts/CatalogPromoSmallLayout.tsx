import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `97_catalog_promo_small_xml` (layout "catalog_promo_small", 250x192) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogPromoSmallLayoutProps {
    layout?: BoxLayout;
    onOpenPageButton?: () => void;
}

export const CatalogPromoSmallLayout = ({ layout, onOpenPageButton }: CatalogPromoSmallLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 192, ...layout }}>
            <Region
                params={147472}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 192, maxWidth: 250 }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 192, flexDirection: 'column' }}
                >
                    <Region
                        name="catalog_promo_caption"
                        params={16}
                        layout={{ width: 284, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.catalogpromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        params={16400}
                        backgroundColor="#000000"
                        layout={{ width: 250, height: 120, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="picture"
                            params={16}
                            src="${image.library.url}reception/catalog_teaser_set_mnstr_gothic.png"
                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 120 }}
                        />
                        <Region
                            name="catalog_promo_info"
                            params={16}
                            layout={{ position: 'absolute', left: 126, width: 124, top: 0, height: 120, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('landing.view.catalogpromo.info')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 124 }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="100"
                        name="open_page_button"
                        params={131089}
                        onPointerTap={onOpenPageButton}
                        layout={{ width: 221, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('landing.view.catalogpromo.button')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
