import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `105_premium_purchase_confirmation_xml` (layout "reward_track_premium_purchase_confirmation", 390x352) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PremiumPurchaseConfirmationLayoutProps {
    itemsBenefits?: ReactNode;
    itemsButtons?: ReactNode;
    itemsPrice?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    srcPremiumIcon?: string;
}

export const PremiumPurchaseConfirmationLayout = ({ itemsBenefits, itemsButtons, itemsPrice, layout, onClose, srcPremiumIcon }: PremiumPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('reward_track.premium.confirm.title')}
            tintColor="#7b3fa1"
            onClose={onClose}
            layout={{ width: 390, height: 352, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content"
                    params={8388752}
                    layout={{ position: 'absolute', left: 12, right: 12, top: 20, height: 268 }}
                >
                    <Region
                        name="top_body"
                        params={8388624}
                        layout={{ position: 'absolute', left: 0, width: 366, top: 0, height: 208 }}
                    >
                        <Border
                            variant="15"
                            name="premium_icon_panel"
                            params={2064}
                            tintColor="#f5def8"
                            layout={{ position: 'absolute', left: 0, width: 132, top: 0, bottom: 0 }}
                        >
                            <Border
                                variant="15"
                                name="premium_icon_frame"
                                params={16}
                                tintColor="#fff4ff"
                                layout={{ position: 'absolute', left: 13, width: 106, top: 13, height: 92 }}
                            >
                                <ThemeImage
                                    name="premium_icon"
                                    params={16}
                                    src={srcPremiumIcon ?? layoutImage('reward_track_premium_track.png')}
                                    layout={{ position: 'absolute', left: 20, width: 67, top: 12, height: 67 }}
                                />
                            </Border>
                            <Region
                                params={2064}
                                layout={{ position: 'absolute', left: 0, width: 132, top: 115, bottom: 12 }}
                            >
                                <Region
                                    params={3148800}
                                    layout={{ position: 'absolute', left: 0, width: 132, top: '50%', marginTop: -17.5, height: 35, flexDirection: 'column' }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ width: 116, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.rewards.premium')}
                                            textOptions={{ fill: '#5d2c82', align: 'center' }}
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ width: 116, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.rewards.premium.info')}
                                            textOptions={{ fill: '#4d3559', wordWrap: true, wordWrapWidth: 116, align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Border>
                        <Region
                            name="benefits"
                            params={8388752}
                            layout={{ position: 'absolute', left: 146, right: 0, top: 3, height: 205, flexDirection: 'column', gap: 5 }}
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
                    </Region>
                    <Border
                        variant="15"
                        name="purchase_cost_box"
                        params={1040}
                        tintColor="#f7e7ff"
                        layout={{ position: 'absolute', left: 0, width: 366, bottom: 10, height: 38 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 241, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('catalog.purchase.confirmation.dialog.cost')}
                                textOptions={{ fill: '#57356b' }}
                            />
                        </Region>
                        <Region
                            name="price"
                            params={262224}
                            layout={{ position: 'absolute', right: 15, width: 87, top: 8, height: 22, flexDirection: 'row', gap: 3 }}
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
                    </Border>
                </Region>
                <Region
                    name="buttons"
                    params={132240}
                    layout={{ position: 'absolute', left: 12, right: 12, bottom: 36, minHeight: 27, flexDirection: 'row', gap: 146 }}
                >
                    {itemsButtons ?? (
                        <>
                            <PremiumPurchaseConfirmationLayoutCancelButtonItem />
                            <PremiumPurchaseConfirmationLayoutConfirmButtonItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `spacing` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutSpacingItem = ({ layout }: PremiumPurchaseConfirmationLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 30, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `description_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps {
    captionDescriptionTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutDescriptionTxtItem = ({ captionDescriptionTxt, layout }: PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="description_txt"
            params={16}
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
}

export const PremiumPurchaseConfirmationLayoutSpacingItem2 = ({ layout }: PremiumPurchaseConfirmationLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 30, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `benefit_boost_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitBoostRowItemProps {
    captionBenefitBoostTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutBenefitBoostRowItem = ({ captionBenefitBoostTxt, layout }: PremiumPurchaseConfirmationLayoutBenefitBoostRowItemProps) => {
    return (
        <Border
            variant="15"
            name="benefit_boost_row"
            params={16}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_boost_txt"
                params={16}
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
}

export const PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem = ({ captionBenefitRewardsTxt, layout }: PremiumPurchaseConfirmationLayoutBenefitRewardsRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_rewards_row"
            params={16}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_rewards_txt"
                params={16}
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
}

export const PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem = ({ captionBenefitInstantPointsTxt, layout }: PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItemProps) => {
    return (
        <Border
            variant="15"
            name="benefit_instant_points_row"
            params={16}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_instant_points_txt"
                params={16}
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
}

export const PremiumPurchaseConfirmationLayoutBenefitTasksRowItem = ({ captionBenefitTasksTxt, layout }: PremiumPurchaseConfirmationLayoutBenefitTasksRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_tasks_row"
            params={16}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_tasks_txt"
                params={16}
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
}

export const PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem = ({ captionBenefitLevelsTxt, layout }: PremiumPurchaseConfirmationLayoutBenefitLevelsRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_levels_row"
            params={16}
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            <Region
                name="benefit_levels_txt"
                params={16}
                layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBenefitLevelsTxt ?? t('reward_track.premium.confirm.benefit.levels')} />
            </Region>
        </Border>
    );
};

/** Row template `price_credits` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPriceCreditsItemProps {
    captionPriceCredits?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPriceCreditsItem = ({ captionPriceCredits, layout }: PremiumPurchaseConfirmationLayoutPriceCreditsItemProps) => {
    return (
        <Region
            name="price_credits"
            params={16}
            layout={{ width: 10, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPriceCredits ?? '0'} />
        </Region>
    );
};

/** Row template `credits_icon` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutCreditsIconItemProps {
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutCreditsIconItem = ({ layout }: PremiumPurchaseConfirmationLayoutCreditsIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="credits_icon"
            params={16}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPlusTxtItemProps {
    captionPlusTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPlusTxtItem = ({ captionPlusTxt, layout }: PremiumPurchaseConfirmationLayoutPlusTxtItemProps) => {
    return (
        <Region
            name="plus_txt"
            params={16}
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
}

export const PremiumPurchaseConfirmationLayoutPriceDiamondsItem = ({ captionPriceDiamonds, layout }: PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps) => {
    return (
        <Region
            name="price_diamonds"
            params={16}
            layout={{ width: 10, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPriceDiamonds ?? '0'} />
        </Region>
    );
};

/** Row template `diamonds_icon` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDiamondsIconItemProps {
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutDiamondsIconItem = ({ layout }: PremiumPurchaseConfirmationLayoutDiamondsIconItemProps) => {
    return (
        <Icon
            variant="41"
            name="diamonds_icon"
            params={16}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `cancel_button` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const PremiumPurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: PremiumPurchaseConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            params={132113}
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
}

export const PremiumPurchaseConfirmationLayoutConfirmButtonItem = ({ layout, onConfirmButton }: PremiumPurchaseConfirmationLayoutConfirmButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="5"
            name="confirm_button"
            params={132113}
            tintColor="#b265ce"
            onPointerTap={onConfirmButton}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('reward_track.premium.confirm.buy')}
        </Button>
    );
};
