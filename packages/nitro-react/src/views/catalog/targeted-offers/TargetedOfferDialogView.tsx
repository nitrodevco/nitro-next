import { useConfigData } from '#base/context/system';
import { TargetedOffer } from '#base/context/targeted-offers';
import { useTargetedOfferDialog } from '#base/hooks';
import { TemplateWindow } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

import { catalogTemplateId } from '../page/catalogTemplates';
import { targetedOfferDialogBindings } from './targetedOfferDialogBindings';

/**
 * Flash's `TargetedOfferDialogView.buildWindow` on `habbo-catalog-com/targeted_offer_dialog_xml`,
 * centred. Over the elements both layouts share (`targetedOfferDialogBindings`), this one has
 * `txt_title` (the offer's title), the `html` `txt_description`, `txt_price_label` and the price
 * texts (`updatePriceText`), and `activityPoints_icon` (`renderPrice`: `getIconStyleFor` of the
 * type, big).
 *
 * `setLinkStyle` underlines the description's links with an `a:link` style sheet. The theme's
 * markup keeps an `<a>`'s text but has no style sheet and no link clicks, so a link reads as plain
 * text here.
 */
export interface TargetedOfferDialogViewProps {
    offer: TargetedOffer;
}

export const TargetedOfferDialogView = ({ offer }: TargetedOfferDialogViewProps) => {
    const model = useTargetedOfferDialog(offer);
    const config = useConfigData();

    return (
        <TemplateWindow
            id={catalogTemplateId('targeted_offer_dialog_xml')}
            frame={{ id: 'targeted-offer-dialog', centered: true, rememberPosition: false, onClose: model.onClose }}
            bindings={{
                ...targetedOfferDialogBindings(model),
                txt_title: { caption: model.title },
                txt_description: { caption: model.description },
                txt_price_label: { caption: model.priceLabel },
                txt_price_credits: { caption: model.priceCredits },
                txt_price_activityPoints: { caption: model.priceActivityPoints },
                activityPoints_icon: { style: String(getCurrencyIconStyle(model.activityPointType, config, true)) },
            }}
        />
    );
};
