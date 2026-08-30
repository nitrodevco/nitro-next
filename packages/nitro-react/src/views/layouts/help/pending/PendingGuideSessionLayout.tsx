import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2887_pending_guide_session_xml` (layout "pending_guide_session", 369x153) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PendingGuideSessionLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const PendingGuideSessionLayout = ({ layout, onClose, onCloseButton }: PendingGuideSessionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            caption={t('guide.pending.guide.title')}
            onClose={onClose}
            layout={{ width: 369, height: 153, minWidth: 369, minHeight: 153, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 8, top: 6, flexDirection: 'column', gap: 9 }}>
                <ThemeText
                    text={t('guide.pending.guide.subtitle')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: '#c30000' }}
                    layout={{ width: 194, height: 19, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('guide.pending.guide.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 295 }}
                    verticalAlign="top"
                    layout={{ width: 295, height: 24, flexShrink: 0, minWidth: 295, maxWidth: 295 }}
                />
                <Region layout={{ width: 370, height: 52, flexShrink: 0, justifyContent: 'center' }}>
                    <Button
                        variant="101"
                        name="close_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onCloseButton}
                        layout={{ position: 'absolute', width: 140, top: 0, height: 48 }}
                    >
                        {t('alert.close.button')}
                    </Button>
                    <ThemeImage
                        src={layoutImage('help_illustrations_question.png')}
                        layout={{ position: 'absolute', left: 272, width: 90, bottom: 4, height: 128 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
