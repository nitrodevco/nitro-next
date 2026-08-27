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
                params={1}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 335 }}
            >
                <Region
                    name="profile"
                    params={17}
                    onPointerTap={onProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79 }}
                >
                    <ThemeImage
                        name="profile_icon"
                        params={16}
                        src={srcProfileIcon ?? layoutImage('toolbar_memenu_profile_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="profile_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 9, width: 60, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionProfileText ?? t('widget.memenu.profile')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="minimail"
                    params={17}
                    onPointerTap={onMinimail}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 86, width: 79, top: 0, height: 79 }}
                >
                    <ThemeImage
                        name="minimail_icon"
                        params={16}
                        src={srcMinimailIcon ?? layoutImage('toolbar_memenu_minimail_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="minimail_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 14, width: 50, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMinimailText ?? t('widget.memenu.minimail')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="rooms"
                    params={17}
                    onPointerTap={onRooms}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 79, height: 79 }}
                >
                    <ThemeImage
                        name="rooms_icon"
                        params={16}
                        src={srcRoomsIcon ?? layoutImage('toolbar_memenu_rooms_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="rooms_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 8, width: 62, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRoomsText ?? t('widget.memenu.myrooms')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="settings"
                    params={17}
                    onPointerTap={onSettings}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 86, width: 79, top: 79, height: 79 }}
                >
                    <ThemeImage
                        name="settings_icon"
                        params={16}
                        src={srcSettingsIcon ?? layoutImage('toolbar_memenu_settings_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="settings_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 15, width: 49, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSettingsText ?? t('widget.memenu.settings')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="achievements"
                    params={17}
                    onPointerTap={onAchievements}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 89, top: 158, height: 79 }}
                >
                    <ThemeImage
                        name="achievements_icon"
                        params={16}
                        src={srcAchievementsIcon ?? layoutImage('toolbar_memenu_achievements_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="achievements_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 3, width: 83, top: 61, height: 17, maxWidth: 89, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAchievementsText ?? t('widget.memenu.achievements')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="talents"
                    params={17}
                    onPointerTap={onTalents}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 86, width: 79, top: 158, height: 79 }}
                >
                    <ThemeImage
                        name="talents_icon"
                        params={16}
                        src={srcTalentsIcon ?? layoutImage('toolbar_memenu_talents_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="talents_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 18, width: 43, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTalentsText ?? t('widget.memenu.talents')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="guide"
                    params={17}
                    onPointerTap={onGuide}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79 }}
                >
                    <ThemeImage
                        name="guide_icon"
                        params={16}
                        src={srcGuideIcon ?? layoutImage('toolbar_memenu_guide_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="guide_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 5, width: 69, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGuideText ?? t('widget.memenu.guide')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="clothes"
                    params={17}
                    onPointerTap={onClothes}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 86, width: 79, top: 247, height: 79 }}
                >
                    <ThemeImage
                        name="clothes_icon"
                        params={16}
                        src={srcClothesIcon ?? layoutImage('toolbar_memenu_clothes_white.png')}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="clothes_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionClothesText ?? t('widget.memenu.editavatar')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
