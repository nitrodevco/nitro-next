/**
 * The cursed dragon adoption's controller - `catalog/cursed_dragon_adoption/CursedDragonAdoptionController`
 * (build WIN63-202610151745): `linkReceived("cursed_dragon_adoption/open")` -> `open`, which asks
 * the server whether the hotel's claim (`cursed_dragon_adoption.claim_id`, `cursed_dragon_adoption`
 * when unset) was taken and shows the window, and `makeClaim` for the window's two adopt buttons.
 */
import { ClaimProductComposer, HasClaimedProductComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { cursedDragonAdoptionStore } from '#base/context/cursed-dragon-adoption';
import { configString, systemStore } from '#base/context/system';

/** `initComponent`: `getProperty("cursed_dragon_adoption.claim_id")`, else `cursed_dragon_adoption`. */
const claimId = () => configString('cursed_dragon_adoption.claim_id') || 'cursed_dragon_adoption';

/** `open`: `HasClaimedProduct` unless fetching, claiming or claimed, then `show`. */
export const openCursedDragonAdoption = (send: Send) => {
    const id = claimId();

    if (cursedDragonAdoptionStore.getState().startFetching(id)) send(new HasClaimedProductComposer({ claimId: id }));

    systemStore.getState().showWindow('cursed_dragon_adoption');
};

/** `makeClaim(choice)`: only while available, with 0 (blue) or 1 (purple). */
export const claimCursedDragon = (send: Send, choice: number) => {
    const { claimId: id, startClaiming } = cursedDragonAdoptionStore.getState();

    if (startClaiming(choice)) send(new ClaimProductComposer({ claimId: id, choice }));
};
