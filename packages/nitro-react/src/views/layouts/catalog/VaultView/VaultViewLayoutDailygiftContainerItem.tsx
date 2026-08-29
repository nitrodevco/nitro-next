import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `dailygift_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutDailygiftContainerItemProps {
    captionDailygiftCreditValue?: string;
    captionDailygiftDucketValue?: string;
    captionDailygiftLabel?: string;
    layout?: BoxLayout;
    onDailygiftClaimButton?: () => void;
    srcDailygiftBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDailygiftBitmap?: boolean;
    visibleDailygiftBorder?: boolean;
    visibleDailygiftClaimButton?: boolean;
    visibleDailygiftCreditValue?: boolean;
    visibleDailygiftDucketValue?: boolean;
    visibleDailygiftExtendedBorder?: boolean;
    visibleDailygiftLabel?: boolean;
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutDailygiftContainerItem = ({ captionDailygiftCreditValue, captionDailygiftDucketValue, captionDailygiftLabel, layout, onDailygiftClaimButton, srcDailygiftBitmap, visibleCreditIcon, visibleDailygiftBitmap, visibleDailygiftBorder, visibleDailygiftClaimButton, visibleDailygiftCreditValue, visibleDailygiftDucketValue, visibleDailygiftExtendedBorder, visibleDailygiftLabel, visibleDucketIcon }: VaultViewLayoutDailygiftContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dailygift_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleDailygiftExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="dailygift_extended_border"
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
                    {(visibleDailygiftDucketValue ?? true) && (
                        <Region
                            name="dailygiftDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDailygiftDucketValue ?? '0'}
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
                    {(visibleDailygiftCreditValue ?? false) && (
                        <Region
                            name="dailygiftCreditValue"
                            layout={{ position: 'absolute', left: 110, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDailygiftCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleDailygiftBorder ?? true) && (
                <Border
                    variant="5"
                    name="dailygift_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleDailygiftBitmap ?? true) && (
                        <ThemeImage
                            name="dailygift_bitmap"
                            src={srcDailygiftBitmap ?? layoutImage('vault_earnings_icon_dailygift.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleDailygiftLabel ?? true) && (
                        <Region
                            name="dailygift_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDailygiftLabel ?? t('earnings.dailygift.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleDailygiftClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="dailygift_claim_button"
                    onPointerTap={onDailygiftClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
