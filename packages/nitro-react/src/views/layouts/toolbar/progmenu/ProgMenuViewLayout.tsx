import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1239_prog_menu_view_xml` (layout "prog_menu_view", 362x53) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProgMenuViewLayoutProps {
    achievements?: ProgMenuViewLayoutAchievementsProps;
    dailytasks?: ProgMenuViewLayoutDailytasksProps;
    introduction?: ProgMenuViewLayoutIntroductionProps;
    layout?: BoxLayout;
    leaderboards?: ProgMenuViewLayoutLeaderboardsProps;
    quests?: ProgMenuViewLayoutQuestsProps;
    spacer?: ProgMenuViewLayoutSpacerProps;
}

export const ProgMenuViewLayout = ({ achievements, dailytasks, introduction, layout, leaderboards, quests, spacer }: ProgMenuViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 362, height: 53, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 53 }}>
                    <Region layout={{ position: 'absolute', left: 3, width: 359, top: 3, height: 50 }}>
                        <ProgMenuViewLayoutDailytasks {...dailytasks} />
                        <ProgMenuViewLayoutQuests {...quests} />
                        <ProgMenuViewLayoutAchievements {...achievements} />
                        <ProgMenuViewLayoutLeaderboards {...leaderboards} />
                        <ProgMenuViewLayoutIntroduction {...introduction} />
                        <ProgMenuViewLayoutSpacer {...spacer} />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `dailytasks` of ProgMenuViewLayout - configured through the parent's `dailytasks` prop. */
export interface ProgMenuViewLayoutDailytasksProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onDailytasks?: () => void;
    srcDailytasksIconColor?: string;
    srcDailytasksIconGrey?: string;
}

export const ProgMenuViewLayoutDailytasks = ({ captionFieldText, layout, onDailytasks, srcDailytasksIconColor, srcDailytasksIconGrey }: ProgMenuViewLayoutDailytasksProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dailytasks"
            onPointerTap={onDailytasks}
            cursor="pointer"
            layout={{ position: 'absolute', left: 12, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="dailytasks_icon_color"
                src={srcDailytasksIconColor ?? layoutImage('prog_menu_daily_tasks.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
            <Region
                name="field_text"
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.progmenu.dailytasks')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="dailytasks_icon_grey"
                src={srcDailytasksIconGrey ?? layoutImage('prog_menu_daily_tasks.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `quests` of ProgMenuViewLayout - configured through the parent's `quests` prop. */
export interface ProgMenuViewLayoutQuestsProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onQuests?: () => void;
    srcQuestsIconColor?: string;
    srcQuestsIconGrey?: string;
}

export const ProgMenuViewLayoutQuests = ({ captionFieldText, layout, onQuests, srcQuestsIconColor, srcQuestsIconGrey }: ProgMenuViewLayoutQuestsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="quests"
            onPointerTap={onQuests}
            cursor="pointer"
            layout={{ position: 'absolute', left: 80, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="quests_icon_color"
                src={srcQuestsIconColor ?? layoutImage('prog_menu_quests.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
            <Region
                name="field_text"
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.progmenu.quests')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="quests_icon_grey"
                src={srcQuestsIconGrey ?? layoutImage('prog_menu_quests.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `achievements` of ProgMenuViewLayout - configured through the parent's `achievements` prop. */
export interface ProgMenuViewLayoutAchievementsProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onAchievements?: () => void;
    srcAchievementsIconColor?: string;
    srcAchievementsIconGrey?: string;
}

export const ProgMenuViewLayoutAchievements = ({ captionFieldText, layout, onAchievements, srcAchievementsIconColor, srcAchievementsIconGrey }: ProgMenuViewLayoutAchievementsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements"
            onPointerTap={onAchievements}
            cursor="pointer"
            layout={{ position: 'absolute', left: 148, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="achievements_icon_color"
                src={srcAchievementsIconColor ?? layoutImage('me_menu_me_achv.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
            <Region
                name="field_text"
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.progmenu.achievements')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="achievements_icon_grey"
                src={srcAchievementsIconGrey ?? layoutImage('me_menu_me_achv.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `leaderboards` of ProgMenuViewLayout - configured through the parent's `leaderboards` prop. */
export interface ProgMenuViewLayoutLeaderboardsProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onLeaderboards?: () => void;
    srcLeaderboardsIconColor?: string;
    srcLeaderboardsIconGrey?: string;
}

export const ProgMenuViewLayoutLeaderboards = ({ captionFieldText, layout, onLeaderboards, srcLeaderboardsIconColor, srcLeaderboardsIconGrey }: ProgMenuViewLayoutLeaderboardsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="leaderboards"
            onPointerTap={onLeaderboards}
            cursor="pointer"
            layout={{ position: 'absolute', left: 216, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="leaderboards_icon_color"
                src={srcLeaderboardsIconColor ?? layoutImage('prog_menu_leaderboards.png')}
                layout={{ position: 'absolute', left: 17, width: 25, top: 4, height: 25 }}
            />
            <Region
                name="field_text"
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.progmenu.leaderboards')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="leaderboards_icon_grey"
                src={srcLeaderboardsIconGrey ?? layoutImage('prog_menu_leaderboards.png')}
                layout={{ position: 'absolute', left: 17, width: 25, top: 4, height: 25 }}
            />
        </Region>
    );
};

/** Named region `introduction` of ProgMenuViewLayout - configured through the parent's `introduction` prop. */
export interface ProgMenuViewLayoutIntroductionProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onIntroduction?: () => void;
    srcIntroductionIconColor?: string;
    srcIntroductionIconGrey?: string;
}

export const ProgMenuViewLayoutIntroduction = ({ captionFieldText, layout, onIntroduction, srcIntroductionIconColor, srcIntroductionIconGrey }: ProgMenuViewLayoutIntroductionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="introduction"
            onPointerTap={onIntroduction}
            cursor="pointer"
            layout={{ position: 'absolute', left: 284, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="introduction_icon_color"
                src={srcIntroductionIconColor ?? layoutImage('prog_menu_introduction.png')}
                layout={{ position: 'absolute', left: 14, width: 33, top: 0, height: 32 }}
            />
            <Region
                name="field_text"
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.progmenu.introduction')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="introduction_icon_grey"
                src={srcIntroductionIconGrey ?? layoutImage('prog_menu_introduction.png')}
                layout={{ position: 'absolute', left: 14, width: 33, top: 0, height: 32 }}
            />
        </Region>
    );
};

/** Named region `spacer` of ProgMenuViewLayout - configured through the parent's `spacer` prop. */
export interface ProgMenuViewLayoutSpacerProps {
    layout?: BoxLayout;
}

export const ProgMenuViewLayoutSpacer = ({ layout }: ProgMenuViewLayoutSpacerProps) => {
    return (
        <Region
            name="spacer"
            layout={{ position: 'absolute', left: 352, width: 7, top: 2, height: 30, ...layout }}
        />
    );
};
