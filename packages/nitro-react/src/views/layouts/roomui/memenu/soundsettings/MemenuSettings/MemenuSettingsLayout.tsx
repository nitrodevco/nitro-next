import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { MemenuSettingsLayoutFurniVolumeContainer, MemenuSettingsLayoutFurniVolumeContainerProps } from './MemenuSettingsLayoutFurniVolumeContainer';
import { MemenuSettingsLayoutTraxVolumeContainer, MemenuSettingsLayoutTraxVolumeContainerProps } from './MemenuSettingsLayoutTraxVolumeContainer';
import { MemenuSettingsLayoutUiVolumeContainer, MemenuSettingsLayoutUiVolumeContainerProps } from './MemenuSettingsLayoutUiVolumeContainer';

/** Generated from `952_memenu_settings_xml` (layout "memenu_effects", 312x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuSettingsLayoutProps {
    captionSettingsTitle?: string;
    captionVolumeText?: string;
    furniVolumeContainer?: MemenuSettingsLayoutFurniVolumeContainerProps;
    layout?: BoxLayout;
    line?: ReactNode;
    onBackBtn?: () => void;
    traxVolumeContainer?: MemenuSettingsLayoutTraxVolumeContainerProps;
    uiVolumeContainer?: MemenuSettingsLayoutUiVolumeContainerProps;
}

export const MemenuSettingsLayout = ({ captionSettingsTitle, captionVolumeText, furniVolumeContainer, layout, line, onBackBtn, traxVolumeContainer, uiVolumeContainer }: MemenuSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 312, height: 170, ...layout }}>
            <Border
                variant="1"
                name="settings_brdr"
                layout={{ position: 'absolute', left: 1, width: 312, top: 1, height: 170, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionSettingsTitle ?? t('widget.memenu.settings.title')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="settings_title"
                    layout={{ position: 'absolute', width: 126, top: 5, height: 13 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', width: 292, top: 22, height: 1 }}
                >
                    {line}
                </Region>
                <Border
                    variant="3"
                    name="volume_grey_area"
                    tintColor="#666666"
                    layout={{ position: 'absolute', left: 10, width: 292, top: 29, height: 108 }}
                />
                <ThemeText
                    text={captionVolumeText ?? t('widget.memenu.settings.volume')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="volume_text"
                    layout={{ position: 'absolute', width: 148, top: 32, height: 13 }}
                />
                <MemenuSettingsLayoutUiVolumeContainer {...uiVolumeContainer} />
                <MemenuSettingsLayoutFurniVolumeContainer {...furniVolumeContainer} />
                <MemenuSettingsLayoutTraxVolumeContainer {...traxVolumeContainer} />
                <Button
                    variant="1"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 5, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
