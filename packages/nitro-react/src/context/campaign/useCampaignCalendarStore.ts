import { useStore } from 'zustand';

import { CampaignCalendarStore, campaignCalendarStore } from './store/CampaignCalendarStore';

/**
 * A slice of the CampaignCalendarStore (`HabboCampaigns`), re-rendering only when that slice changes.
 * It reads the app-wide singleton, so it works anywhere.
 */
export function useCampaignCalendarStore<T>(selector: (state: CampaignCalendarStore) => T) {
    return useStore(campaignCalendarStore, selector);
}
