import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `raffle_container` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutRaffleContainerItemProps {
    captionRaffleText?: string;
    layout?: BoxLayout;
    visibleRaffleText?: boolean;
}

export const PurchaseConfirmationLayoutRaffleContainerItem = ({ captionRaffleText, layout, visibleRaffleText }: PurchaseConfirmationLayoutRaffleContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="raffle_container"
            layout={{ width: 304, height: 49, flexShrink: 0, ...layout }}
        >
            <Border
                variant="4"
                tintColor="#ebf9fc"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {(visibleRaffleText ?? true) && (
                    <Region
                        name="raffle_text"
                        layout={{ position: 'absolute', left: 10, width: 233, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRaffleText ?? t('catalog.purchase.confirmation.dialog.raffling')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 233 }}
                        />
                    </Region>
                )}
            </Border>
            <ThemeImage
                src={layoutImage('unique_item_large_tile_upright.png')}
                layout={{ position: 'absolute', left: 260, width: 34, top: 6, height: 37 }}
            />
        </Region>
    );
};
