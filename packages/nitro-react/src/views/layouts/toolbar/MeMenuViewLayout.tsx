import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1237_me_menu_view_xml` (layout "me_menu_view", 165x335) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuViewLayoutProps {
    achievements?: MeMenuViewLayoutAchievementsProps;
    clothes?: MeMenuViewLayoutClothesProps;
    guide?: MeMenuViewLayoutGuideProps;
    layout?: BoxLayout;
    minimail?: MeMenuViewLayoutMinimailProps;
    profile?: MeMenuViewLayoutProfileProps;
    rooms?: MeMenuViewLayoutRoomsProps;
    settings?: MeMenuViewLayoutSettingsProps;
    talents?: MeMenuViewLayoutTalentsProps;
}

export const MeMenuViewLayout = ({ achievements, clothes, guide, layout, minimail, profile, rooms, settings, talents }: MeMenuViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 165, height: 335, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                params={1}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 335 }}
            >
                <MeMenuViewLayoutProfile {...profile} />
                <MeMenuViewLayoutMinimail {...minimail} />
                <MeMenuViewLayoutRooms {...rooms} />
                <MeMenuViewLayoutSettings {...settings} />
                <MeMenuViewLayoutAchievements {...achievements} />
                <MeMenuViewLayoutTalents {...talents} />
                <MeMenuViewLayoutGuide {...guide} />
                <MeMenuViewLayoutClothes {...clothes} />
            </Border>
        </Region>
    );
};

/** Named region `profile` of MeMenuViewLayout - configured through the parent's `profile` prop. */
export interface MeMenuViewLayoutProfileProps {
    captionProfileText?: string;
    layout?: BoxLayout;
    onProfile?: () => void;
    srcProfileIcon?: string;
}

export const MeMenuViewLayoutProfile = ({ captionProfileText, layout, onProfile, srcProfileIcon }: MeMenuViewLayoutProfileProps) => {
    const t = useTranslation();

    return (
        <Region
            name="profile"
            params={17}
            onPointerTap={onProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 60, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProfileText ?? t('widget.memenu.profile')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `minimail` of MeMenuViewLayout - configured through the parent's `minimail` prop. */
export interface MeMenuViewLayoutMinimailProps {
    captionMinimailText?: string;
    layout?: BoxLayout;
    onMinimail?: () => void;
    srcMinimailIcon?: string;
}

export const MeMenuViewLayoutMinimail = ({ captionMinimailText, layout, onMinimail, srcMinimailIcon }: MeMenuViewLayoutMinimailProps) => {
    const t = useTranslation();

    return (
        <Region
            name="minimail"
            params={17}
            onPointerTap={onMinimail}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 0, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMinimailText ?? t('widget.memenu.minimail')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `rooms` of MeMenuViewLayout - configured through the parent's `rooms` prop. */
export interface MeMenuViewLayoutRoomsProps {
    captionRoomsText?: string;
    layout?: BoxLayout;
    onRooms?: () => void;
    srcRoomsIcon?: string;
}

export const MeMenuViewLayoutRooms = ({ captionRoomsText, layout, onRooms, srcRoomsIcon }: MeMenuViewLayoutRoomsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rooms"
            params={17}
            onPointerTap={onRooms}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 79, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 62, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomsText ?? t('widget.memenu.myrooms')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `settings` of MeMenuViewLayout - configured through the parent's `settings` prop. */
export interface MeMenuViewLayoutSettingsProps {
    captionSettingsText?: string;
    layout?: BoxLayout;
    onSettings?: () => void;
    srcSettingsIcon?: string;
}

export const MeMenuViewLayoutSettings = ({ captionSettingsText, layout, onSettings, srcSettingsIcon }: MeMenuViewLayoutSettingsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="settings"
            params={17}
            onPointerTap={onSettings}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 79, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 49, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSettingsText ?? t('widget.memenu.settings')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `achievements` of MeMenuViewLayout - configured through the parent's `achievements` prop. */
export interface MeMenuViewLayoutAchievementsProps {
    captionAchievementsText?: string;
    layout?: BoxLayout;
    onAchievements?: () => void;
    srcAchievementsIcon?: string;
}

export const MeMenuViewLayoutAchievements = ({ captionAchievementsText, layout, onAchievements, srcAchievementsIcon }: MeMenuViewLayoutAchievementsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements"
            params={17}
            onPointerTap={onAchievements}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 89, top: 158, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 83, top: 61, height: 17, maxWidth: 89, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAchievementsText ?? t('widget.memenu.achievements')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `talents` of MeMenuViewLayout - configured through the parent's `talents` prop. */
export interface MeMenuViewLayoutTalentsProps {
    captionTalentsText?: string;
    layout?: BoxLayout;
    onTalents?: () => void;
    srcTalentsIcon?: string;
}

export const MeMenuViewLayoutTalents = ({ captionTalentsText, layout, onTalents, srcTalentsIcon }: MeMenuViewLayoutTalentsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="talents"
            params={17}
            onPointerTap={onTalents}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 158, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 43, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTalentsText ?? t('widget.memenu.talents')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `guide` of MeMenuViewLayout - configured through the parent's `guide` prop. */
export interface MeMenuViewLayoutGuideProps {
    captionGuideText?: string;
    layout?: BoxLayout;
    onGuide?: () => void;
    srcGuideIcon?: string;
}

export const MeMenuViewLayoutGuide = ({ captionGuideText, layout, onGuide, srcGuideIcon }: MeMenuViewLayoutGuideProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guide"
            params={17}
            onPointerTap={onGuide}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 69, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGuideText ?? t('widget.memenu.guide')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `clothes` of MeMenuViewLayout - configured through the parent's `clothes` prop. */
export interface MeMenuViewLayoutClothesProps {
    captionClothesText?: string;
    layout?: BoxLayout;
    onClothes?: () => void;
    srcClothesIcon?: string;
}

export const MeMenuViewLayoutClothes = ({ captionClothesText, layout, onClothes, srcClothesIcon }: MeMenuViewLayoutClothesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="clothes"
            params={17}
            onPointerTap={onClothes}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 247, height: 79, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 17, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionClothesText ?? t('widget.memenu.editavatar')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
