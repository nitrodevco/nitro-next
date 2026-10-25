import { useUserStore } from '../useUserStore';

/** Whether the hotel is shutting down (`SessionDataManager.onAvailabilityStatus`). */
export const useIsSystemShutdown = () => useUserStore(x => x.systemShutdown);
