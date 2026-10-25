import { useStore } from 'zustand';

import { GameCenterStore, gameCenterStore } from './store/GameCenterStore';

/**
 * A slice of the GameCenterStore (`GamesMainViewController`), re-rendering only when that slice
 * changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useGameCenterStore<T>(selector: (state: GameCenterStore) => T) {
    return useStore(gameCenterStore, selector);
}
