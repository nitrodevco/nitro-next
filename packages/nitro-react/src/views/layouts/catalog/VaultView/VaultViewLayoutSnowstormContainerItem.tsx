import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleProductIcon?: boolean;
    visibleSnowstormBitmap?: boolean;
    visibleSnowstormBorder?: boolean;
    visibleSnowstormClaimButton?: boolean;
    visibleSnowstormCreditValue?: boolean;
    visibleSnowstormDucketValue?: boolean;
    visibleSnowstormExtendedBorder?: boolean;
    visibleSnowstormLabel?: boolean;
    visibleSnowstormProductValue?: boolean;
}

export const VaultViewLayoutSnowstormContainerItem = ({ captionSnowstormCreditValue, captionSnowstormDucketValue, captionSnowstormLabel, captionSnowstormProductValue, layout, onSnowstormClaimButton, srcProductIcon, srcSnowstormBitmap, visibleCreditIcon, visibleDucketIcon, visibleProductIcon, visibleSnowstormBitmap, visibleSnowstormBorder, visibleSnowstormClaimButton, visibleSnowstormCreditValue, visibleSnowstormDucketValue, visibleSnowstormExtendedBorder, visibleSnowstormLabel, visibleSnowstormProductValue }: VaultViewLayoutSnowstormContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="snowstorm_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleSnowstormExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="snowstorm_extended_border"
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
                    {(visibleSnowstormDucketValue ?? true) && (
                        <Region
                            name="snowstormDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSnowstormDucketValue ?? '0'}
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
                    {(visibleSnowstormCreditValue ?? false) && (
                        <Region
                            name="snowstormCreditValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSnowstormCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                    {(visibleProductIcon ?? true) && (
                        <ThemeImage
                            name="productIcon"
                            src={srcProductIcon ?? layoutImage('vault_icon_present.png')}
                            layout={{ position: 'absolute', left: 85, width: 30, top: 6, height: 30 }}
                        />
                    )}
                    {(visibleSnowstormProductValue ?? true) && (
                        <Region
                            name="snowstormProductValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSnowstormProductValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleSnowstormBorder ?? true) && (
                <Border
                    variant="5"
                    name="snowstorm_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleSnowstormBitmap ?? true) && (
                        <ThemeImage
                            name="snowstorm_bitmap"
                            src={srcSnowstormBitmap ?? layoutImage('vault_earnings_icon_snowstorm.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleSnowstormLabel ?? true) && (
                        <Region
                            name="snowstorm_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSnowstormLabel ?? t('earnings.snowstorm.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleSnowstormClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="snowstorm_claim_button"
                    onPointerTap={onSnowstormClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
