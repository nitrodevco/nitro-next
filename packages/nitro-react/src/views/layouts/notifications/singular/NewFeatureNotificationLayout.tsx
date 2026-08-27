import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2990_new_feature_notification_xml` (layout "new_feature_notification", 192x92) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFeatureNotificationLayoutProps {
    captionCancelLink?: string;
    captionDesc?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onOpenButton?: () => void;
    srcStaticBitmap?: string;
}

export const NewFeatureNotificationLayout = ({ captionCancelLink, captionDesc, layout, onCancelLinkRegion, onOpenButton, srcStaticBitmap }: NewFeatureNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 92, ...layout }}>
            <Border
                variant="9"
                params={273}
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 92 }}
            >
                <ThemeImage
                    name="static_bitmap"
                    params={16}
                    src={srcStaticBitmap}
                    layout={{ position: 'absolute', left: 6, width: 55, top: 5, height: 55 }}
                />
                <Region
                    name="desc"
                    params={16}
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
                    params={410705}
                    onPointerTap={onOpenButton}
                    layout={{ position: 'absolute', left: 133, width: 51, top: 54, height: 28 }}
                >
                    {t('notifications.button.view')}
                </Button>
                <Region
                    name="cancel_link_region"
                    params={148497}
                    onPointerTap={onCancelLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 155, top: 60, height: 17 }}
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
            </Border>
        </Region>
    );
};
