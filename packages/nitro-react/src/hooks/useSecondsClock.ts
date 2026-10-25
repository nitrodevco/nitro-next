/**
 * `performance.now()` for countdowns, refreshed every second: reading the time during render is
 * impure, so a component that counts down reads it through this instead - the monotonic `useClock`
 * at a second.
 */
import { useClock } from './useClock';

export const useSecondsClock = () => useClock('monotonic', 1000);
