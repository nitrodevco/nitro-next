import { TargetedOffer } from '#base/context/targeted-offers';
import { useTargetedOfferDialog } from '#base/hooks';
import { TemplateWindow } from '#base/theme';

import { catalogTemplateId } from '../page/catalogTemplates';
import { targetedOfferDialogBindings } from './targetedOfferDialogBindings';

/**
 * Flash's `TargetedOfferDialogView` built from
 * `habbo-catalog-com/targeted_offer_dialog_variation_xml` - the layout
 * `OfferController.maximizeOffer` takes when `targeted.offer.override.layout.<id>` names it -
 * centred. It has no title, description or price elements (`buildWindow` finds none): the picture
 * carries them, and the frame's title is the offer's. The wiring is `useTargetedOfferDialog`, the
 * same as the default layout's.
 */
export interface TargetedOfferDialogVariationViewProps {
    offer: TargetedOffer;
}

export const TargetedOfferDialogVariationView = ({ offer }: TargetedOfferDialogVariationViewProps) => {
    const model = useTargetedOfferDialog(offer);

    return (
        <TemplateWindow
            id={catalogTemplateId('targeted_offer_dialog_variation_xml')}
            frame={{ id: 'targeted-offer-dialog', centered: true, rememberPosition: false, onClose: model.onClose }}
            bindings={targetedOfferDialogBindings(model)}
        />
    );
};
