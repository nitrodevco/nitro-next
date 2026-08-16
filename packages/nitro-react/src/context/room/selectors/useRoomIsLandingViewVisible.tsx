import { useRoomContext } from "../useRoomContext";

export const useRoomIsLandingViewVisible = () => useRoomContext(x => x.landingViewVisible);