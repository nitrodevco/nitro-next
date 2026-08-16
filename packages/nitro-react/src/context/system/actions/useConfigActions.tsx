import { useShallow } from "zustand/shallow";

import { useSystemContext } from "../useSystemContext";

export const useConfigActions = () => useSystemContext(useShallow(x => ({
    setConfig: x.setConfig,
    setConfigValue: x.setConfigValue,
})));