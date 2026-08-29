import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `2898_rejected_window_xml` (layout "error_window", 242x147) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RejectedWindowLayoutProps {
    captionHeading?: string;
    captionMessage?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const RejectedWindowLayout = ({ captionHeading, captionMessage, layout, onClose, onCloseButton }: RejectedWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="rejected_window"
            name="rejected_window"
            caption={t('guide.help.request.rejected.title')}
            onClose={onClose}
            layout={{ width: 242, height: 147, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 8, top: 0, bottom: 48, flexDirection: 'column' }}>
                <Region
                    name="heading"
                    layout={{ width: 221, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHeading ?? t('guide.help.request.rejected.heading')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ wordWrap: true, wordWrapWidth: 221 }}
                    />
                </Region>
                <Region
                    name="message"
                    layout={{ width: 221, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessage ?? t('guide.help.request.rejected.message')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 221 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="close_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCloseButton}
                    layout={{ width: 221, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                >
                    {t('guide.help.request.rejected.button')}
                </Button>
            </Region>
        </Frame>
    );
};
