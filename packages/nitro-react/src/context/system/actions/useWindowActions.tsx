import { useShallow } from "zustand/shallow";

import { useSystemContext } from "../useSystemContext";

export const useWindowActions = () => useSystemContext(useShallow(x => ({
    toggleWindow: x.toggleWindow,
    showWindow: x.showWindow,
    hideWindow: x.hideWindow,
    bringWindowToFront: x.bringWindowToFront
})));