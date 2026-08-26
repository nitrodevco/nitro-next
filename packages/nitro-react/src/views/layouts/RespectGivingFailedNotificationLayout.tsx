import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1041_respect_giving_failed_notification_xml` (layout "respect_giving_failed_notification", 334x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RespectGivingFailedNotificationLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const RespectGivingFailedNotificationLayout = ({ layout, onClose }: RespectGivingFailedNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={163841}
            caption={t('respect.giving.failed.title')}
            onClose={onClose}
            layout={{ width: 369, height: 220, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="caption_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 250, top: 12, height: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('respect.giving.failed.caption')}
                        textStyle="text-style-il-heading-title"
                        textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 250 }}
                    />
                </Region>
                <Region
                    name="body_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 250, top: 49, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                />
                <ThemeImage
                    name="respectFailedNotificationBitmap"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 269, width: 100, top: 60, height: 100 }}
                />
                <Button
                    variant="101"
                    name="close"
                    params={131281}
                    tintColor="#bbbbbb"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 141, width: 140, top: 130, height: 50 }}
                >
                    {t('respect.giving.failed.button')}
                </Button>
            </Region>
        </Frame>
    );
};
