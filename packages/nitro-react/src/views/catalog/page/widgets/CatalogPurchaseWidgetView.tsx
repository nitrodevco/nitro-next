import { CatalogPricingModelEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useEffect, useRef, useState } from 'react';

import { isHabbiconOfferOwned, purchaseWillBeGift, sendRoomAdPurchaseInitiatedEvent, showHabbiconAlreadyOwnedAlert, showPurchaseConfirmation, verifyClubLevel } from '#base/commands';
import { CatalogPurchaseWidgetState, CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent, useCatalogPurchaseActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Box, Button, ContainerButton, Region, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** `PurchaseCatalogWidget.isSoldOut`: a single limited offer with none left. */
const isSoldOut = (offer: IPurchasableOffer) => {
    if (offer.pricingModel !== CatalogPricingModelEnum.Single) return false;

    const product = getOfferProduct(offer);

    return !!product && product.isUnique && (product.uniqueLeft === 0);
};

/** The widget's fields - what Flash's `PurchaseCatalogWidget` keeps, changed only by its event handlers. */
interface PurchaseWidgetFields {
    offer: IPurchasableOffer | undefined;
    additionalParameters: string;
    quantity: number;
    stuffData: CatalogPurchaseWidgetState['stuffData'];
    /** `§_-LG§`: a widget said an extra parameter is needed before anything can be bought. */
    extraParamRequired: boolean;
    /** `§_-R1L§`: `CWE_TOGGLE` for `purchaseWidget`. */
    enabled: boolean;
    buyEnabled: boolean;
    giftEnabled: boolean;
    giftVisible: boolean;
}

/**
 * The buy and gift buttons, `purchaseWidget.xml` - Flash's `PurchaseCatalogWidget`: until an offer
 * is picked the half-blended `selection_information` border asks for one; after that it is
 * hidden and `default_buttons` shows.
 *
 * The widget collects what the purchase needs from the other widgets' events - the offer
 * (`SELECT_PRODUCT`, which puts the quantity back to 1 and the next purchase back to a plain one,
 * `purchaseWillBeGift(false)`), the extra parameter (`CWE_SET_EXTRA_PARM`), the quantity
 * (`CWSE_VALUE_CHANGED`), the stuff data (`CWE_SET_PREVIEWER_STUFFDATA`) - and a widget that buys
 * on its own takes the button over (`PURCHASE_OVERRIDE`). A widget that needs an extra parameter
 * before anything can be bought says so (`CWE_EXTRA_PARAM_REQUIRED_FOR_BUY`), and `CWE_TOGGLE` for
 * `purchaseWidget` shows or hides it.
 *
 * The buttons are enabled and disabled the way each Flash handler does it, not from one rule:
 * `onExtraParamRequired` enables the gift button without asking whether the offer is giftable, as
 * Flash does. A disabled button is half blended (`enableButton`), and both stay disabled while the
 * account is safety locked (`isAccountSafetyLocked`). The gift button hides for a rent offer or a
 * container tagged `NO_GIFT_OPTION`, and the buy button reads "rent" for a rent offer
 * (`RentUtils.updateBuyCaption`).
 *
 * Buying (`onPurchase`) checks the offer's club level (`verifyClubLevel`, which opens the club
 * centre), marks the purchase as a gift or not (`purchaseWillBeGift`), and - unless a widget took
 * the button over - refuses a room ad without a room or with a name under 5 characters or
 * starting with a space before `showPurchaseConfirmation`. A container tagged
 * `ROOM_INITIATE_PURCHASE` tells the server the room ad purchase started (`init()`). A habbicon the
 * user owns already cannot be bought (`isHabbiconOfferOwned`): the buy button reads "owned"
 * (`updatePurchaseLabel`) and a press shows `showHabbiconAlreadyOwnedAlert`.
 *
 * `INIT_PURCHASE` (a drop into the room) is answered by the catalogue's purchase flow
 * (`useCatalogPurchaseFlow`) from what this widget records for its page (`purchaseWidgetState`):
 * the drop hides the window, and the port unmounts a hidden window's widgets. The record also
 * lets the widget come back as it was when the window reopens on the same page, as Flash's widget
 * simply stays alive.
 */
export const CatalogPurchaseWidgetView = ({ page, tags }: CatalogWidgetProps) => {
    const record = useCatalogStore(x => x.purchaseWidgetState);
    const roomAdPurchaseData = useCatalogStore(x => x.roomAdPurchaseData);
    const accountSafetyLocked = useUserStore(x => x.accountSafetyLocked);
    const { setPurchaseWidgetState } = useCatalogPurchaseActions();
    const { showAlert } = useWindowActions();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const noGiftOption = tags.includes('NO_GIFT_OPTION');
    const initiatesRoomAdPurchase = tags.includes('ROOM_INITIATE_PURCHASE');
    const [ fields, setFields ] = useState<PurchaseWidgetFields>(() => {
        const own = (record?.page === page) ? record : undefined;

        return {
            offer: own?.offer,
            additionalParameters: own?.additionalParameters ?? '',
            quantity: own?.quantity ?? 1,
            stuffData: own?.stuffData,
            extraParamRequired: false,
            enabled: true,
            buyEnabled: true,
            giftEnabled: false,
            giftVisible: !noGiftOption,
        };
    });
    // The handlers run one after another with no render between them (the grid sends the offer and
    // its extra parameter together), so each reads and writes these rather than the rendered copy.
    const current = useRef<PurchaseWidgetFields | undefined>(undefined);
    const purchaseCallback = useRef<(() => void) | undefined>(undefined);

    const update = (change: Partial<PurchaseWidgetFields>) => {
        const next = { ...(current.current ?? fields), ...change };

        current.current = next;
        setFields(next);
        setPurchaseWidgetState({ page, offer: next.offer, additionalParameters: next.additionalParameters, quantity: next.quantity, stuffData: next.stuffData });
    };

    const read = () => current.current ?? fields;

    /** `canPurchaseSelectedOffer`: `extraParamRequirementsMet`, and not a habbicon the user owns already. */
    const canPurchase = (state: PurchaseWidgetFields) => !(state.extraParamRequired && (state.additionalParameters === '')) && !isHabbiconOfferOwned(state.offer);

    /** `enableBuyButton` / `enableGiftButton`: nothing is enabled while the account is safety locked. */
    const allowed = (enabled: boolean) => enabled && !accountSafetyLocked;

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        const offer = event.offer;
        const state = { ...read(), quantity: 1, offer };
        const purchasable = canPurchase(state);
        const soldOut = isSoldOut(offer);

        purchaseWillBeGift(store, false);

        update({
            quantity: 1,
            offer,
            buyEnabled: allowed(purchasable && !soldOut),
            giftEnabled: allowed(purchasable && offer.giftable && !soldOut),
            giftVisible: !offer.isRentOffer && !noGiftOption,
        });
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, (event) => {
        const state = { ...read(), additionalParameters: event.parameter };
        const purchasable = canPurchase(state);

        update({
            additionalParameters: event.parameter,
            buyEnabled: allowed(purchasable),
            giftEnabled: allowed(!!state.offer && state.offer.giftable && purchasable && (state.quantity === 1)),
        });
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.PURCHASE_OVERRIDE, (event) => {
        purchaseCallback.current = event.callback;
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SET_PREVIEWER_STUFFDATA, event => update({ stuffData: event.stuffData }));

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.VALUE_CHANGED, (event) => {
        const state = { ...read(), quantity: event.value };

        if (event.value > 1) update({ quantity: event.value, giftEnabled: false });
        else if (state.offer && !(state.extraParamRequired && (state.additionalParameters === ''))) update({ quantity: event.value, giftEnabled: allowed(state.offer.giftable && canPurchase(state)) });
        else update({ quantity: event.value });
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.EXTRA_PARAM_REQUIRED_FOR_BUY, () => {
        const state = { ...read(), extraParamRequired: true };
        const purchasable = canPurchase(state);

        update({
            extraParamRequired: true,
            buyEnabled: allowed(purchasable),
            giftEnabled: allowed(!!state.offer && purchasable && (state.quantity === 1)),
        });
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.TOGGLE, (event) => {
        if (event.widgetId === 'purchaseWidget') update({ enabled: event.enabled });
    });

    // `init()`: a room ads container says the purchase started - once for the page, not again when the window reopens on it.
    useEffect(() => {
        if (page.isBuilderPage || (record?.page === page)) return;

        setPurchaseWidgetState({ page, offer: undefined, additionalParameters: '', quantity: 1, stuffData: undefined });

        if (initiatesRoomAdPurchase) sendRoomAdPurchaseInitiatedEvent(send);
    }, [ page ]);

    // `init()`: a builders club page buys by placing, so the widget stays hidden there.
    if (page.isBuilderPage || !fields.enabled) return null;

    const { offer, additionalParameters, quantity, stuffData, buyEnabled, giftEnabled, giftVisible } = fields;

    /** `onPurchase(event, isGift)`. */
    const purchase = (isGift: boolean) => {
        if (!offer) return;

        if (isHabbiconOfferOwned(offer)) {
            showHabbiconAlreadyOwnedAlert();

            return;
        }

        if (!verifyClubLevel(send, offer.clubLevel)) return;

        purchaseWillBeGift(store, isGift);

        if (purchaseCallback.current) {
            purchaseCallback.current();

            return;
        }

        if (roomAdPurchaseData && (roomAdPurchaseData.offerId === offer.offerId)) {
            if (roomAdPurchaseData.flatId === 0) {
                showAlert(t('roomad.error.title'), t('roomad.alert.no.available.room'));

                return;
            }

            if (!roomAdPurchaseData.name || (roomAdPurchaseData.name.length < 5) || roomAdPurchaseData.name.startsWith(' ')) {
                showAlert(t('roomad.error.title'), t('roomad.alert.name.empty'));

                return;
            }
        }

        showPurchaseConfirmation(store, offer, page.pageId, additionalParameters, quantity, stuffData);
    };

    return (
        <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}>
            {!offer && (
                <Border
                    variant="6"
                    name="selection_information"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}
                >
                    <ThemeText
                        text={t('catalog.purchase.select.info')}
                        textStyle="u_headline_small"
                        textOptions={{ fill: '#666666', align: 'center' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 10, width: 341, top: 5, height: 19 }}
                    />
                </Border>
            )}
            {offer && (
                <Region
                    name="default_buttons"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 3, height: 25 }}
                >
                    <Box
                        alpha={buyEnabled ? 1 : 0.5}
                        layout={{ position: 'absolute', left: 185, width: 170, top: 0, height: 24 }}
                    >
                        <ContainerButton
                            variant="3"
                            name="buy_button"
                            tintColor="#00aa00"
                            disabled={!buyEnabled}
                            onPointerTap={() => buyEnabled && purchase(false)}
                            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 24 }}
                        >
                            <ThemeText
                                name="purchase_label"
                                text={t(isHabbiconOfferOwned(offer) ? 'generic.owned' : (offer.isRentOffer ? 'catalog.purchase_confirmation.rent' : 'catalog.purchase_confirmation.buy'))}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                flashFormat={{ bold: true }}
                            />
                        </ContainerButton>
                    </Box>
                    {giftVisible && (
                        <Box
                            alpha={giftEnabled ? 1 : 0.5}
                            layout={{ position: 'absolute', left: 5, width: 170, top: 0, height: 24 }}
                        >
                            <Button
                                variant="3"
                                name="gift_button"
                                disabled={!giftEnabled}
                                onPointerTap={() => giftEnabled && purchase(true)}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 24 }}
                            >
                                {t('catalog.purchase_confirmation.gift')}
                            </Button>
                        </Box>
                    )}
                </Region>
            )}
        </Region>
    );
};
