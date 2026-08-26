import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1246_vip_discount_promotion_v2_xml` (layout "vip_discount_promotion_v2", 193x216) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipDiscountPromotionV2LayoutProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const VipDiscountPromotionV2Layout = ({ layout, onExtendButton }: VipDiscountPromotionV2LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 193, height: 216, ...layout }}>
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 216 }}
            >
                <Region
                    name="minimize_region"
                    params={17}
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('messenger_minimize_button.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="maximize_region"
                    params={17}
                    layout={{ position: 'absolute', left: 167, width: 20, top: 7, height: 20 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('common_maximize.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="title_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 13, width: 150, top: 10, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('citizen.vip.extend.promo.title')}
                        textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
                <ThemeImage
                    name="promo_img"
                    params={1311824}
                    src="${image.library.url}talent/citizenship_vip_extend_promo.png"
                    layout={{ position: 'absolute', left: 94, width: 92, top: 113, height: 102 }}
                />
                <Region
                    name="content_itemlist"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 188, top: 30, height: 105, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('citizen.vip.extend.promo.caption')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                        />
                    </Region>
                    <Region
                        name="info_txt"
                        params={16}
                        layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('citizen.vip.extend.promo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="extend_button"
                        params={131089}
                        onPointerTap={onExtendButton}
                        layout={{ width: 187, height: 50, flexShrink: 0, minWidth: 187, maxWidth: 187 }}
                    >
                        {t('citizen.vip.extend.promo.button')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
