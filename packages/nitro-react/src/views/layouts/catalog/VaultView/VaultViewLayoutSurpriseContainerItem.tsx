import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `surprise_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutSurpriseContainerItemProps {
    captionSurpriseCreditValue?: string;
    captionSurpriseDucketValue?: string;
    captionSurpriseLabel?: string;
    layout?: BoxLayout;
    onSurpriseClaimButton?: () => void;
    srcSurpriseBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleSurpriseBitmap?: boolean;
    visibleSurpriseBorder?: boolean;
    visibleSurpriseClaimButton?: boolean;
    visibleSurpriseCreditValue?: boolean;
    visibleSurpriseDucketValue?: boolean;
    visibleSurpriseExtendedBorder?: boolean;
    visibleSurpriseLabel?: boolean;
}

export const VaultViewLayoutSurpriseContainerItem = ({ captionSurpriseCreditValue, captionSurpriseDucketValue, captionSurpriseLabel, layout, onSurpriseClaimButton, srcSurpriseBitmap, visibleCreditIcon, visibleDucketIcon, visibleSurpriseBitmap, visibleSurpriseBorder, visibleSurpriseClaimButton, visibleSurpriseCreditValue, visibleSurpriseDucketValue, visibleSurpriseExtendedBorder, visibleSurpriseLabel }: VaultViewLayoutSurpriseContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="surprise_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleSurpriseExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="surprise_extended_border"
                    tintColor="#bec3c1"
                    layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                >
                    {(visibleDucketIcon ?? true) && (
                        <Icon
                            variant="32"
                            name="ducketIcon"
                            layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleSurpriseDucketValue ?? true) && (
                        <Region
                            name="surpriseDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSurpriseDucketValue ?? '0'}
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
                    {(visibleSurpriseCreditValue ?? true) && (
                        <Region
                            name="surpriseCreditValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSurpriseCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleSurpriseBorder ?? true) && (
                <Border
                    variant="5"
                    name="surprise_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                >
                    {(visibleSurpriseBitmap ?? true) && (
                        <ThemeImage
                            name="surprise_bitmap"
                            src={srcSurpriseBitmap ?? layoutImage('vault_earnings_icon_surprise.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleSurpriseLabel ?? true) && (
                        <Region
                            name="surprise_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSurpriseLabel ?? t('earnings.surpriseboxes.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleSurpriseClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="surprise_claim_button"
                    onPointerTap={onSurpriseClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
