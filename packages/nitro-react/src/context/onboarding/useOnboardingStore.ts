import { useStore } from 'zustand';

import { OnboardingStore, onboardingStore } from './store/OnboardingStore';

/**
 * A slice of the OnboardingStore (`OnBoardingHcFlow`), re-rendering only when that slice changes.
 * It reads the app-wide singleton, so it works anywhere.
 */
export function useOnboardingStore<T>(selector: (state: OnboardingStore) => T) {
    return useStore(onboardingStore, selector);
}
