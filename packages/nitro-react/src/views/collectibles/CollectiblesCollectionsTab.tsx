/**
 * The collections tab - `tabs/CollectionsTab` in `collectionsContainer` of `collectible_view.xml`:
 * the wallet menu (every wallet, the Collector wallet by its display name; greyed and disabled with
 * none), the sort menu, the search box (the clear button's icon shows only while there is text,
 * the placeholder only while there is none), the navigation list of sets and the open set's
 * `collection_content` (`useCollectiblesCollectionView`). While the sets are asked for,
 * `loading_contents` covers it.
 *
 * The wallet menu's caption is the picked wallet cut to 19 characters and `...` (the `activeWallet`
 * setter). The list shows the sets whose lower-cased name holds the search text as typed
 * (`filterSearchResults`).
 */
import { activateCollection, getCollectiblesWalletLabel, getCollectionsSortOptions, isCollectionShownBySearch, selectCollectionsSort, selectCollectionsWallet, setCollectionsSearch } from '#base/commands';
import { CollectiblesCollection, useCollectiblesStore } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';

import { CollectiblesTabWindow } from './CollectiblesTabWindow';
import { collectiblesLoadingBindings, collectiblesNavigationNode, useCollectiblesNavigationLooks } from './collectiblesTemplate';
import { useCollectiblesCollectionView } from './useCollectiblesCollectionView';

/** `initializeWallets`: the menu's colour with no wallets, and with some. */
const WALLET_MENU_DISABLED_COLOR = 13421772;
const WALLET_MENU_ENABLED_COLOR = 16777215;
/** The `activeWallet` setter cuts a longer caption. */
const WALLET_CAPTION_LENGTH = 19;

export const CollectiblesCollectionsTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.collectionsReady);
    const walletAddresses = useCollectiblesStore(x => x.walletAddresses);
    const activeWallet = useCollectiblesStore(x => x.activeWallet);
    const collections = useCollectiblesStore(x => x.collections);
    const order = useCollectiblesStore(x => x.collectionsOrder);
    const sort = useCollectiblesStore(x => x.collectionsSort);
    const search = useCollectiblesStore(x => x.collectionsSearch);
    const activeCollectionId = useCollectiblesStore(x => x.activeCollectionId);
    const collectionView = useCollectiblesStore(x => x.collectionView);
    const looks = useCollectiblesNavigationLooks(order, activeCollectionId);
    const { bindings: collectionBindings, arrange } = useCollectiblesCollectionView(collectionView);

    const wallets = walletAddresses ?? [];
    const walletIndex = activeWallet !== null ? wallets.indexOf(activeWallet) : -1;
    const walletLabel = (walletIndex >= 0) ? getCollectiblesWalletLabel(wallets[walletIndex]) : '';
    const byId = new Map<string, CollectiblesCollection>(collections.map(collection => [ collection.data.collectionId, collection ]));
    const listed = order.map(id => byId.get(id)).filter((collection): collection is CollectiblesCollection => !!collection);
    const searching = search.length > 0;

    return (
        <CollectiblesTabWindow
            container="collectionsContainer"
            bindings={{
                ...collectiblesLoadingBindings(ready),
                // `initializeWallets`: none leaves the layout's caption, greyed and disabled.
                wallet_selection: (walletAddresses === null)
                    ? {}
                    : wallets.length
                        ? {
                                color: WALLET_MENU_ENABLED_COLOR,
                                options: wallets.map(getCollectiblesWalletLabel),
                                selection: walletIndex,
                                ...((walletLabel.length > WALLET_CAPTION_LENGTH) && { caption: `${walletLabel.substring(0, WALLET_CAPTION_LENGTH)}...` }),
                                onSelect: index => selectCollectionsWallet(send, index),
                            }
                        : { color: WALLET_MENU_DISABLED_COLOR, disabled: true },
                sort_selection: { options: getCollectionsSortOptions(), selection: sort, onSelect: selectCollectionsSort },
                search_input: { caption: search, onChange: setCollectionsSearch },
                search_icon: { visible: searching },
                search_placeholder: { visible: !searching },
                search_clear_button: { onPointerTap: () => setCollectionsSearch('') },
                navigationList: {
                    items: listed.filter(collection => isCollectionShownBySearch(collection, search)).map(collection => collectiblesNavigationNode({
                        key: collection.data.collectionId,
                        title: t(`collectibles.set.${collection.data.collectionId}`, collection.data.collectionName),
                        active: collection.data.collectionId === activeCollectionId,
                        looks,
                        progress: { collected: collection.collectedItemCount, total: collection.data.items.length },
                        onSelect: () => activateCollection(send, collection.data.collectionId),
                    })),
                },
                collection_content: { visible: (listed.length > 0) && !!collectionView },
                ...collectionBindings,
            }}
            arrange={arrange}
        />
    );
};
