import { useTranslation } from '#base/context/system';
import { getPurseHasClubLeft, useOwnClubSubscription } from '#base/context/user';
import { GetFriendlyTime } from '#base/utils';

/**
 * The club button's caption - `PurseClubArea.onClubChanged`: the join text without club left,
 * otherwise the time left as a short friendly time, in minutes once under a day.
 */
export const usePurseClubText = () => {
    const subscription = useOwnClubSubscription();
    const t = useTranslation();

    if (!getPurseHasClubLeft(subscription)) return t('purse.clubdays.zero.amount.text', 'Get');

    const minutes = subscription.minutesUntilExpiration;

    if (minutes < 1440) return GetFriendlyTime(t, minutes * 60, '.short');

    return GetFriendlyTime(t, ((subscription.clubPeriods * 31) + subscription.clubDays) * 86400, '.short');
};
