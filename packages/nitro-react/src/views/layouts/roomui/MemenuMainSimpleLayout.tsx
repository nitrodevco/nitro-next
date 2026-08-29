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

/** Named region `profile` of MemenuMainSimpleLayout - configured through the parent's `profile` prop. */
export interface MemenuMainSimpleLayoutProfileProps {
    captionProfileText?: string;
    layout?: BoxLayout;
    onProfile?: () => void;
    srcProfileIcon?: string;
}

export const MemenuMainSimpleLayoutProfile = ({ captionProfileText, layout, onProfile, srcProfileIcon }: MemenuMainSimpleLayoutProfileProps) => {
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
                src={srcProfileIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="profile_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProfileText ?? t('widget.memenu.profile')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `minimail` of MemenuMainSimpleLayout - configured through the parent's `minimail` prop. */
export interface MemenuMainSimpleLayoutMinimailProps {
    captionMinimailText?: string;
    layout?: BoxLayout;
    onMinimail?: () => void;
    srcMinimailIcon?: string;
}

export const MemenuMainSimpleLayoutMinimail = ({ captionMinimailText, layout, onMinimail, srcMinimailIcon }: MemenuMainSimpleLayoutMinimailProps) => {
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
                src={srcMinimailIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="minimail_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMinimailText ?? t('widget.memenu.minimail')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `rooms` of MemenuMainSimpleLayout - configured through the parent's `rooms` prop. */
export interface MemenuMainSimpleLayoutRoomsProps {
    captionRoomsText?: string;
    layout?: BoxLayout;
    onRooms?: () => void;
    srcRoomsIcon?: string;
}

export const MemenuMainSimpleLayoutRooms = ({ captionRoomsText, layout, onRooms, srcRoomsIcon }: MemenuMainSimpleLayoutRoomsProps) => {
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
                src={srcRoomsIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="rooms_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomsText ?? t('widget.memenu.myrooms')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `settings` of MemenuMainSimpleLayout - configured through the parent's `settings` prop. */
export interface MemenuMainSimpleLayoutSettingsProps {
    captionSettingsText?: string;
    layout?: BoxLayout;
    onSettings?: () => void;
    srcSettingsIcon?: string;
}

export const MemenuMainSimpleLayoutSettings = ({ captionSettingsText, layout, onSettings, srcSettingsIcon }: MemenuMainSimpleLayoutSettingsProps) => {
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
                src={srcSettingsIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="settings_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSettingsText ?? t('widget.memenu.settings')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `achievements` of MemenuMainSimpleLayout - configured through the parent's `achievements` prop. */
export interface MemenuMainSimpleLayoutAchievementsProps {
    captionAchievementsText?: string;
    layout?: BoxLayout;
    onAchievements?: () => void;
    srcAchievementsIcon?: string;
}

export const MemenuMainSimpleLayoutAchievements = ({ captionAchievementsText, layout, onAchievements, srcAchievementsIcon }: MemenuMainSimpleLayoutAchievementsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements"
            params={17}
            onPointerTap={onAchievements}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 158, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="achievements_icon"
                params={16}
                src={srcAchievementsIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="achievements_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAchievementsText ?? t('widget.memenu.achievements')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `talents` of MemenuMainSimpleLayout - configured through the parent's `talents` prop. */
export interface MemenuMainSimpleLayoutTalentsProps {
    captionTalentsText?: string;
    layout?: BoxLayout;
    onTalents?: () => void;
    srcTalentsIcon?: string;
}

export const MemenuMainSimpleLayoutTalents = ({ captionTalentsText, layout, onTalents, srcTalentsIcon }: MemenuMainSimpleLayoutTalentsProps) => {
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
                src={srcTalentsIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="talents_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTalentsText ?? t('widget.memenu.talents')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `guide` of MemenuMainSimpleLayout - configured through the parent's `guide` prop. */
export interface MemenuMainSimpleLayoutGuideProps {
    captionGuideText?: string;
    layout?: BoxLayout;
    onGuide?: () => void;
    srcGuideIcon?: string;
    visibleGuide?: boolean;
}

export const MemenuMainSimpleLayoutGuide = ({ captionGuideText, layout, onGuide, srcGuideIcon, visibleGuide }: MemenuMainSimpleLayoutGuideProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guide"
            params={17}
            visible={visibleGuide ?? false}
            onPointerTap={onGuide}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="guide_icon"
                params={16}
                src={srcGuideIcon}
                layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
            />
            <Region
                name="guide_text"
                params={786640}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGuideText ?? t('widget.memenu.guide')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `buttons` of MemenuMainSimpleLayout - configured through the parent's `buttons` prop. */
export interface MemenuMainSimpleLayoutButtonsProps {
    achievements?: MemenuMainSimpleLayoutAchievementsProps;
    guide?: MemenuMainSimpleLayoutGuideProps;
    layout?: BoxLayout;
    minimail?: MemenuMainSimpleLayoutMinimailProps;
    onButtons?: () => void;
    profile?: MemenuMainSimpleLayoutProfileProps;
    rooms?: MemenuMainSimpleLayoutRoomsProps;
    settings?: MemenuMainSimpleLayoutSettingsProps;
    talents?: MemenuMainSimpleLayoutTalentsProps;
}

export const MemenuMainSimpleLayoutButtons = ({ achievements, guide, layout, minimail, onButtons, profile, rooms, settings, talents }: MemenuMainSimpleLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            params={17}
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 245, ...layout }}
        >
            <MemenuMainSimpleLayoutProfile {...profile} />
            <MemenuMainSimpleLayoutMinimail {...minimail} />
            <MemenuMainSimpleLayoutRooms {...rooms} />
            <MemenuMainSimpleLayoutSettings {...settings} />
            <MemenuMainSimpleLayoutAchievements {...achievements} />
            <MemenuMainSimpleLayoutTalents {...talents} />
            <MemenuMainSimpleLayoutGuide {...guide} />
        </Region>
    );
};
