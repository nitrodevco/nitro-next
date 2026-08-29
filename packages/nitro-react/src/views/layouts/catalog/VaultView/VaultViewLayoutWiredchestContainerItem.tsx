import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `wiredchest_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutWiredchestContainerItemProps {
    captionWiredchestCreditValue?: string;
    captionWiredchestDucketValue?: string;
    captionWiredchestLabel?: string;
    layout?: BoxLayout;
    onWiredchestClaimButton?: () => void;
    srcWiredchestBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleWiredchestBitmap?: boolean;
    visibleWiredchestBorder?: boolean;
    visibleWiredchestClaimButton?: boolean;
    visibleWiredchestCreditValue?: boolean;
    visibleWiredchestDucketValue?: boolean;
    visibleWiredchestExtendedBorder?: boolean;
    visibleWiredchestLabel?: boolean;
}

export const VaultViewLayoutWiredchestContainerItem = ({ captionWiredchestCreditValue, captionWiredchestDucketValue, captionWiredchestLabel, layout, onWiredchestClaimButton, srcWiredchestBitmap, visibleCreditIcon, visibleDucketIcon, visibleWiredchestBitmap, visibleWiredchestBorder, visibleWiredchestClaimButton, visibleWiredchestCreditValue, visibleWiredchestDucketValue, visibleWiredchestExtendedBorder, visibleWiredchestLabel }: VaultViewLayoutWiredchestContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wiredchest_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleWiredchestExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="wiredchest_extended_border"
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
                    {(visibleWiredchestDucketValue ?? false) && (
                        <Region
                            name="wiredchestDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionWiredchestDucketValue ?? '0'}
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
                    {(visibleWiredchestCreditValue ?? true) && (
                        <Region
                            name="wiredchestCreditValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionWiredchestCreditValue ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleWiredchestBorder ?? true) && (
                <Border
                    variant="5"
                    name="wiredchest_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 34 }}
                >
                    {(visibleWiredchestBitmap ?? true) && (
                        <ThemeImage
                            name="wiredchest_bitmap"
                            src={srcWiredchestBitmap ?? layoutImage('vault_earnings_icon_chests.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 2, height: 32 }}
                        />
                    )}
                    {(visibleWiredchestLabel ?? true) && (
                        <Region
                            name="wiredchest_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionWiredchestLabel ?? t('earnings.wiredchest.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleWiredchestClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="wiredchest_claim_button"
                    onPointerTap={onWiredchestClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
