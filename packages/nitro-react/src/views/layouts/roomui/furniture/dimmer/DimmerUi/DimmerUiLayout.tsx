import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { DimmerUiLayoutTabbedview, DimmerUiLayoutTabbedviewProps } from './DimmerUiLayoutTabbedview';

/** Generated from `848_dimmer_ui_xml` (layout "dimmer_ui", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DimmerUiLayoutProps {
    captionOffText?: string;
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
    srcOffImage?: string;
    tabbedview?: DimmerUiLayoutTabbedviewProps;
    tintOffImage?: string;
}

export const DimmerUiLayout = ({ captionOffText, layout, onApplyButton, onClose, onOnOffButton, srcOffImage, tabbedview, tintOffImage }: DimmerUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="dimmer_ui"
            name="dimmer_ui"
            caption={t('widget.dimmer.title')}
            onClose={onClose}
            layout={{ width: 277, height: 225, ...layout }}
        >
            <Border
                variant="0"
                name="off_border"
                layout={{ position: 'absolute', left: 6, width: 254, top: 27, height: 133 }}
            >
                <Region
                    name="off_text"
                    layout={{ position: 'absolute', left: 19, width: 219, top: 93, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionOffText ?? t('widget.dimmer.info.off')}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 219 }}
                    />
                </Region>
                <ThemeImage
                    name="off_image"
                    src={srcOffImage}
                    tint={tintOffImage}
                    layout={{ position: 'absolute', left: 96, width: 56, top: 11, height: 79 }}
                />
            </Border>
            <DimmerUiLayoutTabbedview {...tabbedview} />
            <Button
                variant="0"
                name="apply_button"
                onPointerTap={onApplyButton}
                layout={{ position: 'absolute', left: 4, width: 89, top: 166, height: 24 }}
            >
                {t('widget.dimmer.button.apply')}
            </Button>
            <Button
                variant="0"
                name="on_off_button"
                onPointerTap={onOnOffButton}
                layout={{ position: 'absolute', right: 16, width: 58, top: 167, height: 22 }}
            >
                {t('widget.dimmer.button.on')}
            </Button>
        </Frame>
    );
};
