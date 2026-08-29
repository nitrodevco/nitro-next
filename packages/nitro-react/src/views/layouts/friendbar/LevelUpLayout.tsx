import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `27_level_up_xml` (layout "level_up", 430x362) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LevelUpLayoutProps {
    captionCloseButton?: string;
    captionLevelUpMessage?: string;
    layout?: BoxLayout;
    levelUpLayout?: LevelUpLayoutLevelUpLayoutProps;
    onClose?: () => void;
    onCloseButton?: () => void;
    onTalentButton?: () => void;
    srcLevelDecoration?: string;
}

export const LevelUpLayout = ({ captionCloseButton, captionLevelUpMessage, layout, levelUpLayout, onClose, onCloseButton, onTalentButton, srcLevelDecoration }: LevelUpLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('talent.track.common.levelup.caption')}
            onClose={onClose}
            layout={{ width: 430, height: 362, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 10, top: 10, flexDirection: 'column' }}>
                    <Region layout={{ width: 291, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('talent.track.common.levelup.title')}
                            textStyle="text-style-il-heading-title"
                        />
                    </Region>
                    <Region
                        name="level_up_message"
                        layout={{ width: 410, height: 37, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionLevelUpMessage ?? t('talent.track.helper.levelup.message')}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 410 }}
                        />
                    </Region>
                    <Border
                        variant="102"
                        layout={{ width: 406, height: 176, flexShrink: 0, minWidth: 406, minHeight: 70 }}
                    >
                        <LevelUpLayoutLevelUpLayout {...levelUpLayout} />
                    </Border>
                    <Button
                        variant="101"
                        name="talent_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onTalentButton}
                        layout={{ width: 221, height: 53, flexShrink: 0 }}
                    >
                        {t('talent.track.common.levelup.check')}
                    </Button>
                    <Region
                        name="close_button"
                        layout={{ width: 94, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        onPointerTap={onCloseButton}
                        cursor="pointer"
                    >
                        <ThemeText text={captionCloseButton ?? t('alert.close.button')} />
                    </Region>
                </Region>
                <ThemeImage
                    name="level_decoration"
                    src={srcLevelDecoration}
                    layout={{ position: 'absolute', left: 280, width: 260, bottom: 13, height: 260 }}
                />
            </Region>
        </Frame>
    );
};

/** Row template `level_title` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelTitleItemProps {
    captionLevelTitle?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelTitleItem = ({ captionLevelTitle, layout }: LevelUpLayoutLevelTitleItemProps) => {
    return (
        <Region
            name="level_title"
            layout={{ width: 340, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionLevelTitle ?? 'Frank\'s Little Helper'}
                textStyle="text-style-il-heading-2"
                textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
            />
        </Region>
    );
};

/** Row template `level_description` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelDescriptionItemProps {
    captionLevelDescription?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelDescriptionItem = ({ captionLevelDescription, layout }: LevelUpLayoutLevelDescriptionItemProps) => {
    return (
        <Region
            name="level_description"
            layout={{ width: 309, height: 65, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionLevelDescription ?? 'Now that you know your  Now that you know way around  Now that you knowthe hotel, it\'s... Now that you know your way around the hotel, it\'s... Now that you know your way around the hotel, it\'s...'}
                textOptions={{ wordWrap: true, wordWrapWidth: 309 }}
            />
        </Region>
    );
};

/** Row template `reward_vip_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutRewardVipTemplateItemProps {
    captionVipLength?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutRewardVipTemplateItem = ({ captionVipLength, layout }: LevelUpLayoutRewardVipTemplateItemProps) => {
    return (
        <Region
            name="reward_vip_template"
            layout={{ width: 93, height: 33, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('talent_vip_reward.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 33 }}
            />
            <Region
                name="vip_length"
                layout={{ position: 'absolute', left: 37, width: 56, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipLength ?? 'x 10 days'}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ fill: '#222222' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `reward_product_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutRewardProductTemplateItemProps {
    layout?: BoxLayout;
    srcRewardProductTemplate?: string;
}

export const LevelUpLayoutRewardProductTemplateItem = ({ layout, srcRewardProductTemplate }: LevelUpLayoutRewardProductTemplateItemProps) => {
    return (
        <ThemeImage
            name="reward_product_template"
            src={srcRewardProductTemplate}
            layout={{ width: 35, height: 35, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `reward_perk_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutRewardPerkTemplateItemProps {
    captionPerkName?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutRewardPerkTemplateItem = ({ captionPerkName, layout }: LevelUpLayoutRewardPerkTemplateItemProps) => {
    return (
        <Region
            name="reward_perk_template"
            layout={{ width: 99, height: 35, flexShrink: 0, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="perk_image"
                options={{ 'badge_image:type': 'perk', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 35 }}
            />
            <Region
                name="perk_name"
                layout={{ position: 'absolute', left: 37, width: 62, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPerkName ?? 'perk name'}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ fill: '#222222' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `plus_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutPlusTemplateItemProps {
    captionPlusTemplate?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutPlusTemplateItem = ({ captionPlusTemplate, layout }: LevelUpLayoutPlusTemplateItemProps) => {
    return (
        <Region
            name="plus_template"
            layout={{ width: 22, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPlusTemplate ?? ' '}
                textStyle="text-style-il-heading-1"
                textOptions={{ fill: '#222222' }}
            />
        </Region>
    );
};

/** Named region `reward_list` of LevelUpLayout - configured through the parent's `rewardList` prop. */
export interface LevelUpLayoutRewardListProps {
    itemsRewardList?: ReactNode;
    layout?: BoxLayout;
}

export const LevelUpLayoutRewardList = ({ itemsRewardList, layout }: LevelUpLayoutRewardListProps) => {
    return (
        <Region
            name="reward_list"
            layout={{ position: 'absolute', left: 4, width: 370, top: 34, height: 35, flexDirection: 'row', ...layout }}
        >
            {itemsRewardList ?? (
                <>
                    <LevelUpLayoutRewardVipTemplateItem />
                    <LevelUpLayoutRewardProductTemplateItem />
                    <LevelUpLayoutRewardPerkTemplateItem />
                    <LevelUpLayoutPlusTemplateItem />
                </>
            )}
        </Region>
    );
};

/** Row template `level_rewards` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelRewardsItemProps {
    layout?: BoxLayout;
    rewardList?: LevelUpLayoutRewardListProps;
}

export const LevelUpLayoutLevelRewardsItem = ({ layout, rewardList }: LevelUpLayoutLevelRewardsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_rewards"
            layout={{ width: 378, height: 80, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 378, top: 0, height: 2 }}
            />
            <Region layout={{ position: 'absolute', left: 4, width: 185, top: 12, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('talent.track.common.levelup.rewards')}
                    textStyle="text-style-il-border"
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
            <LevelUpLayoutRewardList {...rewardList} />
        </Region>
    );
};

/** Named region `level_up_layout` of LevelUpLayout - configured through the parent's `levelUpLayout` prop. */
export interface LevelUpLayoutLevelUpLayoutProps {
    itemsLevelUpLayout?: ReactNode;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelUpLayout = ({ itemsLevelUpLayout, layout }: LevelUpLayoutLevelUpLayoutProps) => {
    return (
        <Region
            name="level_up_layout"
            layout={{ position: 'absolute', left: 14, top: 12, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsLevelUpLayout ?? (
                <>
                    <LevelUpLayoutLevelTitleItem />
                    <LevelUpLayoutLevelDescriptionItem />
                    <LevelUpLayoutLevelRewardsItem />
                </>
            )}
        </Region>
    );
};
