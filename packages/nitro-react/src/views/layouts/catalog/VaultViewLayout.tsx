import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1540_vault_view_xml` (layout "vault_view", 422x536) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VaultViewLayoutProps {
    earningsContentArea?: VaultViewLayoutEarningsContentAreaProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const VaultViewLayout = ({ earningsContentArea, layout, onClose }: VaultViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="VaultBase"
            name="VaultBase"
            caption={t('earnings.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 422, height: 536, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <VaultViewLayoutEarningsContentArea {...earningsContentArea} />
            </Region>
        </Frame>
    );
};

/** Row template `dailygift_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutDailygiftContainerItemProps {
    captionDailygiftCreditValue?: string;
    captionDailygiftDucketValue?: string;
    captionDailygiftLabel?: string;
    layout?: BoxLayout;
    onDailygiftClaimButton?: () => void;
    srcDailygiftBitmap?: string;
    tags?: string[];
    visibleCreditIcon?: boolean;
}

export const VaultViewLayoutDailygiftContainerItem = ({ captionDailygiftCreditValue, captionDailygiftDucketValue, captionDailygiftLabel, layout, onDailygiftClaimButton, srcDailygiftBitmap, tags, visibleCreditIcon }: VaultViewLayoutDailygiftContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dailygift_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="dailygift_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Icon
                    variant="32"
                    name="ducketIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="dailygiftDucketValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDailygiftDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    visible={visibleCreditIcon ?? false}
                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="34"
                        name="creditIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="dailygiftCreditValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDailygiftCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="dailygift_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="dailygift_bitmap"
                    tags={[ '#icon' ]}
                    src={srcDailygiftBitmap ?? layoutImage('vault_earnings_icon_dailygift.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="dailygift_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDailygiftLabel ?? t('earnings.dailygift.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="dailygift_claim_button"
                onPointerTap={onDailygiftClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `games_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutGamesContainerItemProps {
    captionGamesCreditValue?: string;
    captionGamesDucketValue?: string;
    captionGamesLabel?: string;
    layout?: BoxLayout;
    onGamesClaimButton?: () => void;
    srcGamesBitmap?: string;
    tags?: string[];
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutGamesContainerItem = ({ captionGamesCreditValue, captionGamesDucketValue, captionGamesLabel, layout, onGamesClaimButton, srcGamesBitmap, tags, visibleDucketIcon }: VaultViewLayoutGamesContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="games_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="games_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="gamesDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGamesDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="gamesCreditValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGamesCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="games_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="games_bitmap"
                    tags={[ '#icon' ]}
                    src={srcGamesBitmap ?? layoutImage('vault_earnings_icon_games.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="games_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGamesLabel ?? t('earnings.games.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="games_claim_button"
                onPointerTap={onGamesClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `wiredchest_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutWiredchestContainerItemProps {
    captionWiredchestCreditValue?: string;
    captionWiredchestDucketValue?: string;
    captionWiredchestLabel?: string;
    layout?: BoxLayout;
    onWiredchestClaimButton?: () => void;
    srcWiredchestBitmap?: string;
    tags?: string[];
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutWiredchestContainerItem = ({ captionWiredchestCreditValue, captionWiredchestDucketValue, captionWiredchestLabel, layout, onWiredchestClaimButton, srcWiredchestBitmap, tags, visibleDucketIcon }: VaultViewLayoutWiredchestContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wiredchest_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="wiredchest_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="wiredchestDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWiredchestDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="wiredchestCreditValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWiredchestCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="wiredchest_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="wiredchest_bitmap"
                    tags={[ '#icon' ]}
                    src={srcWiredchestBitmap ?? layoutImage('vault_earnings_icon_chests.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 2, height: 32 }}
                />
                <Region
                    name="wiredchest_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWiredchestLabel ?? t('earnings.wiredchest.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="wiredchest_claim_button"
                onPointerTap={onWiredchestClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `achievements_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutAchievementsContainerItemProps {
    captionAchievementsCreditValue?: string;
    captionAchievementsDucketValue?: string;
    captionAchievementsLabel?: string;
    layout?: BoxLayout;
    onAchievementsClaimButton?: () => void;
    srcAchievementsBitmap?: string;
    tags?: string[];
}

export const VaultViewLayoutAchievementsContainerItem = ({ captionAchievementsCreditValue, captionAchievementsDucketValue, captionAchievementsLabel, layout, onAchievementsClaimButton, srcAchievementsBitmap, tags }: VaultViewLayoutAchievementsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="achievements_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Icon
                    variant="32"
                    name="ducketIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="achievementsDucketValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAchievementsDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="achievementsCreditValue"
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAchievementsCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="achievements_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="achievements_bitmap"
                    tags={[ '#icon' ]}
                    src={srcAchievementsBitmap ?? layoutImage('vault_earnings_icon_achievements.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="achievements_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAchievementsLabel ?? t('earnings.achievements.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="achievements_claim_button"
                onPointerTap={onAchievementsClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `marketplace_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutMarketplaceContainerItemProps {
    captionMarketplaceCreditValue?: string;
    captionMarketplaceDucketValue?: string;
    captionMarketplaceLabel?: string;
    layout?: BoxLayout;
    onMarketplaceClaimButton?: () => void;
    srcMarketplaceBitmap?: string;
    tags?: string[];
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutMarketplaceContainerItem = ({ captionMarketplaceCreditValue, captionMarketplaceDucketValue, captionMarketplaceLabel, layout, onMarketplaceClaimButton, srcMarketplaceBitmap, tags, visibleDucketIcon }: VaultViewLayoutMarketplaceContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketplace_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="marketplace_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="marketplaceDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMarketplaceDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="marketplaceCreditValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMarketplaceCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="marketplace_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="marketplace_bitmap"
                    tags={[ '#icon' ]}
                    src={srcMarketplaceBitmap ?? layoutImage('vault_earnings_icon_marketplace.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="marketplace_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMarketplaceLabel ?? t('earnings.marketplace.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="marketplace_claim_button"
                onPointerTap={onMarketplaceClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `habboclub_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutHabboclubContainerItemProps {
    captionHabboclubCreditValue?: string;
    captionHabboclubDucketValue?: string;
    captionHabboclubLabel?: string;
    layout?: BoxLayout;
    onHabboclubClaimButton?: () => void;
    srcHabboclubBitmap?: string;
    tags?: string[];
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutHabboclubContainerItem = ({ captionHabboclubCreditValue, captionHabboclubDucketValue, captionHabboclubLabel, layout, onHabboclubClaimButton, srcHabboclubBitmap, tags, visibleDucketIcon }: VaultViewLayoutHabboclubContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habboclub_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="habboclub_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="habboclubDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHabboclubDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="habboclubCreditValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHabboclubCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="habboclub_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="habboclub_bitmap"
                    tags={[ '#icon' ]}
                    src={srcHabboclubBitmap ?? layoutImage('vault_earnings_icon_hcpayday.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="habboclub_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHabboclubLabel ?? t('earnings.hc.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="habboclub_claim_button"
                onPointerTap={onHabboclubClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `levelprogression_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutLevelprogressionContainerItemProps {
    captionLevelprogressionCreditValue?: string;
    captionLevelprogressionDucketValue?: string;
    captionLevelprogressionLabel?: string;
    layout?: BoxLayout;
    onLevelprogressionClaimButton?: () => void;
    srcLevelprogressionBitmap?: string;
    tags?: string[];
}

export const VaultViewLayoutLevelprogressionContainerItem = ({ captionLevelprogressionCreditValue, captionLevelprogressionDucketValue, captionLevelprogressionLabel, layout, onLevelprogressionClaimButton, srcLevelprogressionBitmap, tags }: VaultViewLayoutLevelprogressionContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="levelprogression_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="levelprogression_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Icon
                    variant="32"
                    name="ducketIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="levelprogressionDucketValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLevelprogressionDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="levelprogressionCreditValue"
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLevelprogressionCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="levelprogression_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="levelprogression_bitmap"
                    tags={[ '#icon' ]}
                    src={srcLevelprogressionBitmap ?? layoutImage('vault_earnings_icon_levelprogression.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="levelprogression_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLevelprogressionLabel ?? t('earnings.levelprogression.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="levelprogression_claim_button"
                onPointerTap={onLevelprogressionClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `donation_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutDonationContainerItemProps {
    captionDonationCreditValue?: string;
    captionDonationDucketValue?: string;
    captionDonationLabel?: string;
    layout?: BoxLayout;
    onDonationClaimButton?: () => void;
    srcDonationBitmap?: string;
    tags?: string[];
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutDonationContainerItem = ({ captionDonationCreditValue, captionDonationDucketValue, captionDonationLabel, layout, onDonationClaimButton, srcDonationBitmap, tags, visibleDucketIcon }: VaultViewLayoutDonationContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="donation_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="donation_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="donationDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDonationDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="donationCreditValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDonationCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="donation_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="donation_bitmap"
                    tags={[ '#icon' ]}
                    src={srcDonationBitmap ?? layoutImage('vault_earnings_icon_donations.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="donation_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDonationLabel ?? t('earnings.donations.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="donation_claim_button"
                onPointerTap={onDonationClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `bonusbag_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutBonusbagContainerItemProps {
    captionBonusbagCreditValue?: string;
    captionBonusbagDucketValue?: string;
    captionBonusbagLabel?: string;
    captionBonusbagProductValue?: string;
    layout?: BoxLayout;
    onBonusbagClaimButton?: () => void;
    srcBonusbagBitmap?: string;
    srcProductIcon?: string;
    tags?: string[];
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutBonusbagContainerItem = ({ captionBonusbagCreditValue, captionBonusbagDucketValue, captionBonusbagLabel, captionBonusbagProductValue, layout, onBonusbagClaimButton, srcBonusbagBitmap, srcProductIcon, tags, visibleCreditIcon, visibleDucketIcon }: VaultViewLayoutBonusbagContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bonusbag_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="bonusbag_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="bonusbagDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBonusbagDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    visible={visibleCreditIcon ?? false}
                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="34"
                        name="creditIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="bonusbagCreditValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBonusbagCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="bonusbagProductValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBonusbagProductValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <ThemeImage
                    name="productIcon"
                    src={srcProductIcon ?? layoutImage('vault_icon_present.png')}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 6, height: 30 }}
                />
            </Border>
            <Border
                variant="5"
                name="bonusbag_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="bonusbag_bitmap"
                    tags={[ '#icon' ]}
                    src={srcBonusbagBitmap ?? layoutImage('vault_earnings_icon_bonusbag.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="bonusbag_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBonusbagLabel ?? t('earnings.bonusbag.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="bonusbag_claim_button"
                onPointerTap={onBonusbagClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `surprise_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutSurpriseContainerItemProps {
    captionSurpriseCreditValue?: string;
    captionSurpriseDucketValue?: string;
    captionSurpriseLabel?: string;
    layout?: BoxLayout;
    onSurpriseClaimButton?: () => void;
    srcSurpriseBitmap?: string;
    tags?: string[];
}

export const VaultViewLayoutSurpriseContainerItem = ({ captionSurpriseCreditValue, captionSurpriseDucketValue, captionSurpriseLabel, layout, onSurpriseClaimButton, srcSurpriseBitmap, tags }: VaultViewLayoutSurpriseContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="surprise_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="surprise_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Icon
                    variant="32"
                    name="ducketIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="surpriseDucketValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSurpriseDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="surpriseCreditValue"
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSurpriseCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="surprise_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="surprise_bitmap"
                    tags={[ '#icon' ]}
                    src={srcSurpriseBitmap ?? layoutImage('vault_earnings_icon_surprise.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="surprise_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSurpriseLabel ?? t('earnings.surpriseboxes.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="surprise_claim_button"
                onPointerTap={onSurpriseClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `snowstorm_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutSnowstormContainerItemProps {
    captionSnowstormCreditValue?: string;
    captionSnowstormDucketValue?: string;
    captionSnowstormLabel?: string;
    captionSnowstormProductValue?: string;
    layout?: BoxLayout;
    onSnowstormClaimButton?: () => void;
    srcProductIcon?: string;
    srcSnowstormBitmap?: string;
    tags?: string[];
    visibleCreditIcon?: boolean;
}

export const VaultViewLayoutSnowstormContainerItem = ({ captionSnowstormCreditValue, captionSnowstormDucketValue, captionSnowstormLabel, captionSnowstormProductValue, layout, onSnowstormClaimButton, srcProductIcon, srcSnowstormBitmap, tags, visibleCreditIcon }: VaultViewLayoutSnowstormContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="snowstorm_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="snowstorm_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Icon
                    variant="32"
                    name="ducketIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="snowstormDucketValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSnowstormDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    visible={visibleCreditIcon ?? false}
                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="34"
                        name="creditIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="snowstormCreditValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSnowstormCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <ThemeImage
                    name="productIcon"
                    src={srcProductIcon ?? layoutImage('vault_icon_present.png')}
                    layout={{ position: 'absolute', left: 85, width: 30, top: 6, height: 30 }}
                />
                <Region
                    name="snowstormProductValue"
                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSnowstormProductValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="snowstorm_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="snowstorm_bitmap"
                    tags={[ '#icon' ]}
                    src={srcSnowstormBitmap ?? layoutImage('vault_earnings_icon_snowstorm.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                />
                <Region
                    name="snowstorm_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSnowstormLabel ?? t('earnings.snowstorm.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="snowstorm_claim_button"
                onPointerTap={onSnowstormClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Row template `agency_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutAgencyContainerItemProps {
    captionAgencyCreditValue?: string;
    captionAgencyDucketValue?: string;
    captionAgencyLabel?: string;
    layout?: BoxLayout;
    onAgencyClaimButton?: () => void;
    srcAgencyBitmap?: string;
    tags?: string[];
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutAgencyContainerItem = ({ captionAgencyCreditValue, captionAgencyDucketValue, captionAgencyLabel, layout, onAgencyClaimButton, srcAgencyBitmap, tags, visibleDucketIcon }: VaultViewLayoutAgencyContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="agency_container"
            tags={tags}
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="agency_extended_border"
                tintColor="#bec3c1"
                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
            >
                <Region
                    visible={visibleDucketIcon ?? false}
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                >
                    <Icon
                        variant="32"
                        name="ducketIcon"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="agencyDucketValue"
                    visible={false}
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAgencyDucketValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="34"
                    name="creditIcon"
                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                />
                <Region
                    name="agencyCreditValue"
                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAgencyCreditValue ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="5"
                name="agency_border"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
            >
                <ThemeImage
                    name="agency_bitmap"
                    tags={[ '#icon' ]}
                    src={srcAgencyBitmap ?? layoutImage('vault_earnings_icon_rpgs.png')}
                    layout={{ position: 'absolute', left: 1, width: 32, top: 3, height: 32 }}
                />
                <Region
                    name="agency_label"
                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAgencyLabel ?? t('earnings.agency.label')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Button
                variant="3"
                name="agency_claim_button"
                onPointerTap={onAgencyClaimButton}
                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
            >
                {t('earnings.claim.button')}
            </Button>
        </Region>
    );
};

/** Named region `scrolling_earnings_list` of VaultViewLayout - configured through the parent's `scrollingEarningsList` prop. */
export interface VaultViewLayoutScrollingEarningsListProps {
    itemsScrollingEarningsList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const VaultViewLayoutScrollingEarningsList = ({ itemsScrollingEarningsList, layout, tags }: VaultViewLayoutScrollingEarningsListProps) => {
    return (
        <Region
            name="scrolling_earnings_list"
            tags={tags}
            layout={{ position: 'absolute', left: 2, width: 404, top: 5, height: 441, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsScrollingEarningsList ?? (
                <>
                    <VaultViewLayoutDailygiftContainerItem />
                    <VaultViewLayoutGamesContainerItem />
                    <VaultViewLayoutWiredchestContainerItem />
                    <VaultViewLayoutAchievementsContainerItem />
                    <VaultViewLayoutMarketplaceContainerItem />
                    <VaultViewLayoutHabboclubContainerItem />
                    <VaultViewLayoutLevelprogressionContainerItem />
                    <VaultViewLayoutDonationContainerItem />
                    <VaultViewLayoutBonusbagContainerItem />
                    <VaultViewLayoutSurpriseContainerItem />
                    <VaultViewLayoutSnowstormContainerItem />
                    <VaultViewLayoutAgencyContainerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `earningsContentArea` of VaultViewLayout - configured through the parent's `earningsContentArea` prop. */
export interface VaultViewLayoutEarningsContentAreaProps {
    layout?: BoxLayout;
    onClaimAllBtn?: () => void;
    scrollingEarningsList?: VaultViewLayoutScrollingEarningsListProps;
    tags?: string[];
}

export const VaultViewLayoutEarningsContentArea = ({ layout, onClaimAllBtn, scrollingEarningsList, tags }: VaultViewLayoutEarningsContentAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="earningsContentArea"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 404, top: 0, bottom: 45, justifyContent: 'center', ...layout }}
        >
            <VaultViewLayoutScrollingEarningsList {...scrollingEarningsList} />
            <ButtonThick
                variant="3"
                name="claim_all_btn"
                onPointerTap={onClaimAllBtn}
                layout={{ position: 'absolute', marginLeft: -9.5, marginRight: 9.5, width: 73, bottom: 4, height: 30 }}
            >
                {t('earning.claim_all')}
            </ButtonThick>
        </Region>
    );
};
