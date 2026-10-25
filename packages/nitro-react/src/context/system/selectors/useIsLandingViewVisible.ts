import { useSystemStore } from '../useSystemStore';

/** Whether the hotel view is showing - it is hidden while a room is. */
export const useIsLandingViewVisible = () => useSystemStore(x => x.landingViewVisible);
