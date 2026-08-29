import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1256_me_menu_settings_menu_xml` (layout "memenu_dance", 180x140) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuSettingsMenu_1256LayoutProps {
    captionIdentityText?: string;
    captionSettingsTitle?: string;
    layout?: BoxLayout;
    onBack?: () => void;
    onCharacterSettings?: () => void;
    onSoundSettings?: () => void;
    visibleIdentityText?: boolean;
}

export const MeMenuSettingsMenu_1256Layout = ({ captionIdentityText, captionSettingsTitle, layout, onBack, onCharacterSettings, onSoundSettings, visibleIdentityText }: MeMenuSettingsMenu_1256LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 180, height: 140, ...layout }}>
            <Border
                variant="6"
                name="dance_container"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 140, justifyContent: 'center' }}
            >
                <Region
                    name="settings_title"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 141, top: 5, height: 17, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSettingsTitle ?? t('widget.memenu.settings')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="line"
                    layout={{ position: 'absolute', left: 5, width: 160, top: 22, height: 1 }}
                />
                <Button
                    variant="3"
                    name="character_settings"
                    onPointerTap={onCharacterSettings}
                    layout={{ position: 'absolute', left: 10, width: 160, top: 55, height: 22, minWidth: 160, maxWidth: 160 }}
                >
                    {t('widget.memenu.settings.character')}
                </Button>
                <Button
                    variant="3"
                    name="sound_settings"
                    onPointerTap={onSoundSettings}
                    layout={{ position: 'absolute', left: 10, width: 160, top: 30, height: 22, minWidth: 160, maxWidth: 160 }}
                >
                    {t('widget.memenu.settings.audio')}
                </Button>
                {(visibleIdentityText ?? false) && (
                    <Region
                        name="identity_text"
                        layout={{ position: 'absolute', left: 11, width: 159, top: 81, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionIdentityText ?? t('widget.memenu.settings.no_identity')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
                        />
                    </Region>
                )}
                <Button
                    variant="3"
                    name="back"
                    onPointerTap={onBack}
                    layout={{ position: 'absolute', left: 10, width: 60, top: 102, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.back')}
                </Button>
            </Border>
        </Region>
    );
};
