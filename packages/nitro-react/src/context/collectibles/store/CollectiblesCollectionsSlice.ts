/**
 * The collections tab - Flash `tabs/CollectionsTab` and the `tabs/subviews/CollectionView` of the
 * collection it shows: the wallet's sets (`onNftCollectionsMessage`), the order the navigation
 * list was filled in (`onSortSelectAction`, which only runs on a sort pick), the search text, the
 * active set, and the set's view - which preview it shows (`initCollectionPreview`,
 * `initMintedItemPreview`), the completion box's item and its claim button.
 *
 * The collection view's state is written when Flash computes it (`initRewardItem`,
 * `onClickClaim`, `claimingFinished`), not derived on every render: a claim sent puts the set's
 * bonus in its claiming state, which would move the preview on to the reward at once, where Flash
 * keeps the bonus up with its button disabled until the answer.
 */
import { StateCreator } from 'zustand';

import { CollectiblePreview } from './CollectiblesPreview';
import { CollectiblesCollection } from './CollectiblesProducts';

/** `CollectionView.PREVIEW_STATUS_*`. */
export const COLLECTION_PREVIEW_STATUS_NONE = 0;
export const COLLECTION_PREVIEW_STATUS_BONUS = 1;
export const COLLECTION_PREVIEW_STATUS_REWARD = 2;
export const COLLECTION_PREVIEW_STATUS_COLLECTION = 3;
export const COLLECTION_PREVIEW_STATUS_ITEM = 4;

/** The sort menu's options, in `populateSortOptions`' order. */
export const COLLECTIONS_SORT_DEFAULT = 0;
export const COLLECTIONS_SORT_PROGRESS = 1;
export const COLLECTIONS_SORT_SCORE = 2;

/** A `CollectionView`: the windows of `collection_content` it sets. */
export interface CollectiblesCollectionView {
    collectionId: string;
    /** `_previewStatus`. */
    previewStatus: number;
    /** `§_-tC§`: the grid item selected, -1 for none. */
    selectedItemIndex: number;
    /** What `§_-318§` shows. */
    preview: CollectiblePreview;
    /** `bonus_or_reward_container`: the item `initRewardItem` put up, none when it is hidden. */
    completionItem: 'bonus' | 'reward' | null;
    /** `reward_furni_name`. */
    completionItemName: string;
    /** `claim_button`: enabled while the item's claiming state is none, visible while it may be claimed. */
    claimEnabled: boolean;
    claimVisible: boolean;
    /** `preview_furni_name`, for the selected item. */
    productName: string;
    /** `product_info_container`: shown while `product_name_container` is hovered. */
    productInfoVisible: boolean;
    /** The three `product_info_entry_template` rows `initInfoEntries` adds: type, rarity, XP. */
    productInfoEntries: { key: string; value: string }[];
}

type State = {
    /** `§_-Y1e§`: the sets were asked for and have not arrived. */
    collectionsWaiting: boolean;
    /** `§_-31s§` (`setReady`): `loaded_content` is up rather than `loading_contents`. */
    collectionsReady: boolean;
    /** `§_-O1I§`: the sets as the server sent them. */
    collections: CollectiblesCollection[];
    /** The navigation list: set ids in the order the last sort filled it. */
    collectionsOrder: string[];
    /** `sort_selection.selection`, -1 before the first pick. */
    collectionsSort: number;
    /** `search_input`'s text. */
    collectionsSearch: string;
    /** `§_-21l§`. */
    activeCollectionId: string | null;
    /** `§_-GQ§`. */
    collectionView: CollectiblesCollectionView | null;
};

type Actions = {
    patchCollectiblesCollections: (patch: Partial<State>) => void;
    /** Replaces one set, by id - a claim state moving on. */
    updateCollectiblesCollection: (collectionId: string, update: (collection: CollectiblesCollection) => CollectiblesCollection) => void;
    patchCollectiblesCollectionView: (patch: Partial<CollectiblesCollectionView>) => void;
};

export const CollectiblesCollectionsSliceInitialState: State = {
    collectionsWaiting: false,
    collectionsReady: false,
    collections: [],
    collectionsOrder: [],
    collectionsSort: -1,
    collectionsSearch: '',
    activeCollectionId: null,
    collectionView: null,
};

export type CollectiblesCollectionsSlice = State & Actions;

export const createCollectiblesCollectionsSlice: StateCreator<CollectiblesCollectionsSlice, [], [], CollectiblesCollectionsSlice> = set => ({
    ...CollectiblesCollectionsSliceInitialState,
    patchCollectiblesCollections: patch => set(patch),
    updateCollectiblesCollection: (collectionId, update) => set(x => ({ collections: x.collections.map(collection => ((collection.data.collectionId === collectionId) ? update(collection) : collection)) })),
    patchCollectiblesCollectionView: patch => set(x => (x.collectionView ? { collectionView: { ...x.collectionView, ...patch } } : x)),
});
