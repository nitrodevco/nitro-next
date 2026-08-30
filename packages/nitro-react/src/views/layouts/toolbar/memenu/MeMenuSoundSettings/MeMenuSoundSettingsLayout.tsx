import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { MeMenuSoundSettingsLayoutFurniVolumeContainer, MeMenuSoundSettingsLayoutFurniVolumeContainerProps } from './MeMenuSoundSettingsLayoutFurniVolumeContainer';
import { MeMenuSoundSettingsLayoutTraxVolumeContainer, MeMenuSoundSettingsLayoutTraxVolumeContainerProps } from './MeMenuSoundSettingsLayoutTraxVolumeContainer';
import { MeMenuSoundSettingsLayoutUiVolumeContainer, MeMenuSoundSettingsLayoutUiVolumeContainerProps } from './MeMenuSoundSettingsLayoutUiVolumeContainer';

/** Generated from `1220_me_menu_sound_settings_xml` (layout "memenu_effects", 312x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuSoundSettingsLayoutProps {
    captionSettingsTitle?: string;
    captionVolumeText?: string;
    furniVolumeContainer?: MeMenuSoundSettingsLayoutFurniVolumeContainerProps;
    layout?: BoxLayout;
    line?: ReactNode;
    onBackBtn?: () => void;
    traxVolumeContainer?: MeMenuSoundSettingsLayoutTraxVolumeContainerProps;
    uiVolumeContainer?: MeMenuSoundSettingsLayoutUiVolumeContainerProps;
    visibleVolumeGreyArea?: boolean;
}

export const MeMenuSoundSettingsLayout = ({ captionSettingsTitle, captionVolumeText, furniVolumeContainer, layout, line, onBackBtn, traxVolumeContainer, uiVolumeContainer, visibleVolumeGreyArea }: MeMenuSoundSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 312, height: 170, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 312, top: 1, height: 170, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionSettingsTitle ?? t('widget.memenu.settings.title')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="settings_title"
                    layout={{ position: 'absolute', width: 126, top: 5, height: 17 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', width: 292, top: 24, height: 1 }}
                >
                    {line}
                </Region>
                {(visibleVolumeGreyArea ?? false) && (
                    <Border
                        variant="3"
                        name="volume_grey_area"
                        tintColor="#666666"
                        layout={{ position: 'absolute', left: 10, width: 292, top: 29, height: 108 }}
                    />
                )}
                <ThemeText
                    text={captionVolumeText ?? t('widget.memenu.settings.volume')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="volume_text"
                    layout={{ position: 'absolute', width: 148, top: 32, height: 17 }}
                />
                <MeMenuSoundSettingsLayoutUiVolumeContainer {...uiVolumeContainer} />
                <MeMenuSoundSettingsLayoutFurniVolumeContainer {...furniVolumeContainer} />
                <MeMenuSoundSettingsLayoutTraxVolumeContainer {...traxVolumeContainer} />
                <Button
                    variant="3"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 10, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
