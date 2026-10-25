import { useSystemStore } from '../useSystemStore';

/** The whole client configuration, as loaded into `SystemStore`. */
export const useConfigData = () => useSystemStore(x => x.config);
