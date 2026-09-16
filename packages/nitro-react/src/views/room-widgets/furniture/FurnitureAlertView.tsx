import { useTranslation } from '#base/context';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureAlertViewProps {
    captionKey: string;
    /** The bold line; the plain paragraph follows it. */
    subtitleKey?: string;
    messageKey: string;
    onClose: () => void;
}

/**
 * The room's version of the alert Flash raised through `windowManager.simpleAlert` - a furni
 * that has nothing to offer but news, such as a resolution trophy whose achievement was never
 * finished.
 */
export const FurnitureAlertView = ({ captionKey, subtitleKey, messageKey, onClose }: FurnitureAlertViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-alert"
            caption={t(captionKey)}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 100 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 300, height: 180 }}
        >
            <Border layout={{ flex: 1, flexDirection: 'column', gap: 6, padding: 8 }}>
                {subtitleKey && (
                    <ThemeText
                        text={t(subtitleKey)}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 270 }}
                        verticalAlign="top"
                    />
                )}
                <ThemeText
                    text={t(messageKey)}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 270 }}
                    verticalAlign="top"
                    layout={{ flex: 1 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3 }}>
                <Button
                    onPointerTap={onClose}
                    layout={{ width: 100, height: 22 }}
                >
                    {t('generic.ok')}
                </Button>
            </Box>
        </Frame>
    );
};
