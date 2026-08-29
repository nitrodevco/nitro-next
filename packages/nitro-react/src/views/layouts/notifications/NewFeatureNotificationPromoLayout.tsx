import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2969_new_feature_notification_promo_xml` (layout "new_feature_notification_promo", 192x34) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationPromoLayoutProps {
    layout?: BoxLayout;
    mainRegion?: NewFeatureNotificationPromoLayoutMainRegionProps;
}

export const NewFeatureNotificationPromoLayout = ({ layout, mainRegion }: NewFeatureNotificationPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 34, ...layout }}>
            <NewFeatureNotificationPromoLayoutMainRegion {...mainRegion} />
        </Region>
    );
};

/** Named region `cancel_link_region` of NewFeatureNotificationPromoLayout - configured through the parent's `cancelLinkRegion` prop. */
export interface NewFeatureNotificationPromoLayoutCancelLinkRegionProps {
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    srcCancelImg?: string;
    srcCancelImg2?: string;
    visibleCancelLinkRegion?: boolean;
}

export const NewFeatureNotificationPromoLayoutCancelLinkRegion = ({ layout, onCancelLinkRegion, srcCancelImg, srcCancelImg2, visibleCancelLinkRegion }: NewFeatureNotificationPromoLayoutCancelLinkRegionProps) => {
    return (
        <Region
            name="cancel_link_region"
            visible={visibleCancelLinkRegion ?? false}
            onPointerTap={onCancelLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 174, width: 10, top: 12, height: 10, ...layout }}
        >
            <ThemeImage
                name="cancel_img"
                src={srcCancelImg ?? layoutImage('common_close_x.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
            />
            <ThemeImage
                name="cancel_img"
                src={srcCancelImg2 ?? layoutImage('common_close_x.png')}
                tint="#000000"
                layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 9 }}
                visible={false}
            />
        </Region>
    );
};

/** Named region `main_region` of NewFeatureNotificationPromoLayout - configured through the parent's `mainRegion` prop. */
export interface NewFeatureNotificationPromoLayoutMainRegionProps {
    cancelLinkRegion?: NewFeatureNotificationPromoLayoutCancelLinkRegionProps;
    captionDesc?: string;
    layout?: BoxLayout;
    onMainRegion?: () => void;
    srcStaticBitmap?: string;
}

export const NewFeatureNotificationPromoLayoutMainRegion = ({ cancelLinkRegion, captionDesc, layout, onMainRegion, srcStaticBitmap }: NewFeatureNotificationPromoLayoutMainRegionProps) => {
    return (
        <Region
            name="main_region"
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onMainRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 34, ...layout }}
        >
            <Border
                variant="9"
                name="border"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="static_bitmap"
                    src={srcStaticBitmap}
                    layout={{ position: 'absolute', left: 8, width: 20, top: 7, height: 20 }}
                />
                <Region
                    name="desc"
                    layout={{ position: 'absolute', left: 30, width: 148, top: 7, maxWidth: 148, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDesc ?? 'some text here'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 148 }}
                    />
                </Region>
                <NewFeatureNotificationPromoLayoutCancelLinkRegion {...cancelLinkRegion} />
            </Border>
        </Region>
    );
};
