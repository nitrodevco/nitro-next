/**
 * Picking a club gift - Flash's `ClubGiftConfirmationDialog`, the `club_gift_confirmation` window:
 * the gift's product name in `item_name`, and its product container drawn into `image_border`
 * (`productContainer.view = image_border; initProductIcon`, `useClubGiftIcon`): the product's icon,
 * or the deal picture for a bundle, in `image`, and `multiContainer` with `x<count>` for a multi
 * offer only. Select is `ClubGiftController.confirmSelection` (`SelectClubGiftComposer` with the
 * offer's product code, one gift fewer), the close and cancel `closeConfirmation`.
 */
import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { confirmClubGift } from '#base/commands';
import { useCatalogClubActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { TemplateWindow } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogProductIconView } from '../CatalogProductIconView';
import { catalogTemplateId } from '../page/catalogTemplates';
import { useClubGiftIcon } from './useClubGiftIcon';

const ClubGiftDialog = ({ offer }: { offer: IPurchasableOffer }) => {
    const { setClubGiftConfirmation } = useCatalogClubActions();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const { bundleIcon, product, multiCount } = useClubGiftIcon(offer);
    const close = () => setClubGiftConfirmation(undefined);

    return (
        <TemplateWindow
            id={catalogTemplateId('club_gift_confirmation')}
            frame={{ id: 'club-gift-confirmation', centered: true, rememberPosition: false, onClose: close }}
            bindings={{
                item_name: { caption: getOfferProduct(offer)?.productData?.name ?? '' },
                image: bundleIcon
                    ? { asset: 'habbo-catalog-com-ctlg_pic_deal_icon_narrow' }
                    : {
                            children: product && (
                                <CatalogProductIconView
                                    product={product}
                                    width={46}
                                    height={46}
                                />
                            ),
                        },
                multiContainer: { visible: multiCount !== undefined },
                multiCounter: { caption: (multiCount !== undefined) ? `x${multiCount}` : '' },
                select_button: { onPointerTap: () => confirmClubGift(send, store) },
                cancel_button: { onPointerTap: close },
            }}
        />
    );
};

export const CatalogClubGiftConfirmationView = () => {
    const offer = useCatalogStore(x => x.clubGiftConfirmation);

    if (!offer) return null;

    return (
        <ClubGiftDialog
            key={offer.offerId}
            offer={offer}
        />
    );
};
