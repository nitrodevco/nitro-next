import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1079_memenu_settings_menu_xml` (layout "memenu_dance", 170x135) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuSettingsMenu_1079LayoutProps {
    captionIdentityText?: string;
    captionSettingsTitle?: string;
    layout?: BoxLayout;
    line?: ReactNode;
    onBack?: () => void;
    onCharacterSettings?: () => void;
    onSoundSettings?: () => void;
}

export const MemenuSettingsMenu_1079Layout = ({ captionIdentityText, captionSettingsTitle, layout, line, onBack, onCharacterSettings, onSoundSettings }: MemenuSettingsMenu_1079LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 170, height: 135, ...layout }}>
            <Region
                name="dance_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionSettingsTitle ?? t('widget.memenu.settings')}
                    textOptions={{ fill: '#ffffff' }}
                    name="settings_title"
                    layout={{ position: 'absolute', width: 144, top: 5, height: 13, maxWidth: 150 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 5, width: 160, top: 22, height: 1 }}
                >
                    {line}
                </Region>
                <Button
                    variant="1"
                    name="character_settings"
                    onPointerTap={onCharacterSettings}
                    layout={{ position: 'absolute', left: 5, width: 160, top: 55, height: 22, minWidth: 160, maxWidth: 160 }}
                >
                    {t('widget.memenu.settings.character')}
                </Button>
                <Button
                    variant="1"
                    name="sound_settings"
                    onPointerTap={onSoundSettings}
                    layout={{ position: 'absolute', left: 5, width: 160, top: 30, height: 22, minWidth: 160, maxWidth: 160 }}
                >
                    {t('widget.memenu.settings.audio')}
                </Button>
                <ThemeText
                    text={captionIdentityText ?? t('widget.memenu.settings.no_identity')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
                    name="identity_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 6, width: 159, top: 81, height: 20 }}
                />
                <Button
                    variant="1"
                    name="back"
                    onPointerTap={onBack}
                    layout={{ position: 'absolute', left: 5, width: 60, top: 106, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.back')}
                </Button>
            </Region>
        </Region>
    );
};
