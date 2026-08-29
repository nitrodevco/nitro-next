import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `levelprogression_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutLevelprogressionContainerItemProps {
    captionLevelprogressionCreditValue?: string;
    captionLevelprogressionDucketValue?: string;
    captionLevelprogressionLabel?: string;
    layout?: BoxLayout;
    onLevelprogressionClaimButton?: () => void;
    srcLevelprogressionBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleLevelprogressionBitmap?: boolean;
    visibleLevelprogressionBorder?: boolean;
    visibleLevelprogressionClaimButton?: boolean;
    visibleLevelprogressionCreditValue?: boolean;
    visibleLevelprogressionDucketValue?: boolean;
    visibleLevelprogressionExtendedBorder?: boolean;
    visibleLevelprogressionLabel?: boolean;
}

export const VaultViewLayoutLevelprogressionContainerItem = ({ captionLevelprogressionCreditValue, captionLevelprogressionDucketValue, captionLevelprogressionLabel, layout, onLevelprogressionClaimButton, srcLevelprogressionBitmap, visibleCreditIcon, visibleDucketIcon, visibleLevelprogressionBitmap, visibleLevelprogressionBorder, visibleLevelprogressionClaimButton, visibleLevelprogressionCreditValue, visibleLevelprogressionDucketValue, visibleLevelprogressionExtendedBorder, visibleLevelprogressionLabel }: VaultViewLayoutLevelprogressionContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="levelprogression_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleLevelprogressionExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="levelprogression_extended_border"
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
                    {(visibleLevelprogressionDucketValue ?? true) && (
                        <Region
                            name="levelprogressionDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionLevelprogressionDucketValue ?? '0'}
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
                    {(visibleLevelprogressionCreditValue ?? true) && (
                        <Region
                            name="levelprogressionCreditValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionLevelprogressionCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleLevelprogressionBorder ?? true) && (
                <Border
                    variant="5"
                    name="levelprogression_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleLevelprogressionBitmap ?? true) && (
                        <ThemeImage
                            name="levelprogression_bitmap"
                            src={srcLevelprogressionBitmap ?? layoutImage('vault_earnings_icon_levelprogression.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleLevelprogressionLabel ?? true) && (
                        <Region
                            name="levelprogression_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionLevelprogressionLabel ?? t('earnings.levelprogression.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleLevelprogressionClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="levelprogression_claim_button"
                    onPointerTap={onLevelprogressionClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
