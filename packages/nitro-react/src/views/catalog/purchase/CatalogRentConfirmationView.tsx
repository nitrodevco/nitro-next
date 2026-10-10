import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { closeRentConfirmation, confirmRentConfirmation } from '#base/commands';
import { useCatalogPurchaseStore } from '#base/context/catalog-purchase';
import { useWebSocketContext } from '#base/context/communication';
import { useFurnitureImageTexture } from '#base/hooks';
import { Box, TemplateWindow } from '#base/theme';

import { catalogTemplateId } from '../page/catalogTemplates';

/**
 * Flash's `RentConfirmationWindow` on `rent_confirmation`, built when the server answers the rent
 * or buyout request (`onFurniRentOrBuyoutOffer`) and centred: `image` shows the furni facing 90
 * degrees at 64, `furni_name` its name, and `price_amount` the price - credits with `price_type`
 * set to the credit icon when it costs credits, otherwise the activity point amount beside the
 * layout's own ducket icon, as Flash leaves it. A buyout says so in the title, hides
 * `rental_description` and reads "buy" on the ok button.
 *
 * `ok_button` extends or buys out the furni and closes (`windowProcedure`); cancel and the header
 * close only close.
 */
export const CatalogRentConfirmationView = () => {
    const rentRequest = useCatalogPurchaseStore(x => x.rentRequest);
    const rentOffer = useCatalogPurchaseStore(x => x.rentOffer);
    const { send } = useWebSocketContext();
    const furniData = rentOffer ? rentRequest?.furniData : undefined;
    const { texture, width, height } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn);
    const [ frame ] = useState(() => ({ id: 'catalog-rent-confirmation', centered: true, rememberPosition: false, onClose: closeRentConfirmation }));

    if (!rentRequest || !rentOffer || !furniData) return null;

    const paysCredits = (rentOffer.priceInCredits > 0);

    return (
        <TemplateWindow
            id={catalogTemplateId('rent_confirmation')}
            frame={frame}
            bindings={{
                '': rentOffer.isBuyout ? { caption: '${rent.confirmation.title.buyout}' } : {},
                image: { children: texture && (
                    <Box layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        <pixiSprite
                            texture={texture}
                            width={width}
                            height={height}
                            layout={{}}
                        />
                    </Box>
                ) },
                rental_description: { visible: !rentOffer.isBuyout },
                furni_name: { caption: furniData.localizedName },
                price_amount: { caption: String(paysCredits ? rentOffer.priceInCredits : rentOffer.priceInActivityPoints) },
                price_type: paysCredits ? { asset: 'habbo-window-manager-com-toolbar_credit_icon_0' } : {},
                cancel_button: { onPointerTap: closeRentConfirmation },
                ok_button: {
                    caption: rentOffer.isBuyout ? '${catalog.purchase_confirmation.buy}' : undefined,
                    onPointerTap: () => confirmRentConfirmation(send),
                },
            }}
        />
    );
};
