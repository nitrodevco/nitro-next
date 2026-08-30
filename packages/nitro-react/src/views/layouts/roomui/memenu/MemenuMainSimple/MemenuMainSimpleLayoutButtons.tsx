import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `buttons` of MemenuMainSimpleLayout - configured through the parent's `buttons` prop. */
export interface MemenuMainSimpleLayoutButtonsProps {
    captionAchievementsText?: string;
    captionGuideText?: string;
    captionMinimailText?: string;
    captionProfileText?: string;
    captionRoomsText?: string;
    captionSettingsText?: string;
    captionTalentsText?: string;
    layout?: BoxLayout;
    onAchievements?: () => void;
    onButtons?: () => void;
    onGuide?: () => void;
    onMinimail?: () => void;
    onProfile?: () => void;
    onRooms?: () => void;
    onSettings?: () => void;
    onTalents?: () => void;
    srcAchievementsIcon?: string;
    srcGuideIcon?: string;
    srcMinimailIcon?: string;
    srcProfileIcon?: string;
    srcRoomsIcon?: string;
    srcSettingsIcon?: string;
    srcTalentsIcon?: string;
    tintAchievementsIcon?: string;
    tintGuideIcon?: string;
    tintMinimailIcon?: string;
    tintProfileIcon?: string;
    tintRoomsIcon?: string;
    tintSettingsIcon?: string;
    tintTalentsIcon?: string;
    visibleGuide?: boolean;
}

export const MemenuMainSimpleLayoutButtons = ({ captionAchievementsText, captionGuideText, captionMinimailText, captionProfileText, captionRoomsText, captionSettingsText, captionTalentsText, layout, onAchievements, onButtons, onGuide, onMinimail, onProfile, onRooms, onSettings, onTalents, srcAchievementsIcon, srcGuideIcon, srcMinimailIcon, srcProfileIcon, srcRoomsIcon, srcSettingsIcon, srcTalentsIcon, tintAchievementsIcon, tintGuideIcon, tintMinimailIcon, tintProfileIcon, tintRoomsIcon, tintSettingsIcon, tintTalentsIcon, visibleGuide }: MemenuMainSimpleLayoutButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons"
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="profile"
                onPointerTap={onProfile}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="profile_icon"
                    src={srcProfileIcon}
                    tint={tintProfileIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionProfileText ?? t('widget.memenu.profile')}
                    textOptions={{ fill: '#ffffff' }}
                    name="profile_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
            <Region
                name="minimail"
                onPointerTap={onMinimail}
                cursor="pointer"
                layout={{ position: 'absolute', left: 86, width: 79, top: 0, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="minimail_icon"
                    src={srcMinimailIcon}
                    tint={tintMinimailIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionMinimailText ?? t('widget.memenu.minimail')}
                    textOptions={{ fill: '#ffffff' }}
                    name="minimail_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
            <Region
                name="rooms"
                onPointerTap={onRooms}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 79, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="rooms_icon"
                    src={srcRoomsIcon}
                    tint={tintRoomsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionRoomsText ?? t('widget.memenu.myrooms')}
                    textOptions={{ fill: '#ffffff' }}
                    name="rooms_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
            <Region
                name="settings"
                onPointerTap={onSettings}
                cursor="pointer"
                layout={{ position: 'absolute', left: 86, width: 79, top: 79, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="settings_icon"
                    src={srcSettingsIcon}
                    tint={tintSettingsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionSettingsText ?? t('widget.memenu.settings')}
                    textOptions={{ fill: '#ffffff' }}
                    name="settings_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
            <Region
                name="achievements"
                onPointerTap={onAchievements}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 158, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="achievements_icon"
                    src={srcAchievementsIcon}
                    tint={tintAchievementsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionAchievementsText ?? t('widget.memenu.achievements')}
                    textOptions={{ fill: '#ffffff' }}
                    name="achievements_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
            <Region
                name="talents"
                onPointerTap={onTalents}
                cursor="pointer"
                layout={{ position: 'absolute', left: 86, width: 79, top: 158, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="talents_icon"
                    src={srcTalentsIcon}
                    tint={tintTalentsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionTalentsText ?? t('widget.memenu.talents')}
                    textOptions={{ fill: '#ffffff' }}
                    name="talents_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
            {(visibleGuide ?? false) && (
                <Region
                    name="guide"
                    onPointerTap={onGuide}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="guide_icon"
                        src={srcGuideIcon}
                        tint={tintGuideIcon}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionGuideText ?? t('widget.memenu.guide')}
                        textOptions={{ fill: '#ffffff' }}
                        name="guide_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                    />
                </Region>
            )}
        </Region>
    );
};
