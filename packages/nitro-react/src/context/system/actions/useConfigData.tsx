import { useSystemContext } from "../useSystemContext";

export const useConfigData = () => useSystemContext(x => x.config);