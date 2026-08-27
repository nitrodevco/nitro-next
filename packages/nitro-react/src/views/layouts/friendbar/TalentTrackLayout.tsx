import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `23_talent_track_xml` (layout "talent_track", 1000x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TalentTrackLayoutProps {
    captionFrameSubtitle?: string;
    captionFrameTitle?: string;
    captionProgressText?: string;
    itemsPanorama?: ReactNode;
    layout?: BoxLayout;
    onButtonTrackCitizenship?: () => void;
    onButtonTrackHelper?: () => void;
    onFrame?: () => void;
    onProgressContainer?: () => void;
    srcAchievedMid?: string;
    srcAvatarGlow?: string;
    srcMaskLeft?: string;
    srcMaskRight?: string;
    srcProgressLevelDivider?: string;
    srcUnachievedMid?: string;
    visibleButtonTrackCitizenship?: boolean;
    visibleButtonTrackHelper?: boolean;
}

export const TalentTrackLayout = ({ captionFrameSubtitle, captionFrameTitle, captionProgressText, itemsPanorama, layout, onButtonTrackCitizenship, onButtonTrackHelper, onFrame, onProgressContainer, srcAchievedMid, srcAvatarGlow, srcMaskLeft, srcMaskRight, srcProgressLevelDivider, srcUnachievedMid, visibleButtonTrackCitizenship, visibleButtonTrackHelper }: TalentTrackLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 1000, height: 490, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 490, minWidth: 100, minHeight: 50 }}>
                <Frame
                    variant="101"
                    id="frame"
                    name="frame"
                    params={1}
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 1000, top: 22, height: 445, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                        <ScrollArea
                            orientation="horizontal"
                            layout={{ position: 'absolute', left: 0, width: 998, top: 20, height: 280, minHeight: 280, maxHeight: 280 }}
                        >
                            <Region
                                name="panorama"
                                params={17}
                                layout={{ flexDirection: 'row', width: '100%' }}
                            >
                                {itemsPanorama ?? (
                                    <>
                                        <TalentTrackLayoutBeginHelperItem />
                                        <TalentTrackLayoutBeginHelperNoCitizenshipItem />
                                        <TalentTrackLayoutBeginCitizenshipItem />
                                        <TalentTrackLayoutLevelPaneItem />
                                        <TalentTrackLayoutEndPaddingItem />
                                    </>
                                )}
                            </Region>
                        </ScrollArea>
                        {/* <scrollbar_horizontal> for panorama - rendered by that list's ScrollArea */}
                        <ThemeImage
                            name="mask_left"
                            params={16}
                            src={srcMaskLeft ?? layoutImage('talent_mask_left.png')}
                            layout={{ position: 'absolute', left: 0, width: 24, top: 20, height: 280 }}
                        />
                        <ThemeImage
                            name="mask_right"
                            params={80}
                            src={srcMaskRight ?? layoutImage('talent_mask_right.png')}
                            layout={{ position: 'absolute', right: 0, width: 24, top: 20, height: 280 }}
                        />
                        <Region
                            name="progress_container"
                            params={17}
                            onPointerTap={onProgressContainer}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 998, top: 309, height: 80 }}
                        >
                            <Region
                                name="progress_text"
                                params={16}
                                layout={{ position: 'absolute', left: 24, width: 196, top: 18, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionProgressText ?? t('talent.track.common.progress.title')}
                                    textStyle="text-style-il-heading-2"
                                />
                            </Region>
                            <ThemeImage
                                name="unachieved_mid"
                                params={16}
                                src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                                layout={{ position: 'absolute', left: 0, width: 1000, top: 40, height: 16 }}
                            />
                            <ThemeImage
                                name="achieved_mid"
                                params={16}
                                src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                                layout={{ position: 'absolute', left: 0, width: 500, top: 40, height: 16 }}
                            />
                            <ThemeImage
                                name="progress_level_divider"
                                params={16}
                                src={srcProgressLevelDivider ?? layoutImage('talent_achieved_div.png')}
                                layout={{ position: 'absolute', left: 100, width: 2, top: 40, height: 11 }}
                            />
                            <ThemeImage
                                name="avatar_glow"
                                params={16}
                                src={srcAvatarGlow ?? layoutImage('talent_avatar_glow.png')}
                                layout={{ position: 'absolute', left: 25, width: 55, top: 15, height: 55 }}
                            />
                            <WidgetSlot
                                widgetType="avatar_image"
                                name="progress_needle"
                                params={1048592}
                                options={{ 'avatar_image:figure': 'hr-1863-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-', 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                                layout={{ position: 'absolute', left: 36, width: 33, bottom: 19, height: 34 }}
                            />
                            <WidgetSlot
                                widgetType="balloon"
                                name="progress_balloon"
                                params={147456}
                                layout={{ position: 'absolute', left: 42, width: 215, top: 64, height: 30 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 215, top: 0, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('talent.track.common.progress.position')}
                                        textStyle="text-style-il-regular-white"
                                    />
                                </Region>
                            </WidgetSlot>
                        </Region>
                        <Region
                            visible={visibleButtonTrackCitizenship ?? false}
                            layout={{ position: 'absolute', left: 10, width: 36, top: 10, height: 32 }}
                        >
                            <Button
                                variant="102"
                                name="button_track_citizenship"
                                params={131089}
                                onPointerTap={onButtonTrackCitizenship}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                C
                            </Button>
                        </Region>
                        <Region
                            visible={visibleButtonTrackHelper ?? false}
                            layout={{ position: 'absolute', left: 51, width: 36, top: 10, height: 32 }}
                        >
                            <Button
                                variant="102"
                                name="button_track_helper"
                                params={131089}
                                onPointerTap={onButtonTrackHelper}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                H
                            </Button>
                        </Region>
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 53, minWidth: 100 }}>
                    <Region
                        name="frame_subtitle"
                        params={16}
                        layout={{ position: 'absolute', left: 18, width: 179, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFrameSubtitle ?? t('talent.track.helper.frame.subtitle')}
                            textStyle="text-style-il-frame-modal-title"
                            textOptions={{ fill: '#cccccc' }}
                        />
                    </Region>
                    <Region
                        name="frame_title"
                        params={16}
                        layout={{ position: 'absolute', left: 18, width: 352, top: 16, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFrameTitle ?? t('talent.track.helper.frame.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `begin_helper` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutBeginHelperItemProps {
    layout?: BoxLayout;
    onCitizenshipButton?: () => void;
}

export const TalentTrackLayoutBeginHelperItem = ({ layout, onCitizenshipButton }: TalentTrackLayoutBeginHelperItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="begin_helper"
            params={16}
            layout={{ width: 250, height: 280, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 311, top: 20, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('talent.track.helper.guide.begin.title')}
                    textStyle="text-style-il-heading-title"
                />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 230, top: 49, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('talent.track.helper.guide.begin.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                />
            </Region>
            <ThemeImage
                params={16}
                src={layoutImage('talent_citizenship_accomplished.png')}
                layout={{ position: 'absolute', left: 203, width: 32, top: 182, height: 46 }}
            />
            <Region
                params={3145744}
                layout={{ position: 'absolute', left: 124, width: 76, top: '50%', marginTop: 26, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={t('talent.track.helper.begin.citizenship')}
                    textStyle="text-style-il-button"
                    textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                />
            </Region>
            <Button
                variant="100"
                name="citizenship_button"
                params={393233}
                onPointerTap={onCitizenshipButton}
                layout={{ position: 'absolute', right: -4, width: 200, top: 227, height: 43 }}
            >
                {t('talent.track.citizenship.button')}
            </Button>
        </Region>
    );
};

/** Row template `begin_helper_no_citizenship` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutBeginHelperNoCitizenshipItemProps {
    layout?: BoxLayout;
}

export const TalentTrackLayoutBeginHelperNoCitizenshipItem = ({ layout }: TalentTrackLayoutBeginHelperNoCitizenshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="begin_helper_no_citizenship"
            params={16}
            layout={{ width: 250, height: 280, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 259, top: 20, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('talent.track.helper.begin.title')}
                    textStyle="text-style-il-heading-title"
                />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 230, top: 49, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('talent.track.helper.begin.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                />
            </Region>
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                params={16}
                layout={{ position: 'absolute', left: 169, width: 90, top: 144, height: 130 }}
            />
            <ThemeImage
                params={16}
                src={layoutImage('talent_check_mark_circle.png')}
                layout={{ position: 'absolute', left: 216, width: 17, top: 172, height: 18 }}
            />
            <Region
                params={16}
                layout={{ position: 'absolute', left: 113, width: 76, top: 201, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={t('talent.track.helper.begin.register')}
                    textStyle="text-style-il-button"
                    textOptions={{ wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `begin_citizenship` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutBeginCitizenshipItemProps {
    layout?: BoxLayout;
}

export const TalentTrackLayoutBeginCitizenshipItem = ({ layout }: TalentTrackLayoutBeginCitizenshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="begin_citizenship"
            params={16}
            layout={{ width: 250, height: 280, flexShrink: 0, ...layout }}
        >
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 20, minWidth: 228, top: 20, minHeight: 66, flexDirection: 'column', gap: 6 }}
            >
                <Region
                    params={16}
                    layout={{ width: 228, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('talent.track.citizenship.begin.title')}
                        textStyle="text-style-il-heading-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 228 }}
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ width: 230, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('talent.track.citizenship.begin.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                    />
                </Region>
            </Region>
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                params={16}
                layout={{ position: 'absolute', left: 169, width: 90, top: 144, height: 130 }}
            />
            <ThemeImage
                params={16}
                src={layoutImage('talent_check_mark_circle.png')}
                layout={{ position: 'absolute', left: 216, width: 17, top: 172, height: 18 }}
            />
            <Region
                params={16}
                layout={{ position: 'absolute', left: 113, width: 76, top: 201, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={t('talent.track.citizenship.begin.register')}
                    textStyle="text-style-il-button"
                    textOptions={{ wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `reward_product` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardProductItemProps {
    layout?: BoxLayout;
    srcProductIcon?: string;
}

export const TalentTrackLayoutRewardProductItem = ({ layout, srcProductIcon }: TalentTrackLayoutRewardProductItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_product"
            params={16}
            blend={0.3}
            layout={{ width: 61, height: 60, flexShrink: 0, ...layout }}
        >
            <Border
                variant="105"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 14, width: 33, top: 14, height: 33 }}
            >
                <ThemeImage
                    name="product_icon"
                    params={48}
                    src={srcProductIcon}
                    layout={{ position: 'absolute', left: 1, width: 31, top: 1, height: 30 }}
                />
            </Border>
        </Border>
    );
};

/** Row template `reward_vip` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardVipItemProps {
    captionVipLength?: string;
    layout?: BoxLayout;
}

export const TalentTrackLayoutRewardVipItem = ({ captionVipLength, layout }: TalentTrackLayoutRewardVipItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_vip"
            params={147472}
            blend={0.3}
            layout={{ width: 69, height: 60, flexShrink: 0, minHeight: 60, maxHeight: 60, ...layout }}
        >
            <ThemeImage
                params={3120}
                src={layoutImage('talent_vip_reward.png')}
                layout={{ position: 'absolute', left: 14, width: 33, top: '50%', marginTop: -16, height: 33 }}
            />
            <Region
                name="vip_length"
                params={3088}
                layout={{ position: 'absolute', left: 53, width: 16, top: '50%', marginTop: -2, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipLength ?? ''}
                    textStyle="text-style-il-regular-white"
                />
            </Region>
        </Border>
    );
};

/** Row template `reward_achieved` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardAchievedItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TalentTrackLayoutRewardAchievedItem = ({ captionDescription, captionTitle, layout }: TalentTrackLayoutRewardAchievedItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_achieved"
            params={16}
            blend={0.3}
            layout={{ width: 200, height: 60, flexShrink: 0, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="achieved"
                params={48}
                options={{ 'badge_image:type': 'perk', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
            />
            <Region
                name="title"
                params={16}
                layout={{ position: 'absolute', left: 60, width: 68, top: 10, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? 'Reward name'}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="description"
                params={16}
                layout={{ position: 'absolute', left: 60, width: 135, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDescription ?? 'Reward description'}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `reward_locked` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardLockedItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    srcLocked?: string;
}

export const TalentTrackLayoutRewardLockedItem = ({ captionDescription, captionTitle, layout, srcLocked }: TalentTrackLayoutRewardLockedItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_locked"
            params={16}
            tintColor="#979797"
            blend={0.6}
            layout={{ width: 200, height: 60, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="locked"
                params={16}
                src={srcLocked ?? layoutImage('talent_locked_achievement.png')}
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
            />
            <Region
                name="title"
                params={16}
                layout={{ position: 'absolute', left: 60, width: 68, top: 10, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? 'Reward name'}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="description"
                params={16}
                layout={{ position: 'absolute', left: 60, width: 135, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDescription ?? 'Reward description'}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `level_reward` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutLevelRewardItemProps {
    captionDescriptionAchieved?: string;
    captionDescriptionLocked?: string;
    captionTitleAchieved?: string;
    captionTitleLocked?: string;
    captionUnlocked?: string;
    itemsRewardList?: ReactNode;
    layout?: BoxLayout;
    srcAchieved?: string;
    srcLocked?: string;
}

export const TalentTrackLayoutLevelRewardItem = ({ captionDescriptionAchieved, captionDescriptionLocked, captionTitleAchieved, captionTitleLocked, captionUnlocked, itemsRewardList, layout, srcAchieved, srcLocked }: TalentTrackLayoutLevelRewardItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_reward"
            params={16}
            layout={{ width: 350, height: 180, flexShrink: 0, ...layout }}
        >
            <Border
                variant="104"
                name="border"
                params={16}
                tintColor="#bdbdbd"
                layout={{ position: 'absolute', left: 0, width: 350, top: 20, height: 155 }}
            >
                <Region
                    name="unlocked"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 127, top: 8, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUnlocked ?? t('talent.track.common.unlocked')}
                        textStyle="text-style-il-small"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="title_achieved"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 4, top: 22, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleAchieved ?? ''}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="title_locked"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 4, top: 22, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleLocked ?? ''}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region
                    name="description_achieved"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 330, top: 38, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescriptionAchieved ?? 'Reward description achieved'}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                    />
                </Region>
                <Region
                    name="description_locked"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 10, width: 330, top: 38, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescriptionLocked ?? 'Reward description locked'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                    />
                </Region>
                <Region
                    name="reward_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 10, top: 80, flexDirection: 'row', gap: 10 }}
                >
                    {itemsRewardList ?? (
                        <>
                            <TalentTrackLayoutRewardProductItem />
                            <TalentTrackLayoutRewardVipItem />
                            <TalentTrackLayoutRewardAchievedItem />
                            <TalentTrackLayoutRewardLockedItem />
                        </>
                    )}
                </Region>
            </Border>
            <ThemeImage
                name="locked"
                params={16}
                src={srcLocked ?? layoutImage('talent_locked_stripe.png')}
                layout={{ position: 'absolute', left: 1, width: 70, top: 21, height: 25 }}
            />
            <ThemeImage
                name="achieved"
                params={80}
                src={srcAchieved ?? layoutImage('talent_check_mark_circle.png')}
                layout={{ position: 'absolute', right: 10, width: 20, top: 11, height: 20 }}
            />
        </Region>
    );
};

/** Row template `task_achieved` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutTaskAchievedItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    srcAchieved?: string;
}

export const TalentTrackLayoutTaskAchievedItem = ({ captionDescription, captionTitle, layout, srcAchieved }: TalentTrackLayoutTaskAchievedItemProps) => {
    return (
        <Region
            name="task_achieved"
            params={16}
            layout={{ width: 210, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="102"
                name="border"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 210, top: 20, height: 60 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge"
                    params={16}
                    options={{ 'badge_image:badge_id': 'ACH_RegistrationDuration3', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                />
                <Region
                    name="title"
                    params={16}
                    layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? 'TASK NAME'}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                    />
                </Region>
                <Region
                    name="description"
                    params={16}
                    layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? 'Task description!'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                    />
                </Region>
            </Border>
            <ThemeImage
                name="achieved"
                params={16}
                src={srcAchieved ?? layoutImage('talent_check_mark_circle.png')}
                layout={{ position: 'absolute', left: 182, width: 20, top: 11, height: 20 }}
            />
        </Region>
    );
};

/** Row template `task_ongoing` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutTaskOngoingItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onTaskOngoingRegion?: () => void;
    srcTaskProgressBg?: string;
    srcTaskProgressFg?: string;
    srcTaskProgressLeft?: string;
    srcTaskProgressRight?: string;
}

export const TalentTrackLayoutTaskOngoingItem = ({ captionDescription, captionTitle, layout, onTaskOngoingRegion, srcTaskProgressBg, srcTaskProgressFg, srcTaskProgressLeft, srcTaskProgressRight }: TalentTrackLayoutTaskOngoingItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="task_ongoing"
            params={16}
            layout={{ width: 210, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="101"
                name="border"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 210, top: 20, height: 60 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge"
                    params={16}
                    options={{ 'badge_image:badge_id': 'ACH_RegistrationDuration3', 'badge_image:pivot_point': 'top center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:greyscale': 'true' }}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 5, height: 45 }}
                />
                <Region
                    name="title"
                    params={16}
                    layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? 'TASK NAME'}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                    />
                </Region>
                <Region
                    name="description"
                    params={16}
                    layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? 'Task description!'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                    />
                </Region>
                <Region
                    name="task_progress"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 50, top: 48, height: 6 }}
                >
                    <ThemeImage
                        name="task_progress_left"
                        params={16}
                        src={srcTaskProgressLeft ?? layoutImage('talent_task_progress_left.png')}
                        layout={{ position: 'absolute', left: 0, width: 2, top: 0, height: 6 }}
                    />
                    <ThemeImage
                        name="task_progress_right"
                        params={16}
                        src={srcTaskProgressRight ?? layoutImage('talent_task_progress_right.png')}
                        layout={{ position: 'absolute', left: 48, width: 2, top: 0, height: 6 }}
                    />
                    <ThemeImage
                        name="task_progress_bg"
                        params={16}
                        src={srcTaskProgressBg ?? layoutImage('talent_task_progress_bg.png')}
                        layout={{ position: 'absolute', left: 2, width: 46, top: 0, height: 6 }}
                    />
                    <ThemeImage
                        name="task_progress_fg"
                        params={16}
                        src={srcTaskProgressFg ?? layoutImage('talent_task_progress_fg.png')}
                        layout={{ position: 'absolute', left: 1, width: 48, top: 0, height: 6 }}
                    />
                </Region>
            </Border>
            <Region
                name="task_ongoing_region"
                tooltip={t('talent.track.common.view.progress.tooltip')}
                params={17}
                onPointerTap={onTaskOngoingRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 210, top: 0, height: 80 }}
            />
        </Region>
    );
};

/** Row template `task_locked` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutTaskLockedItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    srcLocked?: string;
}

export const TalentTrackLayoutTaskLockedItem = ({ captionDescription, captionTitle, layout, srcLocked }: TalentTrackLayoutTaskLockedItemProps) => {
    return (
        <Region
            name="task_locked"
            params={16}
            layout={{ width: 210, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="104"
                name="border"
                params={16}
                tintColor="#bdbdbd"
                layout={{ position: 'absolute', left: 0, width: 210, top: 20, height: 60 }}
            >
                <ThemeImage
                    name="locked"
                    params={16}
                    src={srcLocked ?? layoutImage('talent_locked_achievement.png')}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                />
                <Region
                    name="title"
                    params={16}
                    layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? 'TASK NAME'}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                    />
                </Region>
                <Region
                    name="description"
                    params={16}
                    layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? 'Task description!'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `level_task` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutLevelTaskItemProps {
    itemsTaskListTop?: ReactNode;
    layout?: BoxLayout;
}

export const TalentTrackLayoutLevelTaskItem = ({ itemsTaskListTop, layout }: TalentTrackLayoutLevelTaskItemProps) => {
    return (
        <Region
            name="level_task"
            params={16}
            layout={{ width: 600, height: 180, flexShrink: 0, ...layout }}
        >
            <Region
                name="task_list_top"
                params={147472}
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', gap: 10 }}
            >
                {itemsTaskListTop ?? (
                    <>
                        <TalentTrackLayoutTaskAchievedItem />
                        <TalentTrackLayoutTaskOngoingItem />
                        <TalentTrackLayoutTaskLockedItem />
                    </>
                )}
            </Region>
            <Region
                name="task_list_bottom"
                params={147472}
                layout={{ position: 'absolute', left: 0, top: 80, flexDirection: 'row', gap: 10 }}
            />
        </Region>
    );
};

/** Row template `level_pane` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutLevelPaneItemProps {
    captionLevelDescription?: string;
    captionLevelTitle?: string;
    itemsStatusList?: ReactNode;
    layout?: BoxLayout;
    srcLevelIllustration?: string;
    visibleActionOverlay?: boolean;
}

export const TalentTrackLayoutLevelPaneItem = ({ captionLevelDescription, captionLevelTitle, itemsStatusList, layout, srcLevelIllustration, visibleActionOverlay }: TalentTrackLayoutLevelPaneItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_pane"
            params={16}
            layout={{ width: 1000, height: 280, flexShrink: 0, minWidth: 320, ...layout }}
        >
            <WidgetSlot
                widgetType="separator"
                name="level_separator"
                params={16}
                options={{ 'separator:vertical': 'true' }}
                layout={{ position: 'absolute', left: 0, width: 50, top: 30, height: 250 }}
            />
            <ThemeImage
                name="level_illustration"
                params={16}
                src={srcLevelIllustration}
                layout={{ position: 'absolute', left: 700, width: 170, top: 0, height: 120 }}
            />
            <Region
                name="level_title"
                params={16}
                layout={{ position: 'absolute', left: 50, width: 71, top: 30, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLevelTitle ?? 'Level title'}
                    textStyle="text-style-il-heading-1"
                />
            </Region>
            <Region
                name="level_description"
                params={16}
                layout={{ position: 'absolute', left: 50, width: 320, top: 55, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLevelDescription ?? 'Level description'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                />
            </Region>
            <Region
                name="status_list"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 1000, top: 100, height: 180, flexDirection: 'row', gap: 10 }}
            >
                {itemsStatusList ?? (
                    <>
                        <TalentTrackLayoutLevelRewardItem />
                        <TalentTrackLayoutLevelTaskItem />
                    </>
                )}
            </Region>
            <Region
                name="action_overlay"
                params={16}
                visible={visibleActionOverlay ?? false}
                layout={{ position: 'absolute', left: -2, width: 214, top: -1, height: 84 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('talent_action_overlay.png')}
                    layout={{ position: 'absolute', left: 0, width: 214, top: 0, height: 84 }}
                />
                <Region
                    params={208}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -66, width: 133, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('talent.track.action.overlay')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `end_padding` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutEndPaddingItemProps {
    layout?: BoxLayout;
}

export const TalentTrackLayoutEndPaddingItem = ({ layout }: TalentTrackLayoutEndPaddingItemProps) => {
    return (
        <Region
            name="end_padding"
            params={16}
            layout={{ width: 100, height: 280, flexShrink: 0, ...layout }}
        />
    );
};
