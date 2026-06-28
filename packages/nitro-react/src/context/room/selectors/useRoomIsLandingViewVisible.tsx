import { selectLandingViewVisible } from "#base/stores";

import { useRoomContext } from "../useRoomContext";

export const useRoomIsLandingViewVisible = () => useRoomContext(selectLandingViewVisible);