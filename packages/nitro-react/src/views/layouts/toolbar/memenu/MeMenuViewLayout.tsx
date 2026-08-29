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
    tags?: string[];
}

export const MeMenuViewLayoutProfile = ({ captionProfileText, layout, onProfile, srcProfileIcon, tags }: MeMenuViewLayoutProfileProps) => {
    const t = useTranslation();

    return (
        <Region
            name="profile"
            tags={tags}
            onPointerTap={onProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="profile_icon"
                src={srcProfileIcon ?? layoutImage('toolbar_memenu_profile_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="profile_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutMinimail = ({ captionMinimailText, layout, onMinimail, srcMinimailIcon, tags }: MeMenuViewLayoutMinimailProps) => {
    const t = useTranslation();

    return (
        <Region
            name="minimail"
            tags={tags}
            onPointerTap={onMinimail}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 0, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="minimail_icon"
                src={srcMinimailIcon ?? layoutImage('toolbar_memenu_minimail_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="minimail_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutRooms = ({ captionRoomsText, layout, onRooms, srcRoomsIcon, tags }: MeMenuViewLayoutRoomsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rooms"
            tags={tags}
            onPointerTap={onRooms}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 79, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="rooms_icon"
                src={srcRoomsIcon ?? layoutImage('toolbar_memenu_rooms_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="rooms_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutSettings = ({ captionSettingsText, layout, onSettings, srcSettingsIcon, tags }: MeMenuViewLayoutSettingsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="settings"
            tags={tags}
            onPointerTap={onSettings}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 79, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="settings_icon"
                src={srcSettingsIcon ?? layoutImage('toolbar_memenu_settings_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="settings_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutAchievements = ({ captionAchievementsText, layout, onAchievements, srcAchievementsIcon, tags }: MeMenuViewLayoutAchievementsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements"
            tags={tags}
            onPointerTap={onAchievements}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 89, top: 158, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="achievements_icon"
                src={srcAchievementsIcon ?? layoutImage('toolbar_memenu_achievements_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="achievements_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutTalents = ({ captionTalentsText, layout, onTalents, srcTalentsIcon, tags }: MeMenuViewLayoutTalentsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="talents"
            tags={tags}
            onPointerTap={onTalents}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 158, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="talents_icon"
                src={srcTalentsIcon ?? layoutImage('toolbar_memenu_talents_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="talents_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutGuide = ({ captionGuideText, layout, onGuide, srcGuideIcon, tags }: MeMenuViewLayoutGuideProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guide"
            tags={tags}
            onPointerTap={onGuide}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="guide_icon"
                src={srcGuideIcon ?? layoutImage('toolbar_memenu_guide_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="guide_text"
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
    tags?: string[];
}

export const MeMenuViewLayoutClothes = ({ captionClothesText, layout, onClothes, srcClothesIcon, tags }: MeMenuViewLayoutClothesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="clothes"
            tags={tags}
            onPointerTap={onClothes}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 79, top: 247, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="clothes_icon"
                src={srcClothesIcon ?? layoutImage('toolbar_memenu_clothes_white.png')}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="clothes_text"
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
