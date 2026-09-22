/**
 * The hub window itself - Flash `CollectiblesView` and what `CollectiblesController` keeps for it:
 * whether the view has been built (it is built once, on the first `collectibles/open`, and only
 * hidden and shown after that), the selected tab, the wallets (`onCollectableWalletAddressMessage`
 * and `setActiveWalletIndex`), the collector score header (`onCollectionsScoreMessage`) and the
 * controller's preview easter egg counter.
 */
import { StateCreator } from 'zustand';

import { COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL, CollectiblePreviewEasterEgg } from './CollectiblesPreview';

/** `CollectiblesView.TAB_*`: the tab buttons' names in `collectible_view.xml`. */
export const COLLECTIBLES_TAB_COLLECTIONS = 'top_view_collections_button';
export const COLLECTIBLES_TAB_MINT = 'top_view_minting_button';
export const COLLECTIBLES_TAB_INFO = 'top_view_info_button';
export const COLLECTIBLES_TAB_TRANSFER = 'top_view_transfer_button';
export const COLLECTIBLES_TAB_SHOP = 'top_view_shop_button';
export const COLLECTIBLES_TAB_REWARDS = 'top_view_rewards_button';
export const COLLECTIBLES_TAB_COLLECTOR_PROFILE = 'top_view_profile_button';
export const COLLECTIBLES_TAB_LEVELS = 'top_view_levels_button';

/** `CollectiblesView.STARDUST_WALLET_DISPLAY_NAME`: how the wallet menus name the Collector wallet. */
export const COLLECTIBLES_STARDUST_WALLET_DISPLAY_NAME = 'Collector Wallet';

/** `collector_level_bg`'s layout colour, which `onCollectionsScoreMessage` also picks for levels 1-5. */
export const COLLECTIBLES_LEVEL_COLOR_DEFAULT = 8162450;

type State = {
    /** A `CollectiblesView` exists: its tabs have asked for their data and listen for it. */
    hubCreated: boolean;
    /** `_currentTab`. */
    currentTab: string;
    /** `§_-l1z§`: the wallets were asked for and have not arrived. */
    walletsRequesting: boolean;
    /** `_walletAddresses`: null until the first answer. */
    walletAddresses: string[] | null;
    /** `§_-T2L§`. */
    stardustWallet: string | null;
    /** `§_-02j§`. */
    activeWallet: string | null;
    /** `current_score_value`, `current_hiscore_value` and `collector_level` - `'0'` in the layout. */
    score: number;
    highestScore: number;
    level: number;
    /** `collector_level_bg` / `collector_level_bg2`'s colour. */
    levelColor: number;
    /** `CollectiblesController`'s `handlePreviewImageEasterEgg` memory. */
    previewEasterEgg: CollectiblePreviewEasterEgg;
};

type Actions = {
    patchCollectiblesHub: (patch: Partial<State>) => void;
};

export const CollectiblesHubSliceInitialState: State = {
    hubCreated: false,
    currentTab: COLLECTIBLES_TAB_REWARDS,
    walletsRequesting: false,
    walletAddresses: null,
    stardustWallet: null,
    activeWallet: null,
    score: 0,
    highestScore: 0,
    level: 0,
    levelColor: COLLECTIBLES_LEVEL_COLOR_DEFAULT,
    previewEasterEgg: COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL,
};

export type CollectiblesHubSlice = State & Actions;

export const createCollectiblesHubSlice: StateCreator<CollectiblesHubSlice, [], [], CollectiblesHubSlice> = set => ({
    ...CollectiblesHubSliceInitialState,
    patchCollectiblesHub: patch => set(patch),
});
