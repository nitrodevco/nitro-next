import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2970_new_feature_notification_countdown_xml` (layout "new_feature_notification_countdown", 192x76) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationCountdownLayoutProps {
    layout?: BoxLayout;
    mainRegion?: NewFeatureNotificationCountdownLayoutMainRegionProps;
}

export const NewFeatureNotificationCountdownLayout = ({ layout, mainRegion }: NewFeatureNotificationCountdownLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 76, ...layout }}>
            <NewFeatureNotificationCountdownLayoutMainRegion {...mainRegion} />
        </Region>
    );
};

/** Named region `main_region` of NewFeatureNotificationCountdownLayout - configured through the parent's `mainRegion` prop. */
export interface NewFeatureNotificationCountdownLayoutMainRegionProps {
    captionDesc?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onMainRegion?: () => void;
    srcCancelImg?: string;
    srcCancelImg2?: string;
    srcStaticBitmap?: string;
    visibleCancelImg?: boolean;
    visibleCancelLinkRegion?: boolean;
}

export const NewFeatureNotificationCountdownLayoutMainRegion = ({ captionDesc, layout, onCancelLinkRegion, onMainRegion, srcCancelImg, srcCancelImg2, srcStaticBitmap, visibleCancelImg, visibleCancelLinkRegion }: NewFeatureNotificationCountdownLayoutMainRegionProps) => {
    return (
        <Region
            name="main_region"
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onMainRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 76, ...layout }}
        >
            <Border
                variant="9"
                name="border"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 76 }}
            >
                <ThemeImage
                    name="static_bitmap"
                    src={srcStaticBitmap}
                    layout={{ position: 'absolute', left: 8, width: 20, top: 7, height: 20 }}
                />
                <Region
                    name="desc"
                    layout={{ position: 'absolute', left: 14, width: 154, top: 7, minWidth: 154, maxWidth: 154, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDesc ?? 'some text here'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    options={{ 'countdown:running': 'true', 'countdown:color_style': '1' }}
                    layout={{ position: 'absolute', left: 46, width: 99, bottom: 6, height: 37 }}
                />
                {(visibleCancelLinkRegion ?? false) && (
                    <Region
                        name="cancel_link_region"
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 174, width: 10, top: 9, height: 10 }}
                    >
                        <ThemeImage
                            name="cancel_img"
                            src={srcCancelImg ?? layoutImage('common_close_x.png')}
                            layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
                        />
                        {(visibleCancelImg ?? false) && (
                            <ThemeImage
                                name="cancel_img"
                                src={srcCancelImg2 ?? layoutImage('common_close_x.png')}
                                tint="#000000"
                                layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 9 }}
                            />
                        )}
                    </Region>
                )}
            </Border>
        </Region>
    );
};
