import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `achievements_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutAchievementsContainerItemProps {
    captionAchievementsCreditValue?: string;
    captionAchievementsDucketValue?: string;
    captionAchievementsLabel?: string;
    layout?: BoxLayout;
    onAchievementsClaimButton?: () => void;
    srcAchievementsBitmap?: string;
    visibleAchievementsBitmap?: boolean;
    visibleAchievementsBorder?: boolean;
    visibleAchievementsClaimButton?: boolean;
    visibleAchievementsCreditValue?: boolean;
    visibleAchievementsDucketValue?: boolean;
    visibleAchievementsExtendedBorder?: boolean;
    visibleAchievementsLabel?: boolean;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutAchievementsContainerItem = ({ captionAchievementsCreditValue, captionAchievementsDucketValue, captionAchievementsLabel, layout, onAchievementsClaimButton, srcAchievementsBitmap, visibleAchievementsBitmap, visibleAchievementsBorder, visibleAchievementsClaimButton, visibleAchievementsCreditValue, visibleAchievementsDucketValue, visibleAchievementsExtendedBorder, visibleAchievementsLabel, visibleCreditIcon, visibleDucketIcon }: VaultViewLayoutAchievementsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleAchievementsExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="achievements_extended_border"
                    tintColor="#bec3c1"
                    layout={{ position: 'absolute', left: 179, width: 223, top: 0, bottom: 0 }}
                >
                    {(visibleDucketIcon ?? true) && (
                        <Icon
                            variant="32"
                            name="ducketIcon"
                            layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleAchievementsDucketValue ?? true) && (
                        <Region
                            name="achievementsDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAchievementsDucketValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                    {(visibleCreditIcon ?? true) && (
                        <Icon
                            variant="34"
                            name="creditIcon"
                            layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleAchievementsCreditValue ?? true) && (
                        <Region
                            name="achievementsCreditValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAchievementsCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleAchievementsBorder ?? true) && (
                <Border
                    variant="5"
                    name="achievements_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleAchievementsBitmap ?? true) && (
                        <ThemeImage
                            name="achievements_bitmap"
                            src={srcAchievementsBitmap ?? layoutImage('vault_earnings_icon_achievements.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleAchievementsLabel ?? true) && (
                        <Region
                            name="achievements_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAchievementsLabel ?? t('earnings.achievements.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleAchievementsClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="achievements_claim_button"
                    onPointerTap={onAchievementsClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
