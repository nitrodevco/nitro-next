import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1079_memenu_settings_menu_xml` (layout "memenu_dance", 170x135) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuSettingsMenu_1079LayoutProps {
    danceContainer?: MemenuSettingsMenu_1079LayoutDanceContainerProps;
    layout?: BoxLayout;
}

export const MemenuSettingsMenu_1079Layout = ({ danceContainer, layout }: MemenuSettingsMenu_1079LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 170, height: 135, ...layout }}>
            <MemenuSettingsMenu_1079LayoutDanceContainer {...danceContainer} />
        </Region>
    );
};

/** Named region `line` of MemenuSettingsMenu_1079Layout - configured through the parent's `line` prop. */
export interface MemenuSettingsMenu_1079LayoutLineProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const MemenuSettingsMenu_1079LayoutLine = ({ layout, tags }: MemenuSettingsMenu_1079LayoutLineProps) => {
    return (
        <Region
            name="line"
            tags={tags}
            backgroundColor="#2f2f2f"
            layout={{ position: 'absolute', left: 5, width: 160, top: 22, height: 1, ...layout }}
        />
    );
};

/** Named region `dance_container` of MemenuSettingsMenu_1079Layout - configured through the parent's `danceContainer` prop. */
export interface MemenuSettingsMenu_1079LayoutDanceContainerProps {
    captionIdentityText?: string;
    captionSettingsTitle?: string;
    layout?: BoxLayout;
    line?: MemenuSettingsMenu_1079LayoutLineProps;
    onBack?: () => void;
    onCharacterSettings?: () => void;
    onSoundSettings?: () => void;
    tags?: string[];
}

export const MemenuSettingsMenu_1079LayoutDanceContainer = ({ captionIdentityText, captionSettingsTitle, layout, line, onBack, onCharacterSettings, onSoundSettings, tags }: MemenuSettingsMenu_1079LayoutDanceContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 135, justifyContent: 'center', ...layout }}
        >
            <Region
                name="settings_title"
                layout={{ position: 'absolute', width: 144, top: 5, height: 13, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSettingsTitle ?? t('widget.memenu.settings')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <MemenuSettingsMenu_1079LayoutLine {...line} />
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
            <Region
                name="identity_text"
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
                onPointerTap={onBack}
                layout={{ position: 'absolute', left: 5, width: 60, top: 106, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.back')}
            </Button>
        </Region>
    );
};
