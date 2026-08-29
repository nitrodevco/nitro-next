import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1244_video_offer_promotion_xml` (layout "video_offer_promo_bar", 192x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VideoOfferPromotionLayoutProps {
    captionPromoText?: string;
    captionPromoTextShadow?: string;
    layout?: BoxLayout;
    onTextRegion?: () => void;
    srcPromoIcon?: string;
    tintPromoIcon?: string;
}

export const VideoOfferPromotionLayout = ({ captionPromoText, captionPromoTextShadow, layout, onTextRegion, srcPromoIcon, tintPromoIcon }: VideoOfferPromotionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 40, ...layout }}>
            <Border
                variant="6"
                name="promo_bar_border"
                tintColor="#6f6f6f"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <Region
                    name="text_region"
                    onPointerTap={onTextRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: 2.5, marginRight: -2.5, width: 145, top: 6, bottom: 4 }}
                >
                    <Region
                        name="promo_text_shadow"
                        layout={{ position: 'absolute', left: 1, right: 8, top: 1, bottom: 12, minWidth: 136, maxWidth: 136, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPromoTextShadow ?? 'video offer promo text'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 136 }}
                        />
                    </Region>
                    <Region
                        name="promo_text"
                        layout={{ position: 'absolute', left: 0, right: 9, top: 0, minWidth: 136, maxWidth: 136, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPromoText ?? 'video offer promo text'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 136 }}
                        />
                    </Region>
                </Region>
                <ThemeImage
                    name="promo_icon"
                    src={srcPromoIcon}
                    tint={tintPromoIcon}
                    layout={{ position: 'absolute', left: 6, width: 19, top: 7, height: 20, minHeight: 20, maxHeight: 20 }}
                />
                <Icon
                    variant="9"
                    name="promo_close_icon"
                    tintColor="#666666"
                    layout={{ position: 'absolute', right: 3, width: 16, top: 7, height: 16 }}
                />
            </Border>
        </Region>
    );
};
