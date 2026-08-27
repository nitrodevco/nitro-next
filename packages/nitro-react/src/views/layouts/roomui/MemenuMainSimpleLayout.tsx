import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1042_memenu_main_simple_xml` (layout "memenu_main", 165x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuMainSimpleLayoutProps {
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

export const MemenuMainSimpleLayout = ({ captionAchievementsText, captionGuideText, captionMinimailText, captionProfileText, captionRoomsText, captionSettingsText, captionTalentsText, layout, onAchievements, onButtons, onGuide, onMinimail, onProfile, onRooms, onSettings, onTalents, srcAchievementsIcon, srcGuideIcon, srcMinimailIcon, srcProfileIcon, srcRoomsIcon, srcSettingsIcon, srcTalentsIcon, visibleGuide }: MemenuMainSimpleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 165, height: 245, ...layout }}>
            <Region
                name="buttons"
                params={17}
                onPointerTap={onButtons}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 245 }}
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
                        src={srcProfileIcon}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="profile_text"
                        params={786640}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionProfileText ?? t('widget.memenu.profile')}
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
                        src={srcMinimailIcon}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="minimail_text"
                        params={786640}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMinimailText ?? t('widget.memenu.minimail')}
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
                        src={srcRoomsIcon}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="rooms_text"
                        params={786640}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRoomsText ?? t('widget.memenu.myrooms')}
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
                        src={srcSettingsIcon}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="settings_text"
                        params={786640}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSettingsText ?? t('widget.memenu.settings')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="achievements"
                    params={17}
                    onPointerTap={onAchievements}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 158, height: 79 }}
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
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAchievementsText ?? t('widget.memenu.achievements')}
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
                        src={srcTalentsIcon}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="talents_text"
                        params={786640}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTalentsText ?? t('widget.memenu.talents')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="guide"
                    params={17}
                    visible={visibleGuide ?? false}
                    onPointerTap={onGuide}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 79, top: 247, height: 79 }}
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
                        layout={{ position: 'absolute', left: '50%', marginLeft: -35.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGuideText ?? t('widget.memenu.guide')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
