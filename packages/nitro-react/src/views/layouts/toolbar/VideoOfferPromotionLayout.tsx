import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1244_video_offer_promotion_xml` (layout "video_offer_promo_bar", 192x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VideoOfferPromotionLayoutProps {
    layout?: BoxLayout;
    srcPromoIcon?: string;
    textRegion?: VideoOfferPromotionLayoutTextRegionProps;
}

export const VideoOfferPromotionLayout = ({ layout, srcPromoIcon, textRegion }: VideoOfferPromotionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 40, ...layout }}>
            <Border
                variant="6"
                name="promo_bar_border"
                tintColor="#6f6f6f"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 40 }}
            >
                <VideoOfferPromotionLayoutTextRegion {...textRegion} />
                <ThemeImage
                    name="promo_icon"
                    src={srcPromoIcon}
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

/** Named region `text_region` of VideoOfferPromotionLayout - configured through the parent's `textRegion` prop. */
export interface VideoOfferPromotionLayoutTextRegionProps {
    captionPromoText?: string;
    captionPromoTextShadow?: string;
    layout?: BoxLayout;
    onTextRegion?: () => void;
    tags?: string[];
}

export const VideoOfferPromotionLayoutTextRegion = ({ captionPromoText, captionPromoTextShadow, layout, onTextRegion, tags }: VideoOfferPromotionLayoutTextRegionProps) => {
    return (
        <Region
            name="text_region"
            tags={tags}
            onPointerTap={onTextRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 26, width: 145, top: 6, height: 30, ...layout }}
        >
            <Region
                name="promo_text_shadow"
                layout={{ position: 'absolute', left: 1, width: 136, top: 1, height: 17, minWidth: 136, maxWidth: 136, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPromoTextShadow ?? 'video offer promo text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 136 }}
                />
            </Region>
            <Region
                name="promo_text"
                layout={{ position: 'absolute', left: 0, width: 136, top: 0, minWidth: 136, maxWidth: 136, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPromoText ?? 'video offer promo text'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 136 }}
                />
            </Region>
        </Region>
    );
};
