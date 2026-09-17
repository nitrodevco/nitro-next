import { useSystemStore } from '../useSystemStore';

export const useIsLandingViewVisible = () => useSystemStore(x => x.landingViewVisible);
