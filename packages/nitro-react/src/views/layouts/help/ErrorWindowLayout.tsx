import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `2924_error_window_xml` (layout "error_window", 242x147) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ErrorWindowLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const ErrorWindowLayout = ({ layout, onClose, onCloseButton }: ErrorWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="error_window"
            name="error_window"
            caption={t('guide.help.request.error.title')}
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 242, height: 147, minWidth: 242, maxWidth: 242, minHeight: 50, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 8, top: 0, bottom: 7, flexDirection: 'column' }}>
                <ThemeText
                    text={t('guide.help.request.error.heading')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ wordWrap: true, wordWrapWidth: 221 }}
                    verticalAlign="top"
                    layout={{ width: 221, height: 35, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('guide.help.request.error.message')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 221 }}
                    verticalAlign="top"
                    layout={{ width: 221, height: 16, flexShrink: 0 }}
                />
                <Button
                    variant="101"
                    name="close_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCloseButton}
                    layout={{ width: 207, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                >
                    {t('guide.help.request.error.button')}
                </Button>
            </Region>
        </Frame>
    );
};
