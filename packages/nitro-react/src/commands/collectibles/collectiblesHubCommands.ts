/**
 * The collectibles hub - Flash `CollectiblesView`: the hub, its tabs and wallets.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { GetCollectibleWalletAddressesComposer, GetCollectorScoreComposer } from '@nitrodevco/nitro-packets';

import { COLLECTIBLES_STARDUST_WALLET_DISPLAY_NAME, collectiblesStore } from '#base/context/collectibles';
import { Send } from '#base/context/communication';

import { setCollectionsActiveWallet } from './collectiblesCollectionsCommands';
import { initializeMintData, setMintActiveWallet } from './collectiblesMintCommands';
import { requestRewardClaims } from './collectiblesRewardClaimsCommands';
import { requestNftStoreOffers } from './collectiblesShopCommands';
import { initializeTransferData, initializeTransferWallets } from './collectiblesTransferCommands';

/**
 * `showCollectibleHub` for a hub not built yet - `new CollectiblesView`: the wallets are asked for
 * (`requestWalletAddresses`) and every tab is built at once (`refresh` builds the rewards tab,
 * `initWidgets` the others), each asking for what it shows. Once built the hub is only shown and
 * hidden, so this does nothing the second time.
 */
export const createCollectiblesHub = (send: Send) => {
    const state = collectiblesStore.getState();

    if (state.hubCreated) return;

    state.patchCollectiblesHub({ hubCreated: true });

    // `refresh` -> `new RewardClaimsTab`: not ready, nothing listed, the claim button disabled.
    state.patchCollectiblesClaims({ claimsReady: false, claimsButtonEnabled: false });

    requestCollectibleWalletAddresses(send);

    // `initWidgets`: `CollectionsTab` (not ready until a wallet is chosen), `MintInventoryListTab`,
    // `TransferNftsTab`, `ShopTab`.
    state.patchCollectiblesCollections({ collectionsReady: false });
    initializeMintData(send);
    initializeTransferData(send);
    requestNftStoreOffers(send);
};

/** `requestWalletAddresses`. */
const requestCollectibleWalletAddresses = (send: Send) => {
    const { walletsRequesting, patchCollectiblesHub } = collectiblesStore.getState();

    if (walletsRequesting) return;

    patchCollectiblesHub({ walletsRequesting: true });
    send(new GetCollectibleWalletAddressesComposer({}));
};

/** `onTab`: `refresh` shows the tab's container. Every tab was built with the hub. */
export const selectCollectiblesTab = (tab: string) => collectiblesStore.getState().patchCollectiblesHub({ currentTab: tab });

/** `nonStardustWallets`. */
export const getNonStardustWallets = (): string[] | null => {
    const { walletAddresses, stardustWallet } = collectiblesStore.getState();

    if (!walletAddresses) return null;

    return walletAddresses.filter(wallet => wallet !== stardustWallet);
};

/** How the wallet menus list a wallet: the Collector wallet by its display name. */
export const getCollectiblesWalletLabel = (wallet: string): string => ((wallet === collectiblesStore.getState().stardustWallet) ? COLLECTIBLES_STARDUST_WALLET_DISPLAY_NAME : wallet);

/**
 * `onCollectableWalletAddressMessage`: the wallets go to the collections tab (all of them), the
 * transfer tab (all but the Collector wallet) and the rewards tab (all, each asked for its claims),
 * and the first becomes the active one.
 */
export const onCollectibleWalletAddresses = (send: Send, stardustWallet: string, walletAddresses: string[]) => {
    collectiblesStore.getState().patchCollectiblesHub({ walletsRequesting: false, walletAddresses, stardustWallet });

    initializeTransferWallets(getNonStardustWallets() ?? []);
    requestRewardClaims(send, walletAddresses);
    setCollectiblesActiveWalletIndex(send, 0);
};

/**
 * `setActiveWalletIndex`: an index out of range, or the wallet already active, changes nothing;
 * otherwise the collections and minting tabs follow the wallet and its collector score is asked for.
 */
export const setCollectiblesActiveWalletIndex = (send: Send, index: number) => {
    const { walletAddresses, activeWallet, patchCollectiblesHub } = collectiblesStore.getState();

    if (!walletAddresses) return;

    if ((walletAddresses.length > 0) && ((index < 0) || (index >= walletAddresses.length) || (walletAddresses[index] === activeWallet))) return;

    const wallet = (walletAddresses.length > 0) ? walletAddresses[index] : null;

    patchCollectiblesHub({ activeWallet: wallet });

    setCollectionsActiveWallet(send, wallet);
    setMintActiveWallet(send, wallet);

    if (wallet !== null) send(new GetCollectorScoreComposer({ walletAddress: wallet }));
};

/** `onCollectionsScoreMessage`: the level colour steps every five levels. */
export const onCollectorScore = (score: number, highestScore: number, level: number) => {
    let levelColor: number;

    switch (Math.max(0, Math.trunc((level - 1) / 5))) {
        case 0: levelColor = 8162450; break;
        case 1: levelColor = 2529547; break;
        case 2: levelColor = 32234; break;
        case 3: levelColor = 13828339; break;
        default: levelColor = 15571457;
    }

    collectiblesStore.getState().patchCollectiblesHub({ score, highestScore, level, levelColor });
};
