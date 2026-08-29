import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `agency_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutAgencyContainerItemProps {
    captionAgencyCreditValue?: string;
    captionAgencyDucketValue?: string;
    captionAgencyLabel?: string;
    layout?: BoxLayout;
    onAgencyClaimButton?: () => void;
    srcAgencyBitmap?: string;
    visibleAgencyBitmap?: boolean;
    visibleAgencyBorder?: boolean;
    visibleAgencyClaimButton?: boolean;
    visibleAgencyCreditValue?: boolean;
    visibleAgencyDucketValue?: boolean;
    visibleAgencyExtendedBorder?: boolean;
    visibleAgencyLabel?: boolean;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutAgencyContainerItem = ({ captionAgencyCreditValue, captionAgencyDucketValue, captionAgencyLabel, layout, onAgencyClaimButton, srcAgencyBitmap, visibleAgencyBitmap, visibleAgencyBorder, visibleAgencyClaimButton, visibleAgencyCreditValue, visibleAgencyDucketValue, visibleAgencyExtendedBorder, visibleAgencyLabel, visibleCreditIcon, visibleDucketIcon }: VaultViewLayoutAgencyContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="agency_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleAgencyExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="agency_extended_border"
                    tintColor="#bec3c1"
                    layout={{ position: 'absolute', left: 179, width: 223, top: 0, height: 34 }}
                >
                    {(visibleDucketIcon ?? false) && (
                        <Icon
                            variant="32"
                            name="ducketIcon"
                            layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleAgencyDucketValue ?? false) && (
                        <Region
                            name="agencyDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAgencyDucketValue ?? '0'}
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
                    {(visibleAgencyCreditValue ?? true) && (
                        <Region
                            name="agencyCreditValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAgencyCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleAgencyBorder ?? true) && (
                <Border
                    variant="5"
                    name="agency_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                >
                    {(visibleAgencyBitmap ?? true) && (
                        <ThemeImage
                            name="agency_bitmap"
                            src={srcAgencyBitmap ?? layoutImage('vault_earnings_icon_rpgs.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 3, height: 32 }}
                        />
                    )}
                    {(visibleAgencyLabel ?? true) && (
                        <Region
                            name="agency_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAgencyLabel ?? t('earnings.agency.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleAgencyClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="agency_claim_button"
                    onPointerTap={onAgencyClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
