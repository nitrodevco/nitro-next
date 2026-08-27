import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1079_memenu_settings_menu_xml` (layout "memenu_dance", 170x135) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuSettingsMenu_1079LayoutProps {
    captionIdentityText?: string;
    captionSettingsTitle?: string;
    layout?: BoxLayout;
    onBack?: () => void;
    onCharacterSettings?: () => void;
    onSoundSettings?: () => void;
}

export const MemenuSettingsMenu_1079Layout = ({ captionIdentityText, captionSettingsTitle, layout, onBack, onCharacterSettings, onSoundSettings }: MemenuSettingsMenu_1079LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 170, height: 135, ...layout }}>
            <Region
                name="dance_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 135, justifyContent: 'center' }}
            >
                <Region
                    name="settings_title"
                    params={786640}
                    layout={{ position: 'absolute', width: 144, top: 5, height: 13, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSettingsTitle ?? t('widget.memenu.settings')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="line"
                    params={16}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 5, width: 160, top: 22, height: 1 }}
                />
                <Button
                    variant="1"
                    name="character_settings"
                    params={131089}
                    onPointerTap={onCharacterSettings}
                    layout={{ position: 'absolute', left: 5, width: 160, top: 55, height: 22, minWidth: 160, maxWidth: 160 }}
                >
                    {t('widget.memenu.settings.character')}
                </Button>
                <Button
                    variant="1"
                    name="sound_settings"
                    params={131089}
                    onPointerTap={onSoundSettings}
                    layout={{ position: 'absolute', left: 5, width: 160, top: 30, height: 22, minWidth: 160, maxWidth: 160 }}
                >
                    {t('widget.memenu.settings.audio')}
                </Button>
                <Region
                    name="identity_text"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 159, top: 81, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionIdentityText ?? t('widget.memenu.settings.no_identity')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
                    />
                </Region>
                <Button
                    variant="1"
                    name="back"
                    params={131089}
                    onPointerTap={onBack}
                    layout={{ position: 'absolute', left: 5, width: 60, top: 106, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.back')}
                </Button>
            </Region>
        </Region>
    );
};
