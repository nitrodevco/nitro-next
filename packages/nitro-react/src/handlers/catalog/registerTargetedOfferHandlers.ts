/**
 * `OfferController`'s listeners (`catalog/targetedoffers`), and the request it sends.
 *
 * - `productDataReady` sends `GetNextTargetedOfferComposer` once the session's product data is in.
 *   The port loads product data before the client mounts at all (`Nitro.tsx` waits on
 *   `useProductDataLoader`), so the first moment both it and the session are there is the user
 *   object's arrival - the answer to the `InfoRetrieveComposer` `MainView` sends - and the request
 *   goes out then.
 * - `onTargetedOffer`: an offer in tracking state 4 (`TARGETED_OFFER_STATE_MINIMIZED`) docks in the
 *   toolbar, any other opens its dialog. `TargetedOfferData.parse`'s `seconds * 1000 + getTimer()`
 *   is taken here, when the packet lands.
 * - `onTargetedOfferNotFound` starts `MallOfferExternalInterfaceHelper`: it publishes
 *   `targetedWebOfferCheckResponse` and `targetedWebOfferCheckFailed` on the page
 *   (`ExternalInterface.addCallback`) and calls the page's `TargetedWebOffer.checkOffer`. A page
 *   that has one answers through the response callback with a Habbo Mall offer, which goes to
 *   `onHabboMallOffer`; the failure callback does nothing. A page without one is no answer, as
 *   Flash's `ExternalInterface.call` of a missing function returns null.
 *
 * `OfferController.dispose` disposes the helper, taking its callbacks off the page; here that is the
 * handlers' unsubscribe.
 *
 * `onPurseUpdate` re-runs the dialog's `updateButtonStates`; the dialog here reads the purse from
 * `userStore`, so it follows every update on its own.
 */
import { GetNextTargetedOfferComposer, TargetedOfferEventMessage, TargetedOfferNotFoundEventMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { maximizeTargetedOffer, minimizeTargetedOffer, onHabboMallOffer } from '#base/commands';
import { Send, WebSocketConnection } from '#base/context/communication';
import { createHabboMallOffer, createTargetedOffer, TARGETED_OFFER_STATE_MINIMIZED } from '#base/context/targeted-offers';
import { tryCallPageFunction } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `MallOfferExternalInterfaceHelper.GET_HABBO_SHOP_OFFER_RESULT_CALLBACK` / `_FAILED_CALLBACK`. */
const MALL_OFFER_RESULT_CALLBACK = 'targetedWebOfferCheckResponse';
const MALL_OFFER_FAILED_CALLBACK = 'targetedWebOfferCheckFailed';

/** `MallOfferExternalInterfaceHelper`'s constructor: the callbacks, then `TargetedWebOffer.checkOffer`. */
const startMallOfferHelper = (send: Send) => {
    // `onShopOfferResult`.
    Reflect.set(globalThis, MALL_OFFER_RESULT_CALLBACK, (data: unknown) => {
        if ((data === null) || (data === undefined)) return;

        onHabboMallOffer(send, createHabboMallOffer(Object(data) as Record<string, unknown>));
    });
    // `onShopOfferFailed`.
    Reflect.set(globalThis, MALL_OFFER_FAILED_CALLBACK, () => {});

    tryCallPageFunction('TargetedWebOffer.checkOffer');
};

/** `MallOfferExternalInterfaceHelper.dispose`. */
const disposeMallOfferHelper = () => {
    Reflect.deleteProperty(globalThis, MALL_OFFER_RESULT_CALLBACK);
    Reflect.deleteProperty(globalThis, MALL_OFFER_FAILED_CALLBACK);
};

export const registerTargetedOfferHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const unsubscribe = subscribeAll(subscribe, [
        on(UserObjectMessage, () => send(new GetNextTargetedOfferComposer({}))),

        on(TargetedOfferEventMessage, (data) => {
            const offer = createTargetedOffer(data.data, performance.now());

            if (offer.trackingState === TARGETED_OFFER_STATE_MINIMIZED) minimizeTargetedOffer(send, offer);
            else maximizeTargetedOffer(send, offer);
        }),

        on(TargetedOfferNotFoundEventMessage, () => startMallOfferHelper(send)),
    ]);

    return () => {
        unsubscribe();
        disposeMallOfferHelper();
    };
};
