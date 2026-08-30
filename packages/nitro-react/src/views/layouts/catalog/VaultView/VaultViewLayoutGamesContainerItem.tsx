import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `games_container` of VaultViewLayout - pass real rows through its `items…` slot. */
export interface VaultViewLayoutGamesContainerItemProps {
    captionGamesCreditValue?: string;
    captionGamesDucketValue?: string;
    captionGamesLabel?: string;
    layout?: BoxLayout;
    onGamesClaimButton?: () => void;
    srcGamesBitmap?: string;
    visibleCreditIcon?: boolean;
    visibleDucketIcon?: boolean;
    visibleGamesBitmap?: boolean;
    visibleGamesBorder?: boolean;
    visibleGamesClaimButton?: boolean;
    visibleGamesCreditValue?: boolean;
    visibleGamesDucketValue?: boolean;
    visibleGamesExtendedBorder?: boolean;
    visibleGamesLabel?: boolean;
}

export const VaultViewLayoutGamesContainerItem = ({ captionGamesCreditValue, captionGamesDucketValue, captionGamesLabel, layout, onGamesClaimButton, srcGamesBitmap, visibleCreditIcon, visibleDucketIcon, visibleGamesBitmap, visibleGamesBorder, visibleGamesClaimButton, visibleGamesCreditValue, visibleGamesDucketValue, visibleGamesExtendedBorder, visibleGamesLabel }: VaultViewLayoutGamesContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="games_container"
            layout={{ width: 404, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleGamesExtendedBorder ?? true) && (
                <Border
                    variant="3"
                    name="games_extended_border"
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
                    {(visibleGamesDucketValue ?? false) && (
                        <ThemeText
                            text={captionGamesDucketValue ?? '0'}
                            textStyle="text-style-u-bold"
                            name="gamesDucketValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleCreditIcon ?? true) && (
                        <Icon
                            variant="34"
                            name="creditIcon"
                            layout={{ position: 'absolute', left: 15, width: 30, top: 7, height: 30 }}
                        />
                    )}
                    {(visibleGamesCreditValue ?? true) && (
                        <ThemeText
                            text={captionGamesCreditValue ?? '0'}
                            textStyle="text-style-u-bold"
                            name="gamesCreditValue"
                            layout={{ position: 'absolute', left: 40, width: 40, top: 7, height: 30 }}
                        />
                    )}
                </Border>
            )}
            {(visibleGamesBorder ?? true) && (
                <Border
                    variant="5"
                    name="games_border"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                >
                    {(visibleGamesBitmap ?? true) && (
                        <ThemeImage
                            name="games_bitmap"
                            src={srcGamesBitmap ?? layoutImage('vault_earnings_icon_games.png')}
                            layout={{ position: 'absolute', left: 1, width: 32, top: 1, height: 32 }}
                        />
                    )}
                    {(visibleGamesLabel ?? true) && (
                        <ThemeText
                            text={captionGamesLabel ?? t('earnings.games.label')}
                            textStyle="text-style-u-bold"
                            name="games_label"
                            layout={{ position: 'absolute', left: 34, width: 160, top: 8, height: 30 }}
                        />
                    )}
                </Border>
            )}
            {(visibleGamesClaimButton ?? true) && (
                <Button
                    variant="3"
                    name="games_claim_button"
                    onPointerTap={onGamesClaimButton}
                    layout={{ position: 'absolute', left: 339, width: 60, top: 4, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('earnings.claim.button')}
                </Button>
            )}
        </Region>
    );
};
