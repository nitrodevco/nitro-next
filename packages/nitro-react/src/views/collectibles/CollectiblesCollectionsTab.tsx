/**
 * The collections tab - `tabs/CollectionsTab` in `collectionsContainer` of `collectible_view.xml`:
 * the wallet menu (every wallet, the Collector wallet by its display name; greyed and disabled with
 * none), the sort menu, the search box (the clear button's icon shows only while there is text,
 * the placeholder only while there is none), the navigation list of sets and the open set's
 * `collection_content` (`CollectiblesCollectionView`). While the sets are asked for,
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
import { Border, Button, Dropmenu, LayoutImage, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { CollectiblesCollectionView } from './CollectiblesCollectionView';
import { CollectiblesLoadingView } from './CollectiblesLoadingView';
import { CollectiblesNavigationItem } from './CollectiblesNavigationItem';

/** `initializeWallets`: the menu's colour with no wallets, and with some. */
const WALLET_MENU_DISABLED_COLOR = '#cccccc';
const WALLET_MENU_ENABLED_COLOR = '#ffffff';
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

    const wallets = walletAddresses ?? [];
    const walletIndex = activeWallet !== null ? wallets.indexOf(activeWallet) : -1;
    const walletLabel = (walletIndex >= 0) ? getCollectiblesWalletLabel(wallets[walletIndex]) : '';
    const walletCaption = (walletLabel.length > WALLET_CAPTION_LENGTH) ? `${walletLabel.substring(0, WALLET_CAPTION_LENGTH)}...` : walletLabel;
    const sortOptions = getCollectionsSortOptions();
    const byId = new Map<string, CollectiblesCollection>(collections.map(collection => [ collection.data.collectionId, collection ]));
    const listed = order.map(id => byId.get(id)).filter((collection): collection is CollectiblesCollection => !!collection);
    const searching = search.length > 0;

    return (
        <Region
            name="collectionsContainer"
            layout={{ position: 'absolute', left: 0, width: 485, top: 125, height: 429 }}
        >
            {ready && (
                <Region
                    name="loaded_content"
                    layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                >
                    <Dropmenu
                        variant="3"
                        tintColor={wallets.length ? WALLET_MENU_ENABLED_COLOR : WALLET_MENU_DISABLED_COLOR}
                        disabled={(walletAddresses !== null) && !wallets.length}
                        caption={walletAddresses ? walletCaption : 'Collector Wallet'}
                        options={wallets.map((wallet, index) => ({ key: wallet, label: getCollectiblesWalletLabel(wallet), selected: index === walletIndex, onSelect: () => selectCollectionsWallet(send, index) }))}
                        layout={{ position: 'absolute', left: 4, width: 184, top: 4, height: 24 }}
                    />
                    <Dropmenu
                        variant="3"
                        caption={sortOptions[sort] ?? 'Sort'}
                        options={sortOptions.map((label, index) => ({ key: index, label, selected: index === sort, onSelect: () => selectCollectionsSort(index) }))}
                        layout={{ position: 'absolute', left: 4, width: 184, top: 32, height: 24 }}
                    />
                    <Border
                        variant="105"
                        name="searchContainer"
                        layout={{ position: 'absolute', left: 4, width: 184, top: 60, height: 24 }}
                    >
                        <Region
                            name="buttonContainer"
                            layout={{ position: 'absolute', left: 160, width: 24, top: 0, height: 24, overflow: 'hidden' }}
                        >
                            {searching && (
                                <ThemeImage
                                    name="search_icon"
                                    src={LayoutImage('shared/icons_close.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                    layout={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20 }}
                                />
                            )}
                            <Button
                                variant="100"
                                name="search_clear_button"
                                tooltip="clear"
                                onPointerTap={() => setCollectionsSearch('')}
                                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 32 }}
                            />
                        </Region>
                        <TextInput
                            value={search}
                            onChange={setCollectionsSearch}
                            textStyle="il_regular"
                            flashPlacement
                            backgroundColor={null}
                            focusedBackgroundColor={null}
                            layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20 }}
                        />
                        {!searching && (
                            <ThemeText
                                text={t('generic.search')}
                                textStyle="il_regular"
                                clip
                                name="search_placeholder"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20 }}
                            />
                        )}
                    </Border>
                    <Region
                        name="navigationContainer"
                        layout={{ position: 'absolute', left: 4, width: 184, top: 88, height: 341 }}
                    >
                        <Border
                            variant="6"
                            blend={0.5}
                            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 341 }}
                        />
                        <ScrollArea
                            orientation="vertical"
                            variant="3"
                            layout={{ position: 'absolute', left: 3, width: 178, top: 5, height: 331 }}
                        >
                            <Region
                                name="navigationList"
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                {listed.filter(collection => isCollectionShownBySearch(collection, search)).map(collection => (
                                    <CollectiblesNavigationItem
                                        key={collection.data.collectionId}
                                        title={t(`collectibles.set.${collection.data.collectionId}`, collection.data.collectionName)}
                                        active={collection.data.collectionId === activeCollectionId}
                                        progress={{ collected: collection.collectedItemCount, total: collection.data.items.length }}
                                        onSelect={() => activateCollection(send, collection.data.collectionId)}
                                    />
                                ))}
                            </Region>
                        </ScrollArea>
                    </Region>
                    {(listed.length > 0) && collectionView && (
                        <CollectiblesCollectionView view={collectionView} />
                    )}
                </Region>
            )}
            {!ready && <CollectiblesLoadingView />}
        </Region>
    );
};
