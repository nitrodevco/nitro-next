import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `donation_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutDonationContainerItemProps {
    captionDonationCreditValue?: string;
    captionDonationDucketValue?: string;
    captionDonationLabel?: string;
    layout?: BoxLayout;
    onDonationClaimButton?: () => void;
    srcDonationBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDonationBitmap?: boolean;
    visibleDonationBorder?: boolean;
    visibleDonationClaimButton?: boolean;
    visibleDonationCreditValue?: boolean;
    visibleDonationDucketValue?: boolean;
    visibleDonationExtendedBorder?: boolean;
    visibleDonationLabel?: boolean;
    visibleDucketIcon?: boolean;
}

export const VaultViewLayoutDonationContainerItem = ({ captionDonationCreditValue, captionDonationDucketValue, captionDonationLabel, layout, onDonationClaimButton, srcDonationBitmap, visibleCreditIcon, visibleDonationBitmap, visibleDonationBorder, visibleDonationClaimButton, visibleDonationCreditValue, visibleDonationDucketValue, visibleDonationExtendedBorder, visibleDonationLabel, visibleDucketIcon }: VaultViewLayoutDonationContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="donation_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleDonationExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="donation_extended_border"
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
                    {(visibleDonationDucketValue ?? false) && (
                        <Region
                            name="donationDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDonationDucketValue ?? '0'}
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
                    {(visibleDonationCreditValue ?? true) && (
                        <Region
                            name="donationCreditValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDonationCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleDonationBorder ?? true) && (
                <Border
                    variant="5"
                    name="donation_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleDonationBitmap ?? true) && (
                        <ThemeImage
                            name="donation_bitmap"
                            src={srcDonationBitmap ?? layoutImage('vault_earnings_icon_donations.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleDonationLabel ?? true) && (
                        <Region
                            name="donation_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDonationLabel ?? t('earnings.donations.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleDonationClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="donation_claim_button"
                    onPointerTap={onDonationClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
