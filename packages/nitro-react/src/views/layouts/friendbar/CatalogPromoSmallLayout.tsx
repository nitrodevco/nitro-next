import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `97_catalog_promo_small_xml` (layout "catalog_promo_small", 250x192) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogPromoSmallLayoutProps {
    captionCatalogPromoCaption?: string;
    captionCatalogPromoInfo?: string;
    layout?: BoxLayout;
    onOpenPageButton?: () => void;
    srcPicture?: string;
}

export const CatalogPromoSmallLayout = ({ captionCatalogPromoCaption, captionCatalogPromoInfo, layout, onOpenPageButton, srcPicture }: CatalogPromoSmallLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 192, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 250 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}>
                    <Region
                        name="catalog_promo_caption"
                        layout={{ alignSelf: 'stretch', height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCatalogPromoCaption ?? t('landing.view.catalogpromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        backgroundColor="#000000"
                        layout={{ alignSelf: 'stretch', height: 120, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="picture"
                            src={srcPicture ?? '${image.library.url}reception/catalog_teaser_set_mnstr_gothic.png'}
                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 120 }}
                        />
                        <Region
                            name="catalog_promo_info"
                            layout={{ position: 'absolute', right: 0, width: 124, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCatalogPromoInfo ?? t('landing.view.catalogpromo.info')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 124 }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="100"
                        name="open_page_button"
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
