import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `69_catalog_promo_xml` (layout "catalog_promo", 507x188) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogPromoLayoutProps {
    captionCatalogPromoStatus?: string;
    itemsInfoContainer?: ReactNode;
    layout?: BoxLayout;
    srcPicture?: string;
}

export const CatalogPromoLayout = ({ captionCatalogPromoStatus, itemsInfoContainer, layout, srcPicture }: CatalogPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 507, height: 188, ...layout }}>
            <Region
                name="catalog_promo"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 507, top: 0, height: 188 }}
            >
                <Region
                    name="info_container"
                    params={147472}
                    layout={{ position: 'absolute', left: 11, top: 9, flexDirection: 'column', gap: 5 }}
                >
                    {itemsInfoContainer ?? (
                        <>
                            <CatalogPromoLayoutCatalogPromoCaptionItem />
                            <CatalogPromoLayoutCatalogPromoInfoItem />
                            <CatalogPromoLayoutOpenPageButtonItem />
                        </>
                    )}
                </Region>
                <Region
                    name="picture_container"
                    params={16400}
                    layout={{ position: 'absolute', left: 281, width: 226, top: 11, height: 177 }}
                >
                    <Region
                        name="catalog_promo_status"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 200, top: 145, height: 28, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionCatalogPromoStatus ?? t('landing.view.catalog.promo.picture.text')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="picture"
                        params={16}
                        src={srcPicture ?? '${image.library.url}reception/meter_level_0.png'}
                        layout={{ position: 'absolute', left: 20, width: 183, top: 0, height: 144 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `catalog_promo_caption` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoCaptionItemProps {
    captionCatalogPromoCaption?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoCaptionItem = ({ captionCatalogPromoCaption, layout }: CatalogPromoLayoutCatalogPromoCaptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_promo_caption"
            tags={[ 'COLORABLE' ]}
            params={16}
            layout={{ width: 300, height: 24, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCatalogPromoCaption ?? t('landing.view.catalogpromo.caption')}
                textStyle="text-style-il-heading-1"
            />
        </Region>
    );
};

/** Row template `catalog_promo_info` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoInfoItemProps {
    captionCatalogPromoInfo?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoInfoItem = ({ captionCatalogPromoInfo, layout }: CatalogPromoLayoutCatalogPromoInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_promo_info"
            tags={[ 'COLORABLE' ]}
            params={16}
            layout={{ width: 300, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCatalogPromoInfo ?? t('landing.view.catalogpromo.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};

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
            params={131089}
            onPointerTap={onOpenPageButton}
            layout={{ width: 250, height: 48, flexShrink: 0, minWidth: 250, maxWidth: 250, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('landing.view.catalogpromo.opencatalog')}
        </Button>
    );
};
