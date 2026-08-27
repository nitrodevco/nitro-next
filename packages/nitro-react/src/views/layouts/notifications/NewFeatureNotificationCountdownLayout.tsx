import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2970_new_feature_notification_countdown_xml` (layout "new_feature_notification_countdown", 192x76) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationCountdownLayoutProps {
    captionDesc?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onMainRegion?: () => void;
    srcCancelImg?: string;
    srcCancelImg2?: string;
    srcStaticBitmap?: string;
    visibleCancelLinkRegion?: boolean;
}

export const NewFeatureNotificationCountdownLayout = ({ captionDesc, layout, onCancelLinkRegion, onMainRegion, srcCancelImg, srcCancelImg2, srcStaticBitmap, visibleCancelLinkRegion }: NewFeatureNotificationCountdownLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 76, ...layout }}>
            <Region
                name="main_region"
                params={1}
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onMainRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 76 }}
            >
                <Border
                    variant="9"
                    name="border"
                    tags={[ '#bg' ]}
                    params={8388624}
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 76 }}
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
                        layout={{ position: 'absolute', left: 14, width: 154, top: 7, height: 17, minWidth: 154, maxWidth: 154, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDesc ?? 'some text here'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="countdown"
                        name="countdown_widget"
                        params={148496}
                        options={{ 'countdown:running': 'true', 'countdown:color_style': '1' }}
                        layout={{ position: 'absolute', left: 46, width: 99, top: 33, height: 37 }}
                    />
                    <Region
                        name="cancel_link_region"
                        params={17}
                        visible={visibleCancelLinkRegion ?? false}
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 174, width: 10, top: 9, height: 10 }}
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
