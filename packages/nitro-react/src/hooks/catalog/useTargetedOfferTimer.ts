/**
 * `OfferView.startUpdateTimer` / `updateRemainingTime` for the targeted offer dialog and its
 * minimized view: once a second, the seconds the offer has left - and when they reach 0 the view
 * goes (`OfferController.destroyView`). Flash starts the timer only for an offer that expires
 * (`expirationTime != 0`); for one that does not, this returns `null` and destroys nothing.
 *
 * The purchase confirmation extends `OfferView` too but never starts the timer, so it does not
 * use this.
 */
import { useEffect } from 'react';

import { destroyTargetedOfferView } from '#base/commands';
import { TargetedOffer, targetedOfferSecondsRemaining } from '#base/context/targeted-offers';

import { useSecondsClock } from '../useSecondsClock';

export const useTargetedOfferTimer = (offer: TargetedOffer): number | null => {
    const now = useSecondsClock();
    const timed = (offer.expirationTime !== 0);
    const secondsRemaining = timed ? targetedOfferSecondsRemaining(offer, now) : null;

    useEffect(() => {
        if (secondsRemaining === 0) destroyTargetedOfferView();
    }, [ secondsRemaining ]);

    return secondsRemaining;
};
