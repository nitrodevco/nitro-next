/**
 * The rewards tab - `tabs/RewardClaimsTab` in `rewardsContainer` of `collectible_view.xml`: while
 * the wallets' claims are being asked for, `loading_contents`; then `loaded_content` - the claims
 * in `itemlist`, one `item_template` each (`renderer/RewardCollectibleItemRenderer`), and the
 * "claim all" button - or, with nothing to claim, `no_content_container`'s Frank.
 *
 * Each claim shows the item's icon and name, how many are left to claim (`x<limit - claimed>`),
 * its collection (`collectibles.set.<setId>`), its expiry (`dd/MM/yyyy` of `validTo`) and the
 * wallet it is for; the renderer colours its border as it is hovered.
 */
import { claimAllRewards, getCollectibleProductName } from '#base/commands';
import { formatCollectiblesDate, useCollectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';

import { CollectiblesTabWindow } from './CollectiblesTabWindow';
import { collectibleRewardItem, collectiblesLoadingBindings, useCollectiblesHover } from './collectiblesTemplate';

export const CollectiblesRewardsTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.claimsReady);
    const claims = useCollectiblesStore(x => x.claims);
    const buttonEnabled = useCollectiblesStore(x => x.claimsButtonEnabled);
    const hover = useCollectiblesHover();
    const hasClaims = claims.length > 0;

    return (
        <CollectiblesTabWindow
            container="rewardsContainer"
            bindings={{
                ...collectiblesLoadingBindings(ready, hasClaims),
                no_content_container: { visible: ready && !hasClaims },
                itemlist: {
                    items: claims.map((claim) => {
                        const info = wrapBaseItem(claim.claimItem);

                        return collectibleRewardItem(`${claim.wallet}:${claim.claimId}`, info, {
                            name: getCollectibleProductName(info),
                            amount: `x${claim.claimLimit - claim.claimedAmount}`,
                            collection: `<b>${t('collectibles.claim.collection', '')}</b> ${t(`collectibles.set.${claim.claimItem.setId}`, '')}`,
                            expires: `<b>${t('collectibles.claim.expiration', '')}</b> ${formatCollectiblesDate(claim.validTo)}`,
                            wallet: claim.wallet,
                        }, hover);
                    }),
                },
                claim_button: { disabled: !buttonEnabled, onPointerTap: () => claimAllRewards(send) },
            }}
        />
    );
};
