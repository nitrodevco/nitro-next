import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1223_club_discount_promotion_xml` (layout "club_promo_bar", 192x44) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubDiscountPromotionLayoutProps {
    captionPromoText?: string;
    captionPromoTextShadow?: string;
    layout?: BoxLayout;
    onTextRegion?: () => void;
    srcFlashingAnimation?: string;
    tintFlashingAnimation?: string;
}

export const ClubDiscountPromotionLayout = ({ captionPromoText, captionPromoTextShadow, layout, onTextRegion, srcFlashingAnimation, tintFlashingAnimation }: ClubDiscountPromotionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 44, ...layout }}>
            <Border
                variant="9"
                name="club_promo_bar_border"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="flashing_animation"
                    src={srcFlashingAnimation}
                    tint={tintFlashingAnimation}
                    layout={{ position: 'absolute', left: 3, width: 46, top: 3, height: 37 }}
                />
                <Region
                    name="text_region"
                    onPointerTap={onTextRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 5, width: 161, top: 6, bottom: 8 }}
                >
                    <ThemeText
                        text={captionPromoTextShadow ?? 'club extend discount promo text'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        name="promo_text_shadow"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 1, right: 0, top: 1, bottom: -1, minWidth: 160, maxWidth: 160 }}
                    />
                    <ThemeText
                        text={captionPromoText ?? 'club extend discount promo text'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 160 }}
                        name="promo_text"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, right: 1, top: 0, minWidth: 160, maxWidth: 160 }}
                    />
                </Region>
                <Icon
                    variant="14"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 6, width: 16, top: 7, height: 16 }}
                />
            </Border>
        </Region>
    );
};
