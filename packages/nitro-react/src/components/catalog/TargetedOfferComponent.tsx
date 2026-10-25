import { TARGETED_OFFER_DIALOG_VARIATION_LAYOUT, useTargetedOfferStore } from '#base/context/targeted-offers';
import { MallOfferDialogView } from '#base/views/catalog/targeted-offers/MallOfferDialogView';
import { TargetedOfferDialogVariationView } from '#base/views/catalog/targeted-offers/TargetedOfferDialogVariationView';
import { TargetedOfferDialogView } from '#base/views/catalog/targeted-offers/TargetedOfferDialogView';
import { TargetedOfferPurchaseConfirmationView } from '#base/views/catalog/targeted-offers/TargetedOfferPurchaseConfirmationView';

/**
 * Mounts the windows of Flash's `OfferController` (`catalog/targetedoffers`): the offer dialog, in
 * the layout `maximizeOffer` picked, the purchase confirmation or the Habbo Mall offer's dialog -
 * whichever `targetedOfferStore` says is up. The minimized views are toolbar extensions and live in
 * `MainView`'s extension column (`TargetedOfferMinimizedView`, `MallOfferMinimizedView`).
 */
export const TargetedOfferComponent = () => {
    const offer = useTargetedOfferStore(x => x.offer);
    const view = useTargetedOfferStore(x => x.view);
    const dialogLayout = useTargetedOfferStore(x => x.dialogLayout);
    const quantity = useTargetedOfferStore(x => x.quantity);
    const mallOffer = useTargetedOfferStore(x => x.mallOffer);

    if (mallOffer && (view === 'mallDialog')) return <MallOfferDialogView offer={mallOffer} />;

    if (!offer) return null;

    if (view === 'dialog') {
        if (dialogLayout === TARGETED_OFFER_DIALOG_VARIATION_LAYOUT) return <TargetedOfferDialogVariationView offer={offer} />;

        return <TargetedOfferDialogView offer={offer} />;
    }

    if (view === 'confirmation') return (
        <TargetedOfferPurchaseConfirmationView
            offer={offer}
            quantity={quantity}
        />
    );

    return null;
};
