import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { VipDiscountPromotionV2LayoutCaptionTxtItem } from './VipDiscountPromotionV2LayoutCaptionTxtItem';
import { VipDiscountPromotionV2LayoutExtendButtonItem } from './VipDiscountPromotionV2LayoutExtendButtonItem';
import { VipDiscountPromotionV2LayoutInfoTxtItem } from './VipDiscountPromotionV2LayoutInfoTxtItem';

/** Generated from `1246_vip_discount_promotion_v2_xml` (layout "vip_discount_promotion_v2", 193x216) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipDiscountPromotionV2LayoutProps {
    captionTitleTxt?: string;
    itemsContentItemlist?: ReactNode;
    layout?: BoxLayout;
    onMaximizeRegion?: () => void;
    onMinimizeRegion?: () => void;
    srcPromoImg?: string;
}

export const VipDiscountPromotionV2Layout = ({ captionTitleTxt, itemsContentItemlist, layout, onMaximizeRegion, onMinimizeRegion, srcPromoImg }: VipDiscountPromotionV2LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 193, height: 216, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="minimize_region"
                    onPointerTap={onMinimizeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        src={layoutImage('messenger_minimize_button.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="maximize_region"
                    onPointerTap={onMaximizeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        src={layoutImage('common_maximize.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <ThemeText
                    text={captionTitleTxt ?? t('citizen.vip.extend.promo.title')}
                    textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 150 }}
                    name="title_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 13, width: 150, top: 10, height: 15 }}
                />
                <ThemeImage
                    name="promo_img"
                    src={srcPromoImg ?? '${image.library.url}talent/citizenship_vip_extend_promo.png'}
                    layout={{ position: 'absolute', right: 7, width: 92, bottom: 1, height: 102 }}
                />
                <Region
                    name="content_itemlist"
                    layout={{ position: 'absolute', left: 0, top: 30, flexDirection: 'column', gap: 5 }}
                >
                    {itemsContentItemlist ?? (
                        <>
                            <VipDiscountPromotionV2LayoutCaptionTxtItem />
                            <VipDiscountPromotionV2LayoutInfoTxtItem />
                            <VipDiscountPromotionV2LayoutExtendButtonItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};
