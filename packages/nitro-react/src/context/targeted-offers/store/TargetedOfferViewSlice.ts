/**
 * Which of `OfferController`'s views is up. It holds at most one of `_offerDialog`
 * (`TargetedOfferDialogView`), the minimized view (`TargetedOfferMinimizedView`, a toolbar
 * extension) and the purchase confirmation (`TargetedOfferPurchaseConfirmationView`), since every
 * `show*` starts with `destroyView()` - plus the layout the dialog was built from and its quantity.
 *
 * `quantity` is the dialog's `§_-X1q§` (1 in a new dialog, then what `quantity_input` holds - `NaN`
 * while the field is empty, as Flash's `parseInt` leaves it) and, while the confirmation is up, the
 * quantity it was opened with.
 *
 * `MallOfferDialogView` / `MallOfferMinimizedView` are not views this can hold: see
 * `registerTargetedOfferHandlers` for why no mall offer ever reaches the port.
 */
import { StateCreator } from 'zustand';

/** The views `OfferController.destroyView` disposes. */
export type TargetedOfferViewName = 'dialog' | 'minimized' | 'confirmation';

/** `maximizeOffer`'s default layout asset. */
export const TARGETED_OFFER_DIALOG_LAYOUT = 'targeted_offer_dialog_xml';

/** The one other dialog layout the catalogue carries, which `targeted.offer.override.layout.<id>` names. */
export const TARGETED_OFFER_DIALOG_VARIATION_LAYOUT = 'targeted_offer_dialog_variation_xml';

export type TargetedOfferDialogLayout = typeof TARGETED_OFFER_DIALOG_LAYOUT | typeof TARGETED_OFFER_DIALOG_VARIATION_LAYOUT;

/** The tracking states `OfferController` sends with `SetTargetedOfferStateComposer`; `onTargetedOffer` minimizes an offer in state 4. */
export const TARGETED_OFFER_STATE_MAXIMIZED = 1;
export const TARGETED_OFFER_STATE_MINIMIZED = 4;

type State = {
    view: TargetedOfferViewName | null;
    dialogLayout: TargetedOfferDialogLayout;
    quantity: number;
};

type Actions = {
    /** `new TargetedOfferDialogView(...).buildWindow(layout)`: a new dialog starts at quantity 1. */
    showDialogView: (dialogLayout: TargetedOfferDialogLayout) => void;
    showMinimizedView: () => void;
    showConfirmationView: (quantity: number) => void;
    setQuantity: (quantity: number) => void;
    /** `destroyView`. */
    hideView: () => void;
};

export const TargetedOfferViewSliceInitialState: State = {
    view: null,
    dialogLayout: TARGETED_OFFER_DIALOG_LAYOUT,
    quantity: 1,
};

export type TargetedOfferViewSlice = State & Actions;

export const createTargetedOfferViewSlice: StateCreator<TargetedOfferViewSlice, [], [], TargetedOfferViewSlice> = set => ({
    ...TargetedOfferViewSliceInitialState,
    showDialogView: dialogLayout => set({ view: 'dialog', dialogLayout, quantity: 1 }),
    showMinimizedView: () => set({ view: 'minimized' }),
    showConfirmationView: quantity => set({ view: 'confirmation', quantity }),
    setQuantity: quantity => set({ quantity }),
    hideView: () => set({ view: null }),
});
