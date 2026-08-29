import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame } from '#base/theme';

import { BackgroundColorUiLayoutTabContent, BackgroundColorUiLayoutTabContentProps } from './BackgroundColorUiLayoutTabContent';

/** Generated from `914_background_color_ui_xml` (layout "background_color_ui", 292x255) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BackgroundColorUiLayoutProps {
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
    tabContent?: BackgroundColorUiLayoutTabContentProps;
}

export const BackgroundColorUiLayout = ({ layout, onApplyButton, onClose, onOnOffButton, tabContent }: BackgroundColorUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="backgroundcolor_ui"
            name="backgroundcolor_ui"
            caption={t('widget.backgroundcolour.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 292, height: 255, ...layout }}
        >
            <Border
                variant="100"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 3, width: 275, top: 16, height: 171 }}
            >
                <BackgroundColorUiLayoutTabContent {...tabContent} />
            </Border>
            <Button
                variant="0"
                name="apply_button"
                onPointerTap={onApplyButton}
                layout={{ position: 'absolute', left: 4, width: 203, top: 193, height: 24 }}
            >
                {t('widget.backgroundcolor.button.apply')}
            </Button>
            <Button
                variant="0"
                name="on_off_button"
                onPointerTap={onOnOffButton}
                layout={{ position: 'absolute', right: 13, width: 189, top: 193, height: 24 }}
            >
                {t('widget.backgroundcolor.button.on')}
            </Button>
        </Frame>
    );
};
