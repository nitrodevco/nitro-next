import { useSystemContext } from "../useSystemContext";

export const useIsLandingViewVisible = () => useSystemContext(x => x.landingViewVisible);
