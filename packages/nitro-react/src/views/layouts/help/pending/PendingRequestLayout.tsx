import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2890_pending_request_xml` (layout "pending_request", 369x211) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PendingRequestLayoutProps {
    captionRequestMessage?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onDiscardButton?: () => void;
    onKeepButton?: () => void;
}

export const PendingRequestLayout = ({ captionRequestMessage, layout, onClose, onDiscardButton, onKeepButton }: PendingRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            caption={t('help.emergency.pending.title')}
            onClose={onClose}
            layout={{ width: 369, height: 211, minWidth: 369, minHeight: 211, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 8, right: -2, top: 2, bottom: -7, flexDirection: 'column', gap: 3 }}>
                <ThemeText
                    text={t('help.emergency.pending.subtitle')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: '#c30000' }}
                    layout={{ width: 217, height: 19, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('help.emergency.pending.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 351 }}
                    verticalAlign="top"
                    layout={{ alignSelf: 'stretch', height: 24, flexShrink: 0, minWidth: 351, maxWidth: 351 }}
                />
                <Border
                    variant="102"
                    layout={{ alignSelf: 'stretch', height: 55, flexShrink: 0, minWidth: 351, maxWidth: 351, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('help.emergency.pending.message.title')}
                        textStyle="text-style-il-border"
                        textOptions={{ fill: '#444444' }}
                        layout={{ position: 'absolute', left: 13, width: 192, top: 11, height: 15 }}
                    />
                    <ThemeText
                        text={captionRequestMessage ?? 'message body'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 324 }}
                        name="request_message"
                        verticalAlign="top"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 324, bottom: 0, height: 27, minWidth: 324, maxWidth: 324 }}
                    />
                </Border>
                <ThemeImage
                    src={layoutImage('illumina_horizontal_separator.png')}
                    layout={{ width: 351, height: 13, flexShrink: 0 }}
                />
                <Region layout={{ alignSelf: 'stretch', height: 52, flexShrink: 0 }}>
                    <Button
                        variant="101"
                        name="keep_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onKeepButton}
                        layout={{ position: 'absolute', left: 0, width: 232, top: 0, bottom: 4 }}
                    >
                        {t('help.emergency.pending.button.keep')}
                    </Button>
                    <Button
                        variant="101"
                        name="discard_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onDiscardButton}
                        layout={{ position: 'absolute', right: -1, width: 243, top: 0, bottom: 4 }}
                    >
                        {t('help.emergency.pending.button.discard')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
