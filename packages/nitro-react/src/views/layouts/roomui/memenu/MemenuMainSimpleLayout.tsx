import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1042_memenu_main_simple_xml` (layout "memenu_main", 165x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuMainSimpleLayoutProps {
    buttons?: MemenuMainSimpleLayoutButtonsProps;
    layout?: BoxLayout;
}

export const MemenuMainSimpleLayout = ({ buttons, layout }: MemenuMainSimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 165, height: 245, ...layout }}>
            <MemenuMainSimpleLayoutButtons {...buttons} />
        </Region>
    );
};

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
    visibleGuide?: boolean;
}

export const MemenuMainSimpleLayoutButtons = ({ captionAchievementsText, captionGuideText, captionMinimailText, captionProfileText, captionRoomsText, captionSettingsText, captionTalentsText, layout, onAchievements, onButtons, onGuide, onMinimail, onProfile, onRooms, onSettings, onTalents, srcAchievementsIcon, srcGuideIcon, srcMinimailIcon, srcProfileIcon, srcRoomsIcon, srcSettingsIcon, srcTalentsIcon, visibleGuide }: MemenuMainSimpleLayoutButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons"
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 245, ...layout }}
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
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="profile_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionProfileText ?? t('widget.memenu.profile')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="minimail_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMinimailText ?? t('widget.memenu.minimail')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="rooms_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomsText ?? t('widget.memenu.myrooms')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="settings_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSettingsText ?? t('widget.memenu.settings')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="achievements_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAchievementsText ?? t('widget.memenu.achievements')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="talents_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTalentsText ?? t('widget.memenu.talents')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="guide_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGuideText ?? t('widget.memenu.guide')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            )}
        </Region>
    );
};
