/**
 * The collectibles store's actions, every slice's. Zustand actions are created once and never
 * change, so they are read off the store a single time here rather than subscribed to: a component
 * using these re-renders for nothing.
 */
import { collectiblesStore } from '../store';

const state = collectiblesStore.getState();

const actions = {
    patchCollectiblesHub: state.patchCollectiblesHub,
    patchCollectiblesCollections: state.patchCollectiblesCollections,
    updateCollectiblesCollection: state.updateCollectiblesCollection,
    patchCollectiblesCollectionView: state.patchCollectiblesCollectionView,
    patchCollectiblesMint: state.patchCollectiblesMint,
    patchCollectiblesShop: state.patchCollectiblesShop,
    patchCollectiblesClaims: state.patchCollectiblesClaims,
    patchCollectiblesTransfer: state.patchCollectiblesTransfer,
    patchCollectiblesRewardBox: state.patchCollectiblesRewardBox,
    patchCollectiblesPurchase: state.patchCollectiblesPurchase,
};

export const useCollectiblesActions = () => actions;
