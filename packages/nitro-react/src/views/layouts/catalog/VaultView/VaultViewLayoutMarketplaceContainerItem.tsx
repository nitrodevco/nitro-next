import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `marketplace_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutMarketplaceContainerItemProps {
    captionMarketplaceCreditValue?: string;
    captionMarketplaceDucketValue?: string;
    captionMarketplaceLabel?: string;
    layout?: BoxLayout;
    onMarketplaceClaimButton?: () => void;
    srcMarketplaceBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleMarketplaceBitmap?: boolean;
    visibleMarketplaceBorder?: boolean;
    visibleMarketplaceClaimButton?: boolean;
    visibleMarketplaceCreditValue?: boolean;
    visibleMarketplaceDucketValue?: boolean;
    visibleMarketplaceExtendedBorder?: boolean;
    visibleMarketplaceLabel?: boolean;
}

export const VaultViewLayoutMarketplaceContainerItem = ({ captionMarketplaceCreditValue, captionMarketplaceDucketValue, captionMarketplaceLabel, layout, onMarketplaceClaimButton, srcMarketplaceBitmap, visibleCreditIcon, visibleDucketIcon, visibleMarketplaceBitmap, visibleMarketplaceBorder, visibleMarketplaceClaimButton, visibleMarketplaceCreditValue, visibleMarketplaceDucketValue, visibleMarketplaceExtendedBorder, visibleMarketplaceLabel }: VaultViewLayoutMarketplaceContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketplace_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleMarketplaceExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="marketplace_extended_border"
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
                    {(visibleMarketplaceDucketValue ?? false) && (
                        <Region
                            name="marketplaceDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMarketplaceDucketValue ?? '0'}
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
                    {(visibleMarketplaceCreditValue ?? true) && (
                        <Region
                            name="marketplaceCreditValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMarketplaceCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleMarketplaceBorder ?? true) && (
                <Border
                    variant="5"
                    name="marketplace_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                >
                    {(visibleMarketplaceBitmap ?? true) && (
                        <ThemeImage
                            name="marketplace_bitmap"
                            src={srcMarketplaceBitmap ?? layoutImage('vault_earnings_icon_marketplace.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleMarketplaceLabel ?? true) && (
                        <Region
                            name="marketplace_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMarketplaceLabel ?? t('earnings.marketplace.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleMarketplaceClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="marketplace_claim_button"
                    onPointerTap={onMarketplaceClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
