import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { closeRentConfirmation, confirmRentConfirmation } from '#base/commands';
import { useCatalogPurchaseStore } from '#base/context/catalog-purchase';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Border, Button, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { useFurnitureImageTexture } from '../useFurnitureImageTexture';

/**
 * Flash's `RentConfirmationWindow` on `rent_confirmation.xml` (370x300), built when the server
 * answers the rent or buyout request (`onFurniRentOrBuyoutOffer`) and centred: the furni facing
 * 90 degrees at 64 in the bordered `image` (centred, not stretched), and the `content_list` of the
 * rental description, the furni's name and the price - credits with the credit icon when it costs
 * credits, otherwise the activity point amount beside the layout's own ducket icon, as Flash leaves
 * it. A buyout says so in the title, hides the rental description and reads "buy" on the ok button.
 *
 * `ok_button` extends or buys out the furni and closes (`windowProcedure`); cancel and the header
 * close only close.
 */
export const CatalogRentConfirmationView = () => {
    const rentRequest = useCatalogPurchaseStore(x => x.rentRequest);
    const rentOffer = useCatalogPurchaseStore(x => x.rentOffer);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const furniData = rentOffer ? rentRequest?.furniData : undefined;
    const { texture, width, height } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn);

    if (!rentRequest || !rentOffer || !furniData) return null;

    const paysCredits = (rentOffer.priceInCredits > 0);

    return (
        <Frame
            id="catalog-rent-confirmation"
            variant="3"
            centered
            rememberPosition={false}
            caption={t(rentOffer.isBuyout ? 'rent.confirmation.title.buyout' : 'rent.confirmation.title.extend')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 1, 30, 1, 1 ]}
            onClose={closeRentConfirmation}
            layout={{ position: 'absolute', width: 370, height: 300 }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 20, width: 160, top: 25, height: 180 }}
            >
                <Region
                    name="image"
                    layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 180, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                >
                    {texture && (
                        <pixiSprite
                            texture={texture}
                            width={width}
                            height={height}
                            layout={{}}
                        />
                    )}
                </Region>
            </Border>
            <Button
                variant="3"
                name="cancel_button"
                onPointerTap={closeRentConfirmation}
                layout={{ position: 'absolute', left: 20, width: 99, top: 220, height: 30 }}
            >
                {t('generic.cancel')}
            </Button>
            <ButtonThick
                variant="5"
                name="ok_button"
                tintColor="#00cc00"
                onPointerTap={() => confirmRentConfirmation(send)}
                layout={{ position: 'absolute', left: 268, width: 82, top: 220, height: 30 }}
            >
                {t(rentOffer.isBuyout ? 'catalog.purchase_confirmation.buy' : 'generic.ok')}
            </ButtonThick>
            <Region
                name="content_list"
                layout={{ position: 'absolute', left: 200, width: 150, top: 60, flexDirection: 'column', gap: 10 }}
            >
                {!rentOffer.isBuyout && (
                    <ThemeText
                        name="rental_description"
                        text={t('rent.confirmation.rental.description')}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 146 }}
                        verticalAlign="top"
                        layout={{ width: 150, flexShrink: 0 }}
                    />
                )}
                <ThemeText
                    name="furni_name"
                    text={furniData.localizedName}
                    textStyle="u_bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 146 }}
                    verticalAlign="top"
                    layout={{ width: 150, flexShrink: 0 }}
                />
                <Region layout={{ width: 150, height: 19, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', gap: 3 }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ flexShrink: 0 }}
                    />
                    <ThemeText
                        name="price_amount"
                        text={String(paysCredits ? rentOffer.priceInCredits : rentOffer.priceInActivityPoints)}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ flexShrink: 0 }}
                    />
                    <ThemeImage
                        name="price_type"
                        src={paysCredits ? LayoutImage('toolbar/toolbar_credit_icon_0.png') : LayoutImage('shared/toolbar_duckat_icon_0.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ width: 17, height: 18, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
