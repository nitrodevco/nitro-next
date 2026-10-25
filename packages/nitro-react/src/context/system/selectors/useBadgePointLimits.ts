import { useSystemStore } from '../useSystemStore';

/** The achievement badges' point limits by badge code and level, from `BadgePointLimitsMessage`. */
export const useBadgePointLimits = () => useSystemStore(x => x.badgePointLimits);
