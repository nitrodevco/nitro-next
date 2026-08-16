import { useShallow } from "zustand/shallow";

import { useSystemContext } from "../useSystemContext";

export const useSystemActions = () => useSystemContext(useShallow(x => ({
    toggleWindow: x.toggleWindow,
    showWindow: x.showWindow,
    hideWindow: x.hideWindow,
    getLocalizationValue: x.getLocalizationValue,
    setLocalization: x.setLocalization,
    setLocalizationForFurniture: x.setLocalizationForFurniture,
})));