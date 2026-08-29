import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2990_new_feature_notification_xml` (layout "new_feature_notification", 192x92) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationLayoutProps {
    cancelLinkRegion?: NewFeatureNotificationLayoutCancelLinkRegionProps;
    captionDesc?: string;
    layout?: BoxLayout;
    onOpenButton?: () => void;
    srcStaticBitmap?: string;
}

export const NewFeatureNotificationLayout = ({ cancelLinkRegion, captionDesc, layout, onOpenButton, srcStaticBitmap }: NewFeatureNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 92, ...layout }}>
            <Border
                variant="9"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 92 }}
            >
                <ThemeImage
                    name="static_bitmap"
                    src={srcStaticBitmap}
                    layout={{ position: 'absolute', left: 6, width: 55, top: 5, height: 55 }}
                />
                <Region
                    name="desc"
                    layout={{ position: 'absolute', left: 67, width: 113, top: 7, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDesc ?? 'text here'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 113 }}
                    />
                </Region>
                <Button
                    variant="4"
                    name="open_button"
                    onPointerTap={onOpenButton}
                    layout={{ position: 'absolute', right: 8, width: 51, bottom: 10, height: 28 }}
                >
                    {t('notifications.button.view')}
                </Button>
                <NewFeatureNotificationLayoutCancelLinkRegion {...cancelLinkRegion} />
            </Border>
        </Region>
    );
};

/** Named region `cancel_link_region` of NewFeatureNotificationLayout - configured through the parent's `cancelLinkRegion` prop. */
export interface NewFeatureNotificationLayoutCancelLinkRegionProps {
    captionCancelLink?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    tags?: string[];
}

export const NewFeatureNotificationLayoutCancelLinkRegion = ({ captionCancelLink, layout, onCancelLinkRegion, tags }: NewFeatureNotificationLayoutCancelLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_link_region"
            tags={tags}
            onPointerTap={onCancelLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 8, width: 155, bottom: 15, height: 17, ...layout }}
        >
            <Region
                name="cancel_link"
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCancelLink ?? t('notifications.button.cancel')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
