import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2969_new_feature_notification_promo_xml` (layout "new_feature_notification_promo", 192x34) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationPromoLayoutProps {
    captionDesc?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onMainRegion?: () => void;
    srcCancelImg?: string;
    srcCancelLinkRegionCancelImg?: string;
    srcStaticBitmap?: string;
    visibleCancelImg?: boolean;
    visibleCancelLinkRegion?: boolean;
}

export const NewFeatureNotificationPromoLayout = ({ captionDesc, layout, onCancelLinkRegion, onMainRegion, srcCancelImg, srcCancelLinkRegionCancelImg, srcStaticBitmap, visibleCancelImg, visibleCancelLinkRegion }: NewFeatureNotificationPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 34, ...layout }}>
            <Region
                name="main_region"
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onMainRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="9"
                    name="border"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
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
                    {(visibleCancelLinkRegion ?? false) && (
                        <Region
                            name="cancel_link_region"
                            onPointerTap={onCancelLinkRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', right: 8, width: 10, top: 12, height: 10 }}
                        >
                            <ThemeImage
                                name="cancel_img"
                                src={srcCancelImg ?? layoutImage('common_close_x.png')}
                                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
                            />
                            {(visibleCancelImg ?? false) && (
                                <ThemeImage
                                    name="cancel_img"
                                    src={srcCancelLinkRegionCancelImg ?? layoutImage('common_close_x.png')}
                                    tint="#000000"
                                    layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 9 }}
                                />
                            )}
                        </Region>
                    )}
                </Border>
            </Region>
        </Region>
    );
};
