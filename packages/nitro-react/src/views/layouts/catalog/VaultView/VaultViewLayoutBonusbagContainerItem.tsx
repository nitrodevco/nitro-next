import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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
    visibleBonusbagBitmap?: boolean;
    visibleBonusbagBorder?: boolean;
    visibleBonusbagClaimButton?: boolean;
    visibleBonusbagCreditValue?: boolean;
    visibleBonusbagDucketValue?: boolean;
    visibleBonusbagExtendedBorder?: boolean;
    visibleBonusbagLabel?: boolean;
    visibleBonusbagProductValue?: boolean;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleProductIcon?: boolean;
}

export const VaultViewLayoutBonusbagContainerItem = ({ captionBonusbagCreditValue, captionBonusbagDucketValue, captionBonusbagLabel, captionBonusbagProductValue, layout, onBonusbagClaimButton, srcBonusbagBitmap, srcProductIcon, visibleBonusbagBitmap, visibleBonusbagBorder, visibleBonusbagClaimButton, visibleBonusbagCreditValue, visibleBonusbagDucketValue, visibleBonusbagExtendedBorder, visibleBonusbagLabel, visibleBonusbagProductValue, visibleCreditIcon, visibleDucketIcon, visibleProductIcon }: VaultViewLayoutBonusbagContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bonusbag_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleBonusbagExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="bonusbag_extended_border"
                    tintColor="#bec3c1"
                    layout={{ position: 'absolute', left: 179, width: 223, top: 0, bottom: 0 }}
                >
                    {(visibleDucketIcon ?? false) && (
                        <Icon
                            variant="32"
                            name="ducketIcon"
                            layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleBonusbagDucketValue ?? false) && (
                        <Region
                            name="bonusbagDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBonusbagDucketValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                    {(visibleCreditIcon ?? false) && (
                        <Icon
                            variant="34"
                            name="creditIcon"
                            layout={{ position: 'absolute', left: 85, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleBonusbagCreditValue ?? false) && (
                        <Region
                            name="bonusbagCreditValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBonusbagCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                    {(visibleBonusbagProductValue ?? true) && (
                        <Region
                            name="bonusbagProductValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBonusbagProductValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                    {(visibleProductIcon ?? true) && (
                        <ThemeImage
                            name="productIcon"
                            src={srcProductIcon ?? layoutImage('vault_icon_present.png')}
                            layout={{ position: 'absolute', left: 15, width: 30, top: 6, height: 30 }}
                        />
                    )}
                </Border>
            )}
            {(visibleBonusbagBorder ?? true) && (
                <Border
                    variant="5"
                    name="bonusbag_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleBonusbagBitmap ?? true) && (
                        <ThemeImage
                            name="bonusbag_bitmap"
                            src={srcBonusbagBitmap ?? layoutImage('vault_earnings_icon_bonusbag.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleBonusbagLabel ?? true) && (
                        <Region
                            name="bonusbag_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBonusbagLabel ?? t('earnings.bonusbag.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleBonusbagClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="bonusbag_claim_button"
                    onPointerTap={onBonusbagClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
