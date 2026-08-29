import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `69_catalog_promo_xml` (layout "catalog_promo", 507x188) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogPromoLayoutProps {
    catalogPromo?: CatalogPromoLayoutCatalogPromoProps;
    layout?: BoxLayout;
}

export const CatalogPromoLayout = ({ catalogPromo, layout }: CatalogPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 507, height: 188, ...layout }}>
            <CatalogPromoLayoutCatalogPromo {...catalogPromo} />
        </Region>
    );
};

/** Row template `catalog_promo_caption` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoCaptionItemProps {
    captionCatalogPromoCaption?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoCaptionItem = ({ captionCatalogPromoCaption, colorableTextColor, layout }: CatalogPromoLayoutCatalogPromoCaptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_promo_caption"
            layout={{ width: 300, height: 24, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCatalogPromoCaption ?? t('landing.view.catalogpromo.caption')}
                textStyle="text-style-il-heading-1"
                textOptions={{ fill: colorableTextColor }}
            />
        </Region>
    );
};

/** Row template `catalog_promo_info` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoInfoItemProps {
    captionCatalogPromoInfo?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoInfoItem = ({ captionCatalogPromoInfo, colorableTextColor, layout }: CatalogPromoLayoutCatalogPromoInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_promo_info"
            layout={{ width: 300, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCatalogPromoInfo ?? t('landing.view.catalogpromo.info')}
                textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 300 }}
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
            onPointerTap={onOpenPageButton}
            layout={{ width: 250, height: 48, flexShrink: 0, minWidth: 250, maxWidth: 250, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('landing.view.catalogpromo.opencatalog')}
        </Button>
    );
};

/** Named region `info_container` of CatalogPromoLayout - configured through the parent's `infoContainer` prop. */
export interface CatalogPromoLayoutInfoContainerProps {
    itemsInfoContainer?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutInfoContainer = ({ itemsInfoContainer, layout }: CatalogPromoLayoutInfoContainerProps) => {
    return (
        <Region
            name="info_container"
            layout={{ position: 'absolute', left: 11, top: 9, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfoContainer ?? (
                <>
                    <CatalogPromoLayoutCatalogPromoCaptionItem />
                    <CatalogPromoLayoutCatalogPromoInfoItem />
                    <CatalogPromoLayoutOpenPageButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `picture_container` of CatalogPromoLayout - configured through the parent's `pictureContainer` prop. */
export interface CatalogPromoLayoutPictureContainerProps {
    captionCatalogPromoStatus?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    srcPicture?: string;
}

export const CatalogPromoLayoutPictureContainer = ({ captionCatalogPromoStatus, colorableTextColor, layout, srcPicture }: CatalogPromoLayoutPictureContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="picture_container"
            layout={{ position: 'absolute', left: 281, width: 226, top: 11, height: 177, ...layout }}
        >
            <Region
                name="catalog_promo_status"
                layout={{ position: 'absolute', left: 10, width: 200, top: 145, height: 28, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCatalogPromoStatus ?? t('landing.view.catalog.promo.picture.text')}
                    textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="picture"
                src={srcPicture ?? '${image.library.url}reception/meter_level_0.png'}
                layout={{ position: 'absolute', left: 20, width: 183, top: 0, height: 144 }}
            />
        </Region>
    );
};

/** Named region `catalog_promo` of CatalogPromoLayout - configured through the parent's `catalogPromo` prop. */
export interface CatalogPromoLayoutCatalogPromoProps {
    infoContainer?: CatalogPromoLayoutInfoContainerProps;
    layout?: BoxLayout;
    pictureContainer?: CatalogPromoLayoutPictureContainerProps;
}

export const CatalogPromoLayoutCatalogPromo = ({ infoContainer, layout, pictureContainer }: CatalogPromoLayoutCatalogPromoProps) => {
    return (
        <Region
            name="catalog_promo"
            layout={{ position: 'absolute', left: 0, width: 507, top: 0, height: 188, ...layout }}
        >
            <CatalogPromoLayoutInfoContainer {...infoContainer} />
            <CatalogPromoLayoutPictureContainer {...pictureContainer} />
        </Region>
    );
};
