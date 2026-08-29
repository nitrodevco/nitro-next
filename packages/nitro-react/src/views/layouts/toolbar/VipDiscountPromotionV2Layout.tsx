import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1246_vip_discount_promotion_v2_xml` (layout "vip_discount_promotion_v2", 193x216) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipDiscountPromotionV2LayoutProps {
    captionTitleTxt?: string;
    contentItemlist?: VipDiscountPromotionV2LayoutContentItemlistProps;
    layout?: BoxLayout;
    maximizeRegion?: VipDiscountPromotionV2LayoutMaximizeRegionProps;
    minimizeRegion?: VipDiscountPromotionV2LayoutMinimizeRegionProps;
    srcPromoImg?: string;
}

export const VipDiscountPromotionV2Layout = ({ captionTitleTxt, contentItemlist, layout, maximizeRegion, minimizeRegion, srcPromoImg }: VipDiscountPromotionV2LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 193, height: 216, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 216 }}
            >
                <VipDiscountPromotionV2LayoutMinimizeRegion {...minimizeRegion} />
                <VipDiscountPromotionV2LayoutMaximizeRegion {...maximizeRegion} />
                <Region
                    name="title_txt"
                    layout={{ position: 'absolute', left: 13, width: 150, top: 10, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleTxt ?? t('citizen.vip.extend.promo.title')}
                        textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
                <ThemeImage
                    name="promo_img"
                    src={srcPromoImg ?? '${image.library.url}talent/citizenship_vip_extend_promo.png'}
                    layout={{ position: 'absolute', right: 7, width: 92, bottom: 1, height: 102 }}
                />
                <VipDiscountPromotionV2LayoutContentItemlist {...contentItemlist} />
            </Border>
        </Region>
    );
};

/** Named region `minimize_region` of VipDiscountPromotionV2Layout - configured through the parent's `minimizeRegion` prop. */
export interface VipDiscountPromotionV2LayoutMinimizeRegionProps {
    layout?: BoxLayout;
    onMinimizeRegion?: () => void;
}

export const VipDiscountPromotionV2LayoutMinimizeRegion = ({ layout, onMinimizeRegion }: VipDiscountPromotionV2LayoutMinimizeRegionProps) => {
    return (
        <Region
            name="minimize_region"
            onPointerTap={onMinimizeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_minimize_button.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `maximize_region` of VipDiscountPromotionV2Layout - configured through the parent's `maximizeRegion` prop. */
export interface VipDiscountPromotionV2LayoutMaximizeRegionProps {
    layout?: BoxLayout;
    onMaximizeRegion?: () => void;
}

export const VipDiscountPromotionV2LayoutMaximizeRegion = ({ layout, onMaximizeRegion }: VipDiscountPromotionV2LayoutMaximizeRegionProps) => {
    return (
        <Region
            name="maximize_region"
            onPointerTap={onMaximizeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('common_maximize.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Row template `caption_txt` of VipDiscountPromotionV2Layout - pass real rows through its `items…` slot. */
export interface VipDiscountPromotionV2LayoutCaptionTxtItemProps {
    captionCaptionTxt?: string;
    layout?: BoxLayout;
}

export const VipDiscountPromotionV2LayoutCaptionTxtItem = ({ captionCaptionTxt, layout }: VipDiscountPromotionV2LayoutCaptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="caption_txt"
            layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCaptionTxt ?? t('citizen.vip.extend.promo.caption')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `info_txt` of VipDiscountPromotionV2Layout - pass real rows through its `items…` slot. */
export interface VipDiscountPromotionV2LayoutInfoTxtItemProps {
    captionInfoTxt?: string;
    layout?: BoxLayout;
}

export const VipDiscountPromotionV2LayoutInfoTxtItem = ({ captionInfoTxt, layout }: VipDiscountPromotionV2LayoutInfoTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_txt"
            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfoTxt ?? t('citizen.vip.extend.promo.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `extend_button` of VipDiscountPromotionV2Layout - pass real rows through its `items…` slot. */
export interface VipDiscountPromotionV2LayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const VipDiscountPromotionV2LayoutExtendButtonItem = ({ layout, onExtendButton }: VipDiscountPromotionV2LayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="extend_button"
            onPointerTap={onExtendButton}
            layout={{ width: 187, height: 50, flexShrink: 0, minWidth: 187, maxWidth: 187, ...layout }}
        >
            {t('citizen.vip.extend.promo.button')}
        </Button>
    );
};

/** Named region `content_itemlist` of VipDiscountPromotionV2Layout - configured through the parent's `contentItemlist` prop. */
export interface VipDiscountPromotionV2LayoutContentItemlistProps {
    itemsContentItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const VipDiscountPromotionV2LayoutContentItemlist = ({ itemsContentItemlist, layout }: VipDiscountPromotionV2LayoutContentItemlistProps) => {
    return (
        <Region
            name="content_itemlist"
            layout={{ position: 'absolute', left: 0, top: 30, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsContentItemlist ?? (
                <>
                    <VipDiscountPromotionV2LayoutCaptionTxtItem />
                    <VipDiscountPromotionV2LayoutInfoTxtItem />
                    <VipDiscountPromotionV2LayoutExtendButtonItem />
                </>
            )}
        </Region>
    );
};
