import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1237_me_menu_view_xml` (layout "me_menu_view", 165x335) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuViewLayoutProps {
    captionAchievementsText?: string;
    captionClothesText?: string;
    captionGuideText?: string;
    captionMinimailText?: string;
    captionProfileText?: string;
    captionRoomsText?: string;
    captionSettingsText?: string;
    captionTalentsText?: string;
    layout?: BoxLayout;
    onAchievements?: () => void;
    onClothes?: () => void;
    onGuide?: () => void;
    onMinimail?: () => void;
    onProfile?: () => void;
    onRooms?: () => void;
    onSettings?: () => void;
    onTalents?: () => void;
    srcAchievementsIcon?: string;
    srcClothesIcon?: string;
    srcGuideIcon?: string;
    srcMinimailIcon?: string;
    srcProfileIcon?: string;
    srcRoomsIcon?: string;
    srcSettingsIcon?: string;
    srcTalentsIcon?: string;
}

export const MeMenuViewLayout = ({ captionAchievementsText, captionClothesText, captionGuideText, captionMinimailText, captionProfileText, captionRoomsText, captionSettingsText, captionTalentsText, layout, onAchievements, onClothes, onGuide, onMinimail, onProfile, onRooms, onSettings, onTalents, srcAchievementsIcon, srcClothesIcon, srcGuideIcon, srcMinimailIcon, srcProfileIcon, srcRoomsIcon, srcSettingsIcon, srcTalentsIcon }: MeMenuViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 165, height: 335, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="profile"
                    onPointerTap={onProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="profile_icon"
                        src={srcProfileIcon ?? layoutImage('toolbar_memenu_profile_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionProfileText ?? t('widget.memenu.profile')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="profile_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 60, top: 61, height: 17, maxWidth: 70 }}
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
                        src={srcMinimailIcon ?? layoutImage('toolbar_memenu_minimail_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionMinimailText ?? t('widget.memenu.minimail')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="minimail_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, top: 61, height: 17, maxWidth: 70 }}
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
                        src={srcRoomsIcon ?? layoutImage('toolbar_memenu_rooms_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionRoomsText ?? t('widget.memenu.myrooms')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="rooms_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 62, top: 61, height: 17, maxWidth: 70 }}
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
                        src={srcSettingsIcon ?? layoutImage('toolbar_memenu_settings_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionSettingsText ?? t('widget.memenu.settings')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="settings_text"
                        layout={{ position: 'absolute', width: 49, top: 61, height: 17, maxWidth: 70 }}
                    />
                </Region>
                <Region
                    name="achievements"
                    onPointerTap={onAchievements}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 89, top: 158, height: 79, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="achievements_icon"
                        src={srcAchievementsIcon ?? layoutImage('toolbar_memenu_achievements_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionAchievementsText ?? t('widget.memenu.achievements')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="achievements_text"
                        layout={{ position: 'absolute', width: 83, top: 61, height: 17, maxWidth: 89 }}
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
                        src={srcTalentsIcon ?? layoutImage('toolbar_memenu_talents_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionTalentsText ?? t('widget.memenu.talents')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="talents_text"
                        layout={{ position: 'absolute', width: 43, top: 61, height: 17, maxWidth: 70 }}
                    />
                </Region>
                <Region
                    name="guide"
                    onPointerTap={onGuide}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="guide_icon"
                        src={srcGuideIcon ?? layoutImage('toolbar_memenu_guide_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionGuideText ?? t('widget.memenu.guide')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="guide_text"
                        layout={{ position: 'absolute', width: 69, top: 61, height: 17, maxWidth: 70 }}
                    />
                </Region>
                <Region
                    name="clothes"
                    onPointerTap={onClothes}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 86, width: 79, top: 247, height: 79, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="clothes_icon"
                        src={srcClothesIcon ?? layoutImage('toolbar_memenu_clothes_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <ThemeText
                        text={captionClothesText ?? t('widget.memenu.editavatar')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="clothes_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 17, maxWidth: 70 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
