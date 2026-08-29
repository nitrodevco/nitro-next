import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `habboclub_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutHabboclubContainerItemProps {
    captionHabboclubCreditValue?: string;
    captionHabboclubDucketValue?: string;
    captionHabboclubLabel?: string;
    layout?: BoxLayout;
    onHabboclubClaimButton?: () => void;
    srcHabboclubBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleHabboclubBitmap?: boolean;
    visibleHabboclubBorder?: boolean;
    visibleHabboclubClaimButton?: boolean;
    visibleHabboclubCreditValue?: boolean;
    visibleHabboclubDucketValue?: boolean;
    visibleHabboclubExtendedBorder?: boolean;
    visibleHabboclubLabel?: boolean;
}

export const VaultViewLayoutHabboclubContainerItem = ({ captionHabboclubCreditValue, captionHabboclubDucketValue, captionHabboclubLabel, layout, onHabboclubClaimButton, srcHabboclubBitmap, visibleCreditIcon, visibleDucketIcon, visibleHabboclubBitmap, visibleHabboclubBorder, visibleHabboclubClaimButton, visibleHabboclubCreditValue, visibleHabboclubDucketValue, visibleHabboclubExtendedBorder, visibleHabboclubLabel }: VaultViewLayoutHabboclubContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habboclub_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleHabboclubExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="habboclub_extended_border"
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
                    {(visibleHabboclubDucketValue ?? false) && (
                        <Region
                            name="habboclubDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionHabboclubDucketValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                    {(visibleCreditIcon ?? true) && (
                        <Icon
                            variant="34"
                            name="creditIcon"
                            layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleHabboclubCreditValue ?? true) && (
                        <Region
                            name="habboclubCreditValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionHabboclubCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleHabboclubBorder ?? true) && (
                <Border
                    variant="5"
                    name="habboclub_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleHabboclubBitmap ?? true) && (
                        <ThemeImage
                            name="habboclub_bitmap"
                            src={srcHabboclubBitmap ?? layoutImage('vault_earnings_icon_hcpayday.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleHabboclubLabel ?? true) && (
                        <Region
                            name="habboclub_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionHabboclubLabel ?? t('earnings.hc.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleHabboclubClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="habboclub_claim_button"
                    onPointerTap={onHabboclubClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
