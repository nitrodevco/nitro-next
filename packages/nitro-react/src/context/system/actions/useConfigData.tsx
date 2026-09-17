import { useSystemStore } from '../useSystemStore';

export const useConfigData = () => useSystemStore(x => x.config);
