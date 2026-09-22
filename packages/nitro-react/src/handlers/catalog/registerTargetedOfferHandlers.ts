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
 * - `onTargetedOfferNotFound` starts `MallOfferExternalInterfaceHelper`, which calls the web page's
 *   `TargetedWebOffer.checkOffer` through `ExternalInterface` and waits for it to call back with a
 *   Habbo Mall offer. There is no page around this client to ask, so that answer never comes: the
 *   listener is registered and does nothing, and `MallOfferDialogView` / `MallOfferMinimizedView`
 *   (`targeted_offer_habbomall.xml`), which only that answer builds, are not ported.
 *
 * `onPurseUpdate` re-runs the dialog's `updateButtonStates`; the dialog here reads the purse from
 * `userStore`, so it follows every update on its own.
 */
import { GetNextTargetedOfferComposer, TargetedOfferEventMessage, TargetedOfferNotFoundEventMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { maximizeTargetedOffer, minimizeTargetedOffer } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { createTargetedOffer, TARGETED_OFFER_STATE_MINIMIZED } from '#base/context/targeted-offers';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerTargetedOfferHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(UserObjectMessage, () => send(new GetNextTargetedOfferComposer({}))),

    on(TargetedOfferEventMessage, (data) => {
        const offer = createTargetedOffer(data.data, performance.now());

        if (offer.trackingState === TARGETED_OFFER_STATE_MINIMIZED) minimizeTargetedOffer(send, offer);
        else maximizeTargetedOffer(send, offer);
    }),

    on(TargetedOfferNotFoundEventMessage, () => undefined),
]);
