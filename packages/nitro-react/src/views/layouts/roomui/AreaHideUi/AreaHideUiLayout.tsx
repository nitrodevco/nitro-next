import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame } from '#base/theme';

import { AreaHideUiLayoutTabContent, AreaHideUiLayoutTabContentProps } from './AreaHideUiLayoutTabContent';

/** Generated from `988_area_hide_ui_xml` (layout "area_hide_ui", 292x334) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AreaHideUiLayoutProps {
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
    tabContent?: AreaHideUiLayoutTabContentProps;
}

export const AreaHideUiLayout = ({ layout, onApplyButton, onClose, onOnOffButton, tabContent }: AreaHideUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="areahide_ui"
            name="areahide_ui"
            caption={t('widget.areahide.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 292, height: 334, ...layout }}
        >
            <Border
                variant="100"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 3, width: 275, top: 16, height: 250 }}
            >
                <AreaHideUiLayoutTabContent {...tabContent} />
            </Border>
            <Button
                variant="0"
                name="apply_button"
                onPointerTap={onApplyButton}
                layout={{ position: 'absolute', left: 4, width: 165, top: 272, height: 24 }}
            >
                {t('widget.areahide.button.apply')}
            </Button>
            <Button
                variant="0"
                name="on_off_button"
                onPointerTap={onOnOffButton}
                layout={{ position: 'absolute', right: 15, width: 151, top: 272, height: 24 }}
            >
                {t('widget.areahide.button.on')}
            </Button>
        </Frame>
    );
};
