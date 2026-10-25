import { TargetedOfferDialogModel } from '#base/hooks';
import { TemplateBindings } from '#base/theme';

/**
 * What `TargetedOfferDialogView` writes into the elements both of its layouts have
 * (`targeted_offer_dialog_xml`, `targeted_offer_dialog_variation_xml`): the frame's title,
 * `bmp_illustration`, `cnt_time_left` (`setTimeLeft`), and the button bar (`updateButtonStates`,
 * `onQuantityInputEvent`, `onInput`). See `useTargetedOfferDialog` for what goes into each.
 */
export const targetedOfferDialogBindings = (model: TargetedOfferDialogModel): TemplateBindings => ({
    '': { caption: model.title },
    bmp_illustration: { asset: model.illustrationUrl },
    cnt_time_left: { visible: !!model.timeLeft },
    txt_time_left_label_1: { caption: model.timeLeft?.label1 ?? '' },
    txt_time_left: { caption: model.timeLeft?.time ?? '' },
    txt_time_left_label_2: { caption: model.timeLeft?.label2 ?? '' },
    txt_status: { caption: model.statusText },
    cnt_quantity: { visible: model.quantityVisible },
    quantity_input: { caption: model.quantityCaption, onChange: model.onQuantityChange },
    btn_get_credits: { visible: model.getCreditsVisible, onPointerTap: model.onGetCredits },
    btn_buy: { disabled: !model.buyEnabled, onPointerTap: model.onBuy },
});
