/**
 * Mounts what `CollectiblesController` shows: the hub (`CollectiblesView`) while the `collectibles`
 * window is up - opened by the me menu's collectibles button or a `collectibles/open` link, which
 * both end in `showCollectibleHub` - the NFT reward box while it holds a reward, and the purchase
 * confirmation of a token pack or shop offer while one is open.
 *
 * The first time the hub comes up it is built (`createCollectiblesHub`: its tabs ask for their
 * data); after that it is only shown and hidden, and keeps what its tabs hold.
 */
import { useEffect } from 'react';

import { createCollectiblesHub } from '#base/commands';
import { useCollectiblesStore } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible } from '#base/context/system';
import { CollectiblesPurchaseConfirmationView } from '#base/views/collectibles/CollectiblesPurchaseConfirmationView';
import { CollectiblesRewardBoxView } from '#base/views/collectibles/CollectiblesRewardBoxView';
import { CollectiblesView } from '#base/views/collectibles/CollectiblesView';

export const CollectiblesComponent = () => {
    const isVisible = useIsWindowVisible('collectibles');
    const hubCreated = useCollectiblesStore(x => x.hubCreated);
    const rewardBoxVisible = useCollectiblesStore(x => x.rewardBoxVisible);
    const purchaseOpen = useCollectiblesStore(x => !!x.purchaseOffer);
    const { send } = useWebSocketContext();

    useEffect(() => {
        if (isVisible) createCollectiblesHub(send);
    }, [ isVisible, send ]);

    return (
        <>
            {isVisible && hubCreated && <CollectiblesView />}
            {rewardBoxVisible && <CollectiblesRewardBoxView />}
            {purchaseOpen && <CollectiblesPurchaseConfirmationView />}
        </>
    );
};
