/**
 * What the vault does - the public methods of Flash's `catalog/earnings/EarningsController`
 * (`showEarnings`, `claimReward`) and the claim path of `EarningsView.windowProcedure` /
 * `performClaim`. Each sends through `SessionDataManager` the packet Flash sends there
 * (`getIncomeRewardStatus` -> `IncomeRewardStatusComposer`, `claimReward` ->
 * `IncomeRewardClaimComposer`) and writes `earningsStore`.
 *
 * `EarningsView.windowProcedure` also answers `vaultWithdraw_button` / `vaultWithdrawAll_button`
 * (`withdrawVaultCredits` -> `WithdrawCreditVaultComposer`) and `vaultOpenShop_button`
 * (`openCatalogue`), but `vault_view.xml` has none of those elements - they belong to the credit
 * vault the layout no longer draws - so nothing here can be clicked to send them and they are not
 * ported. `SessionDataManager.getCreditVaultStatus` has no caller in the client either.
 *
 * The reference server (turbo-cloud) answers none of the income reward packets: every flow
 * follows Flash, and the vault shows its zeroes until a server does.
 */
import { IncomeRewardClaimComposer, IncomeRewardStatusComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { earningsDucketValueForCategory, earningsStore } from '#base/context/earnings';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `getInteger("duckets.soft_limit", 2147483647)`'s default. */
const DUCKETS_SOFT_LIMIT_DEFAULT = 2147483647;

/** The purse's duckets: `getPurse().getActivityPointsForType(0)`. */
const ACTIVITY_POINT_TYPE_DUCKETS = 0;

/** `SessionDataManager.getIncomeRewardStatus`. */
export const requestIncomeRewardStatus = (send: Send) => send(new IncomeRewardStatusComposer({}));

/**
 * `EarningsController.showEarnings` - what `habboUI/open/vault` does: the purse's dot goes, the
 * status is asked for, and a vault that is not up is built fresh (`new EarningsView`, centred).
 * One that is up stays as it is.
 */
export const showEarnings = (send: Send) => {
    const { showingIndicator, setShowingIndicator, resetView, setViewCreated } = earningsStore.getState();

    if (showingIndicator) setShowingIndicator(false);

    requestIncomeRewardStatus(send);

    const { visibleWindows, showWindow } = systemStore.getState();

    if (visibleWindows.earnings) return;

    resetView();
    setViewCreated(true);
    showWindow('earnings');
};

/** `EarningsView.performClaim`: the clicked button is disabled until the answer, and `claimReward` sends the category. */
const performEarningsClaim = (send: Send, elementName: string, rewardCategory: number) => {
    if (!systemStore.getState().visibleWindows.earnings) return;

    earningsStore.getState().setElementEnabled(elementName, false);

    send(new IncomeRewardClaimComposer({ rewardCategory }));
};

/**
 * A claim button of `EarningsView.windowProcedure` - a category's or `claim_all_btn`
 * (`ALL_CATEGORIES`). When the duckets it would add take the purse past `duckets.soft_limit`, the
 * user confirms first (`${earning.exceeding_limit}`); cancelling claims nothing.
 */
export const claimEarnings = (send: Send, elementName: string, rewardCategory: number) => {
    const { config, interpolate, showConfirm } = systemStore.getState();
    const newAmountOfDuckets = earningsDucketValueForCategory(earningsStore.getState().values, rewardCategory);
    const currentDuckets = userStore.getState().activityPoints[ACTIVITY_POINT_TYPE_DUCKETS] ?? 0;
    const configuredLimit = config['duckets.soft_limit'];
    const softLimit = (configuredLimit === undefined) ? DUCKETS_SOFT_LIMIT_DEFAULT : Math.trunc(Number(configuredLimit));

    if ((newAmountOfDuckets > 0) && ((newAmountOfDuckets + currentDuckets) > softLimit)) {
        showConfirm(interpolate('${generic.alert.title}'), interpolate('${earning.exceeding_limit}'), () => performEarningsClaim(send, elementName, rewardCategory));

        return;
    }

    performEarningsClaim(send, elementName, rewardCategory);
};
