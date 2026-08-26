import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1540_vault_view_xml` (layout "vault_view", 422x536) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VaultViewLayoutProps {
    layout?: BoxLayout;
    onAchievementsClaimButton?: () => void;
    onAgencyClaimButton?: () => void;
    onBonusbagClaimButton?: () => void;
    onClaimAllBtn?: () => void;
    onClose?: () => void;
    onDailygiftClaimButton?: () => void;
    onDonationClaimButton?: () => void;
    onGamesClaimButton?: () => void;
    onHabboclubClaimButton?: () => void;
    onLevelprogressionClaimButton?: () => void;
    onMarketplaceClaimButton?: () => void;
    onSnowstormClaimButton?: () => void;
    onSurpriseClaimButton?: () => void;
    onWiredchestClaimButton?: () => void;
}

export const VaultViewLayout = ({ layout, onAchievementsClaimButton, onAgencyClaimButton, onBonusbagClaimButton, onClaimAllBtn, onClose, onDailygiftClaimButton, onDonationClaimButton, onGamesClaimButton, onHabboclubClaimButton, onLevelprogressionClaimButton, onMarketplaceClaimButton, onSnowstormClaimButton, onSurpriseClaimButton, onWiredchestClaimButton }: VaultViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="VaultBase"
            name="VaultBase"
            params={32769}
            caption={t('earnings.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 422, height: 536, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="earningsContentArea"
                    params={8390672}
                    layout={{ position: 'absolute', left: 1, width: 404, top: 0, height: 491 }}
                >
                    <Region
                        name="scrolling_earnings_list"
                        params={8388624}
                        layout={{ position: 'absolute', left: 2, width: 404, top: 5, height: 441, flexDirection: 'column', gap: 3 }}
                    >
                        <Region
                            name="dailygift_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="dailygift_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Icon
                                    variant="32"
                                    name="ducketIcon"
                                    params={147472}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="dailygiftDucketValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="34"
                                        name="creditIcon"
                                        params={16}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="dailygiftCreditValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="dailygift_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="dailygift_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_dailygift.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="dailygift_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.dailygift.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="dailygift_claim_button"
                                params={131089}
                                onPointerTap={onDailygiftClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="games_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="games_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="gamesDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="gamesCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="games_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="games_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_games.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="games_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.games.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="games_claim_button"
                                params={131089}
                                onPointerTap={onGamesClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="wiredchest_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="wiredchest_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="wiredchestDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="wiredchestCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="wiredchest_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="wiredchest_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_chests.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 2, height: 32 }}
                                />
                                <Region
                                    name="wiredchest_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.wiredchest.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="wiredchest_claim_button"
                                params={131089}
                                onPointerTap={onWiredchestClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="achievements_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="achievements_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Icon
                                    variant="32"
                                    name="ducketIcon"
                                    params={147472}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="achievementsDucketValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="achievementsCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="achievements_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="achievements_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_achievements.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="achievements_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.achievements.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="achievements_claim_button"
                                params={131089}
                                onPointerTap={onAchievementsClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="marketplace_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="marketplace_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="marketplaceDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="marketplaceCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="marketplace_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="marketplace_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_marketplace.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="marketplace_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.marketplace.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="marketplace_claim_button"
                                params={131089}
                                onPointerTap={onMarketplaceClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="habboclub_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="habboclub_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="habboclubDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="habboclubCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="habboclub_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="habboclub_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_hcpayday.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="habboclub_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.hc.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="habboclub_claim_button"
                                params={131089}
                                onPointerTap={onHabboclubClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="levelprogression_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="levelprogression_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Icon
                                    variant="32"
                                    name="ducketIcon"
                                    params={147472}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="levelprogressionDucketValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="levelprogressionCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="levelprogression_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="levelprogression_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_levelprogression.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="levelprogression_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.levelprogression.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="levelprogression_claim_button"
                                params={131089}
                                onPointerTap={onLevelprogressionClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="donation_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="donation_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="donationDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="donationCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="donation_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="donation_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_donations.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="donation_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.donations.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="donation_claim_button"
                                params={131089}
                                onPointerTap={onDonationClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="bonusbag_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="bonusbag_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="bonusbagDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="34"
                                        name="creditIcon"
                                        params={16}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="bonusbagCreditValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="bonusbagProductValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <ThemeImage
                                    name="productIcon"
                                    params={16}
                                    src={layoutImage('vault_icon_present.png')}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 6, height: 30 }}
                                />
                            </Border>
                            <Border
                                variant="5"
                                name="bonusbag_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="bonusbag_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_bonusbag.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="bonusbag_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.bonusbag.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="bonusbag_claim_button"
                                params={131089}
                                onPointerTap={onBonusbagClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="surprise_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="surprise_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Icon
                                    variant="32"
                                    name="ducketIcon"
                                    params={147472}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="surpriseDucketValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="surpriseCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="surprise_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="surprise_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_surprise.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="surprise_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.surpriseboxes.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="surprise_claim_button"
                                params={131089}
                                onPointerTap={onSurpriseClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="snowstorm_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="snowstorm_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Icon
                                    variant="32"
                                    name="ducketIcon"
                                    params={147472}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="snowstormDucketValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="34"
                                        name="creditIcon"
                                        params={16}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="snowstormCreditValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <ThemeImage
                                    name="productIcon"
                                    params={16}
                                    src={layoutImage('vault_icon_present.png')}
                                    layout={{ position: 'absolute', left: 85, width: 30, top: 6, height: 30 }}
                                />
                                <Region
                                    name="snowstormProductValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="snowstorm_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="snowstorm_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_snowstorm.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                                />
                                <Region
                                    name="snowstorm_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.snowstorm.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="snowstorm_claim_button"
                                params={131089}
                                onPointerTap={onSnowstormClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                        <Region
                            name="agency_container"
                            params={16}
                            layout={{ width: 404, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="agency_extended_border"
                                params={16}
                                tintColor="#bec3c1"
                                layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                            >
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                >
                                    <Icon
                                        variant="32"
                                        name="ducketIcon"
                                        params={147472}
                                        layout={{ width: '100%', height: '100%' }}
                                    />
                                </Region>
                                <Region
                                    name="agencyDucketValue"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Icon
                                    variant="34"
                                    name="creditIcon"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                                />
                                <Region
                                    name="agencyCreditValue"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="5"
                                name="agency_border"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                            >
                                <ThemeImage
                                    name="agency_bitmap"
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('vault_earnings_icon_rpgs.png')}
                                    layout={{ position: 'absolute', left: 1, width: 32, top: 3, height: 32 }}
                                />
                                <Region
                                    name="agency_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('earnings.agency.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                            </Border>
                            <Button
                                variant="3"
                                name="agency_claim_button"
                                params={131089}
                                onPointerTap={onAgencyClaimButton}
                                layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                            >
                                {t('earnings.claim.button')}
                            </Button>
                        </Region>
                    </Region>
                    <ButtonThick
                        variant="3"
                        name="claim_all_btn"
                        params={918545}
                        onPointerTap={onClaimAllBtn}
                        layout={{ position: 'absolute', left: 156, width: 73, top: 457, height: 30 }}
                    >
                        {t('earning.claim_all')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
