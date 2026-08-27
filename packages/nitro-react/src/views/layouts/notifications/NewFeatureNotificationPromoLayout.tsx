import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2969_new_feature_notification_promo_xml` (layout "new_feature_notification_promo", 192x34) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationPromoLayoutProps {
    captionDesc?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onMainRegion?: () => void;
    srcCancelImg?: string;
    srcCancelImg2?: string;
    srcStaticBitmap?: string;
    visibleCancelLinkRegion?: boolean;
}

export const NewFeatureNotificationPromoLayout = ({ captionDesc, layout, onCancelLinkRegion, onMainRegion, srcCancelImg, srcCancelImg2, srcStaticBitmap, visibleCancelLinkRegion }: NewFeatureNotificationPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 34, ...layout }}>
            <Region
                name="main_region"
                params={1}
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onMainRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 34 }}
            >
                <Border
                    variant="9"
                    name="border"
                    tags={[ '#bg' ]}
                    params={8388624}
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 34 }}
                >
                    <ThemeImage
                        name="static_bitmap"
                        tags={[ '#icon' ]}
                        params={16}
                        src={srcStaticBitmap}
                        layout={{ position: 'absolute', left: 8, width: 20, top: 7, height: 20 }}
                    />
                    <Region
                        name="desc"
                        tags={[ '#icon' ]}
                        params={8388624}
                        layout={{ position: 'absolute', left: 30, width: 148, top: 7, height: 17, maxWidth: 148, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDesc ?? 'some text here'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 148 }}
                        />
                    </Region>
                    <Region
                        name="cancel_link_region"
                        params={17}
                        visible={visibleCancelLinkRegion ?? false}
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 174, width: 10, top: 12, height: 10 }}
                    >
                        <ThemeImage
                            name="cancel_img"
                            params={16}
                            src={srcCancelImg ?? layoutImage('common_close_x.png')}
                            layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
                        />
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 9 }}
                        >
                            <ThemeImage
                                name="cancel_img"
                                params={16}
                                src={srcCancelImg2 ?? layoutImage('common_close_x.png')}
                                tint="#000000"
                                layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 9 }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
