import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1244_video_offer_promotion_xml` (layout "video_offer_promo_bar", 192x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VideoOfferPromotionLayoutProps {
    captionPromoText?: string;
    captionPromoTextShadow?: string;
    layout?: BoxLayout;
    onTextRegion?: () => void;
    srcPromoIcon?: string;
}

export const VideoOfferPromotionLayout = ({ captionPromoText, captionPromoTextShadow, layout, onTextRegion, srcPromoIcon }: VideoOfferPromotionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 40, ...layout }}>
            <Border
                variant="6"
                name="promo_bar_border"
                params={16}
                tintColor="#6f6f6f"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 40 }}
            >
                <Region
                    name="text_region"
                    params={8388625}
                    onPointerTap={onTextRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 26, width: 145, top: 6, height: 30 }}
                >
                    <Region
                        name="promo_text_shadow"
                        params={16}
                        layout={{ position: 'absolute', left: 1, width: 136, top: 1, height: 17, minWidth: 136, maxWidth: 136, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPromoTextShadow ?? 'video offer promo text'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 136 }}
                        />
                    </Region>
                    <Region
                        name="promo_text"
                        params={8388624}
                        layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 17, minWidth: 136, maxWidth: 136, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPromoText ?? 'video offer promo text'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 136 }}
                        />
                    </Region>
                </Region>
                <ThemeImage
                    name="promo_icon"
                    params={16}
                    src={srcPromoIcon}
                    layout={{ position: 'absolute', left: 6, width: 19, top: 7, height: 20, minHeight: 20, maxHeight: 20 }}
                />
                <Icon
                    variant="9"
                    name="promo_close_icon"
                    params={262161}
                    tintColor="#666666"
                    layout={{ position: 'absolute', left: 173, width: 16, top: 7, height: 16 }}
                />
            </Border>
        </Region>
    );
};
