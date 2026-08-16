import { useConfigData } from "./useConfigData";

export const useConfigValue = <T,>(key: string) => useConfigData()[key] as T | undefined;