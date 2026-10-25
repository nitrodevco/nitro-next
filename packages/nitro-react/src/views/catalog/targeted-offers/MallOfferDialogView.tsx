import { closeHabboMallOffer, openHabboMallOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { HabboMallOffer } from '#base/context/targeted-offers';
import { TemplateWindow } from '#base/theme';

import { catalogTemplateId } from '../page/catalogTemplates';

/**
 * Flash's `catalog/targetedoffers/MallOfferDialogView` on `habbo-catalog-com/targeted_offer_habbomall_xml`,
 * centred: the frame's title and `txt_title` are the offer's title through the texts (the title
 * itself when it is no key), and `bmp_illustration` its `imageUrl` from `image.library.url` when it
 * has one. `txt_description` keeps the layout's `${targeted.offer.habbomall.notification}`.
 *
 * `onInput`: the header close is `onHabboMallOfferClosed`, `btn_buy` `onHabboMallOfferOpened` -
 * both dock the offer in the toolbar.
 */
export interface MallOfferDialogViewProps {
    offer: HabboMallOffer;
}

export const MallOfferDialogView = ({ offer }: MallOfferDialogViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const title = t(offer.title, offer.title);

    return (
        <TemplateWindow
            id={catalogTemplateId('targeted_offer_habbomall_xml')}
            frame={{ id: 'targeted-offer-habbomall', centered: true, rememberPosition: false, onClose: () => closeHabboMallOffer(send, offer) }}
            bindings={{
                '': { caption: title },
                txt_title: { caption: title },
                ...(offer.imageUrl.length > 0) && { bmp_illustration: { asset: `${imageLibraryUrl}${offer.imageUrl}` } },
                btn_buy: { onPointerTap: () => openHabboMallOffer(send, offer) },
            }}
        />
    );
};
