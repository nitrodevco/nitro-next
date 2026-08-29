import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1041_respect_giving_failed_notification_xml` (layout "respect_giving_failed_notification", 334x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RespectGivingFailedNotificationLayoutProps {
    captionBodyTxt?: string;
    captionCaptionTxt?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onClose2?: () => void;
    srcRespectFailedNotificationBitmap?: string;
}

export const RespectGivingFailedNotificationLayout = ({ captionBodyTxt, captionCaptionTxt, layout, onClose, onClose2, srcRespectFailedNotificationBitmap }: RespectGivingFailedNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('respect.giving.failed.title')}
            onClose={onClose}
            layout={{ width: 369, height: 220, minWidth: 369, minHeight: 220, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="caption_txt"
                    layout={{ position: 'absolute', left: 10, width: 250, top: 12, height: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCaptionTxt ?? t('respect.giving.failed.caption')}
                        textStyle="text-style-il-heading-title"
                        textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 250 }}
                    />
                </Region>
                <Region
                    name="body_txt"
                    layout={{ position: 'absolute', left: 10, width: 250, top: 49, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBodyTxt ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    />
                </Region>
                <ThemeImage
                    name="respectFailedNotificationBitmap"
                    src={srcRespectFailedNotificationBitmap}
                    layout={{ position: 'absolute', left: 269, width: 100, top: 60, height: 100 }}
                />
                <Button
                    variant="101"
                    name="close"
                    tintColor="#bbbbbb"
                    onPointerTap={onClose2}
                    layout={{ position: 'absolute', marginLeft: 32.5, marginRight: -32.5, width: 140, top: 130, height: 50 }}
                >
                    {t('respect.giving.failed.button')}
                </Button>
            </Region>
        </Frame>
    );
};
