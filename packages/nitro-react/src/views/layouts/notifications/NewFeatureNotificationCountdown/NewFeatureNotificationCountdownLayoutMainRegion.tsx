import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `main_region` of NewFeatureNotificationCountdownLayout - configured through the parent's `mainRegion` prop. */
export interface NewFeatureNotificationCountdownLayoutMainRegionProps {
    captionDesc?: string;
    countdownWidget?: ReactNode;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onMainRegion?: () => void;
    srcCancelImg?: string;
    srcCancelLinkRegionCancelImg?: string;
    srcStaticBitmap?: string;
    visibleCancelImg?: boolean;
    visibleCancelLinkRegion?: boolean;
}

export const NewFeatureNotificationCountdownLayoutMainRegion = ({ captionDesc, countdownWidget, layout, onCancelLinkRegion, onMainRegion, srcCancelImg, srcCancelLinkRegionCancelImg, srcStaticBitmap, visibleCancelImg, visibleCancelLinkRegion }: NewFeatureNotificationCountdownLayoutMainRegionProps) => {
    return (
        <Region
            name="main_region"
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onMainRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
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
                <ThemeText
                    text={captionDesc ?? 'some text here'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
                    name="desc"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 14, width: 154, top: 7, minWidth: 154, maxWidth: 154 }}
                />
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    options={{ 'countdown:running': 'true', 'countdown:color_style': '1' }}
                    layout={{ position: 'absolute', left: 46, width: 99, bottom: 6, height: 37 }}
                >
                    {countdownWidget}
                </WidgetSlot>
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
                                src={srcCancelLinkRegionCancelImg ?? layoutImage('common_close_x.png')}
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
