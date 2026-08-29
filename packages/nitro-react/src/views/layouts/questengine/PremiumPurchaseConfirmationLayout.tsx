import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `105_premium_purchase_confirmation_xml` (layout "reward_track_premium_purchase_confirmation", 390x352) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PremiumPurchaseConfirmationLayoutProps {
    buttons?: PremiumPurchaseConfirmationLayoutButtonsProps;
    content?: PremiumPurchaseConfirmationLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PremiumPurchaseConfirmationLayout = ({ buttons, content, layout, onClose }: PremiumPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('reward_track.premium.confirm.title')}
            tintColor="#7b3fa1"
            onClose={onClose}
            layout={{ width: 390, height: 352, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <PremiumPurchaseConfirmationLayoutContent {...content} />
                <PremiumPurchaseConfirmationLayoutButtons {...buttons} />
            </Region>
        </Frame>
    );
};

/** Row template `spacing` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutSpacingItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutSpacingItem = ({ layout, tags }: PremiumPurchaseConfirmationLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 30, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `description_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps {
    captionDescriptionTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutDescriptionTxtItem = ({ captionDescriptionTxt, layout, tags }: PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="description_txt"
            tags={tags}
            layout={{ width: 220, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionDescriptionTxt ?? t('reward_track.premium.confirm.desc')}
                textOptions={{ fill: '#2d1f35', wordWrap: true, wordWrapWidth: 220, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `spacing` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutSpacingItem2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutSpacingItem2 = ({ layout, tags }: PremiumPurchaseConfirmationLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 30, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `benefit_boost_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitBoostRowItemProps {
    captionBenefitBoostTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutBenefitBoostRowItem = ({ captionBenefitBoostTxt, layout, tags }: PremiumPurchaseConfirmationLayoutBenefitBoostRowItemProps) => {
    return (
        <Border
            variant="15"
            name="benefit_boost_row"
            tags={tags}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_boost_txt"
                layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBenefitBoostTxt ?? ''} />
            </Region>
        </Border>
    );
};

/** Row template `benefit_rewards_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitRewardsRowItemProps {
    captionBenefitRewardsTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem = ({ captionBenefitRewardsTxt, layout, tags }: PremiumPurchaseConfirmationLayoutBenefitRewardsRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_rewards_row"
            tags={tags}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_rewards_txt"
                layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBenefitRewardsTxt ?? t('reward_track.premium.confirm.benefit.rewards')} />
            </Region>
        </Border>
    );
};

/** Row template `benefit_instant_points_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItemProps {
    captionBenefitInstantPointsTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem = ({ captionBenefitInstantPointsTxt, layout, tags }: PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItemProps) => {
    return (
        <Border
            variant="15"
            name="benefit_instant_points_row"
            tags={tags}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_instant_points_txt"
                layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBenefitInstantPointsTxt ?? ''} />
            </Region>
        </Border>
    );
};

/** Row template `benefit_tasks_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitTasksRowItemProps {
    captionBenefitTasksTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutBenefitTasksRowItem = ({ captionBenefitTasksTxt, layout, tags }: PremiumPurchaseConfirmationLayoutBenefitTasksRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_tasks_row"
            tags={tags}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_tasks_txt"
                layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBenefitTasksTxt ?? t('reward_track.premium.confirm.benefit.tasks')} />
            </Region>
        </Border>
    );
};

/** Row template `benefit_levels_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitLevelsRowItemProps {
    captionBenefitLevelsTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem = ({ captionBenefitLevelsTxt, layout, tags }: PremiumPurchaseConfirmationLayoutBenefitLevelsRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_levels_row"
            tags={tags}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_levels_txt"
                layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBenefitLevelsTxt ?? t('reward_track.premium.confirm.benefit.levels')} />
            </Region>
        </Border>
    );
};

/** Named region `benefits` of PremiumPurchaseConfirmationLayout - configured through the parent's `benefits` prop. */
export interface PremiumPurchaseConfirmationLayoutBenefitsProps {
    itemsBenefits?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutBenefits = ({ itemsBenefits, layout, tags }: PremiumPurchaseConfirmationLayoutBenefitsProps) => {
    return (
        <Region
            name="benefits"
            tags={tags}
            layout={{ position: 'absolute', left: 146, right: 0, top: 3, height: 205, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsBenefits ?? (
                <>
                    <PremiumPurchaseConfirmationLayoutSpacingItem />
                    <PremiumPurchaseConfirmationLayoutDescriptionTxtItem />
                    <PremiumPurchaseConfirmationLayoutSpacingItem2 />
                    <PremiumPurchaseConfirmationLayoutBenefitBoostRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitTasksRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem />
                </>
            )}
        </Region>
    );
};

/** Named region `top_body` of PremiumPurchaseConfirmationLayout - configured through the parent's `topBody` prop. */
export interface PremiumPurchaseConfirmationLayoutTopBodyProps {
    benefits?: PremiumPurchaseConfirmationLayoutBenefitsProps;
    layout?: BoxLayout;
    srcPremiumIcon?: string;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutTopBody = ({ benefits, layout, srcPremiumIcon, tags }: PremiumPurchaseConfirmationLayoutTopBodyProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_body"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 366, top: 0, height: 208, ...layout }}
        >
            <Border
                variant="15"
                name="premium_icon_panel"
                tintColor="#f5def8"
                layout={{ position: 'absolute', left: 0, width: 132, top: 0, bottom: 0 }}
            >
                <Border
                    variant="15"
                    name="premium_icon_frame"
                    tintColor="#fff4ff"
                    layout={{ position: 'absolute', left: 13, width: 106, top: 13, height: 92 }}
                >
                    <ThemeImage
                        name="premium_icon"
                        src={srcPremiumIcon ?? layoutImage('reward_track_premium_track.png')}
                        layout={{ position: 'absolute', left: 20, width: 67, top: 12, height: 67 }}
                    />
                </Border>
                <Region layout={{ position: 'absolute', left: 0, width: 132, top: 115, bottom: 12 }}>
                    <Region layout={{ position: 'absolute', left: 0, width: 132, alignSelf: 'center', height: 35, flexDirection: 'column' }}>
                        <Region layout={{ width: 116, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('reward_track.rewards.premium')}
                                textOptions={{ fill: '#5d2c82', align: 'center' }}
                            />
                        </Region>
                        <Region layout={{ width: 116, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('reward_track.rewards.premium.info')}
                                textOptions={{ fill: '#4d3559', wordWrap: true, wordWrapWidth: 116, align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Border>
            <PremiumPurchaseConfirmationLayoutBenefits {...benefits} />
        </Region>
    );
};

/** Row template `price_credits` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPriceCreditsItemProps {
    captionPriceCredits?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutPriceCreditsItem = ({ captionPriceCredits, layout, tags }: PremiumPurchaseConfirmationLayoutPriceCreditsItemProps) => {
    return (
        <Region
            name="price_credits"
            tags={tags}
            layout={{ width: 10, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPriceCredits ?? '0'} />
        </Region>
    );
};

/** Row template `credits_icon` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutCreditsIconItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutCreditsIconItem = ({ layout, tags }: PremiumPurchaseConfirmationLayoutCreditsIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="credits_icon"
            tags={tags}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPlusTxtItemProps {
    captionPlusTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutPlusTxtItem = ({ captionPlusTxt, layout, tags }: PremiumPurchaseConfirmationLayoutPlusTxtItemProps) => {
    return (
        <Region
            name="plus_txt"
            tags={tags}
            layout={{ width: 11, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlusTxt ?? ' '} />
        </Region>
    );
};

/** Row template `price_diamonds` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps {
    captionPriceDiamonds?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutPriceDiamondsItem = ({ captionPriceDiamonds, layout, tags }: PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps) => {
    return (
        <Region
            name="price_diamonds"
            tags={tags}
            layout={{ width: 10, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPriceDiamonds ?? '0'} />
        </Region>
    );
};

/** Row template `diamonds_icon` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDiamondsIconItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutDiamondsIconItem = ({ layout, tags }: PremiumPurchaseConfirmationLayoutDiamondsIconItemProps) => {
    return (
        <Icon
            variant="41"
            name="diamonds_icon"
            tags={tags}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `price` of PremiumPurchaseConfirmationLayout - configured through the parent's `price` prop. */
export interface PremiumPurchaseConfirmationLayoutPriceProps {
    itemsPrice?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutPrice = ({ itemsPrice, layout, tags }: PremiumPurchaseConfirmationLayoutPriceProps) => {
    return (
        <Region
            name="price"
            tags={tags}
            layout={{ position: 'absolute', right: 15, width: 87, top: 8, height: 22, flexDirection: 'row', gap: 3, ...layout }}
        >
            {itemsPrice ?? (
                <>
                    <PremiumPurchaseConfirmationLayoutPriceCreditsItem />
                    <PremiumPurchaseConfirmationLayoutCreditsIconItem />
                    <PremiumPurchaseConfirmationLayoutPlusTxtItem />
                    <PremiumPurchaseConfirmationLayoutPriceDiamondsItem />
                    <PremiumPurchaseConfirmationLayoutDiamondsIconItem />
                </>
            )}
        </Region>
    );
};

/** Named region `content` of PremiumPurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface PremiumPurchaseConfirmationLayoutContentProps {
    layout?: BoxLayout;
    price?: PremiumPurchaseConfirmationLayoutPriceProps;
    tags?: string[];
    topBody?: PremiumPurchaseConfirmationLayoutTopBodyProps;
}

export const PremiumPurchaseConfirmationLayoutContent = ({ layout, price, tags, topBody }: PremiumPurchaseConfirmationLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            tags={tags}
            layout={{ position: 'absolute', left: 12, right: 12, top: 20, height: 268, ...layout }}
        >
            <PremiumPurchaseConfirmationLayoutTopBody {...topBody} />
            <Border
                variant="15"
                name="purchase_cost_box"
                tintColor="#f7e7ff"
                layout={{ position: 'absolute', left: 0, width: 366, bottom: 10, height: 38 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 241, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textOptions={{ fill: '#57356b' }}
                    />
                </Region>
                <PremiumPurchaseConfirmationLayoutPrice {...price} />
            </Border>
        </Region>
    );
};

/** Row template `cancel_button` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton, tags }: PremiumPurchaseConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            tags={tags}
            onPointerTap={onCancelButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('reward_track.premium.confirm.cancel')}
        </Button>
    );
};

/** Row template `confirm_button` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutConfirmButtonItemProps {
    layout?: BoxLayout;
    onConfirmButton?: () => void;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutConfirmButtonItem = ({ layout, onConfirmButton, tags }: PremiumPurchaseConfirmationLayoutConfirmButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="5"
            name="confirm_button"
            tags={tags}
            tintColor="#b265ce"
            onPointerTap={onConfirmButton}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('reward_track.premium.confirm.buy')}
        </Button>
    );
};

/** Named region `buttons` of PremiumPurchaseConfirmationLayout - configured through the parent's `buttons` prop. */
export interface PremiumPurchaseConfirmationLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const PremiumPurchaseConfirmationLayoutButtons = ({ itemsButtons, layout, tags }: PremiumPurchaseConfirmationLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', left: 12, right: 12, bottom: 36, minHeight: 27, flexDirection: 'row', gap: 146, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <PremiumPurchaseConfirmationLayoutCancelButtonItem />
                    <PremiumPurchaseConfirmationLayoutConfirmButtonItem />
                </>
            )}
        </Region>
    );
};
