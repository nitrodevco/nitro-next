import { useTranslation } from '#base/context/system';
import { TargetedOfferDialogModel } from '#base/hooks';
import { Border, ButtonThick, Region, TextInput, ThemeText } from '#base/theme';

export interface TargetedOfferDialogButtonBarProps {
    model: TargetedOfferDialogModel;
    /** The container's place in the frame's content: 15, 316 in the dialog, 55, 366 in the variation. */
    left: number;
    top: number;
}

/**
 * The 540x70 container both targeted offer dialog layouts end in (`targeted_offer_dialog.xml`,
 * `targeted_offer_dialog_variation.xml` - the same elements at another place): `txt_status`
 * (`u_bold` 16, centred) over `itemlist_buttonbar`, a horizontal list 10 apart that sizes to its
 * items and stays centred in the container (`resize_to_accommodate_children` +
 * `on_accommodate_align_center`, its centre half a pixel right of the container's).
 *
 * Its items are `cnt_quantity` (the grey `catalog.bundlewidget.quantity` label and a style 0 border
 * round the digits-only `quantity_input`), `btn_get_credits` (189 wide) and `btn_buy` (172), both
 * `button_thick` style 6 in `0x4faf4f`. `updateButtonStates` hides the first two as the offer and
 * the purse say, and the list closes up round what is left.
 */
export const TargetedOfferDialogButtonBar = ({ model, left, top }: TargetedOfferDialogButtonBarProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'absolute', left, width: 540, top, height: 70, overflow: 'hidden', justifyContent: 'center' }}>
            <ThemeText
                name="txt_status"
                text={model.statusText}
                textStyle="u_bold"
                textOptions={{ fontSize: 16, align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 540, top: 14 }}
            />
            <Region
                name="itemlist_buttonbar"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, top: 38, flexDirection: 'row', gap: 10 }}
            >
                {model.quantityVisible && (
                    <Region
                        name="cnt_quantity"
                        layout={{ width: 100, height: 30, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, top: 4, maxWidth: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 4 }}>
                            <ThemeText
                                text={t('catalog.bundlewidget.quantity')}
                                textStyle="u_regular"
                                textOptions={{ fill: '#666666' }}
                            />
                        </Region>
                        <Border
                            variant="0"
                            layout={{ position: 'absolute', left: 65, width: 30, top: 0, height: 25 }}
                        >
                            <TextInput
                                value={model.quantityCaption}
                                onChange={model.onQuantityChange}
                                textStyle="u_small"
                                flashPlacement
                                restrict="0123456789"
                                backgroundColor={null}
                                focusedBackgroundColor={null}
                                layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                            />
                        </Border>
                    </Region>
                )}
                {model.getCreditsVisible && (
                    <ButtonThick
                        variant="6"
                        name="btn_get_credits"
                        tintColor="#4faf4f"
                        onPointerTap={model.onGetCredits}
                        layout={{ width: 189, height: 30, flexShrink: 0 }}
                    >
                        {t('targeted.offer.button.credits')}
                    </ButtonThick>
                )}
                <ButtonThick
                    variant="6"
                    name="btn_buy"
                    tintColor="#4faf4f"
                    disabled={!model.buyEnabled}
                    onPointerTap={model.onBuy}
                    layout={{ width: 172, height: 30, flexShrink: 0 }}
                >
                    {t('targeted.offer.button.buy')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
