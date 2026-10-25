/**
 * The club centre's pure helpers - Flash's `clubcenter/util/BadgeResolver` (which club badge the
 * user shows) and `ClubStatus` with `HabboClubCenter.resolveClubStatus`. `CLUB_BADGES` is
 * `BadgeResolver.CLUB_BADGES` entry for entry; `drift/constants.py` holds it to the class.
 */
import type { ClubSubscription } from '#base/context/user';

/** `BadgeResolver.DEFAULT_BADGE`. */
export const DEFAULT_CLUB_BADGE = 'HC1';

/** `BadgeResolver.CLUB_BADGES`, lowest first: the last one the user owns is the one shown. */
export const CLUB_BADGES: readonly string[] = [ 'ACH_VipHC1', 'ACH_VipHC2', 'ACH_VipHC3', 'ACH_VipHC4', 'ACH_VipHC5', 'HC1', 'HC2', 'HC3', 'HC4', 'HC5' ];

/** `BadgeResolver.resolveClubBadgeId`: the last of `CLUB_BADGES` among the badge codes, `undefined` for none. */
export const resolveClubBadgeId = (badgeCodes: readonly string[]): string | undefined => {
    let badgeId: string | undefined = undefined;

    for (const code of CLUB_BADGES) {
        if (badgeCodes.includes(code)) badgeId = code;
    }

    return badgeId;
};

/** `ClubStatus`. */
export const CLUB_STATUS_ACTIVE = 'active';
export const CLUB_STATUS_NONE = 'none';
export const CLUB_STATUS_EXPIRED = 'expired';

/** `HabboClubCenter.resolveClubStatus`: club days left, club once had, or never. */
export const resolveClubStatus = (subscription: ClubSubscription): string => {
    if (subscription.clubDays > 0) return CLUB_STATUS_ACTIVE;

    if ((subscription.pastClubDays > 0) || (subscription.pastVipDays > 0)) return CLUB_STATUS_EXPIRED;

    return CLUB_STATUS_NONE;
};
