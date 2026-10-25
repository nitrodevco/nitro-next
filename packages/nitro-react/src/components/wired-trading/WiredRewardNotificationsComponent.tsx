/**
 * Mounts the open reward popups - `RewardNotificationController.§_-C15§`, oldest first, each
 * `RewardNotificationView` showing the reward it was opened for.
 */
import { useWiredRewardActions, useWiredTradingStore } from '#base/context/wired-trading';
import { WiredRewardNotificationView } from '#base/views/wired-trading/rewards/WiredRewardNotificationView';

export const WiredRewardNotificationsComponent = () => {
    const views = useWiredTradingStore(x => x.rewardViews);
    const rewardsById = useWiredTradingStore(x => x.rewardsById);
    const { closeRewardView } = useWiredRewardActions();

    return views.map((view) => {
        const reward = rewardsById[view.internalId];

        if (!reward) return null;

        return (
            <WiredRewardNotificationView
                key={view.internalId}
                view={view}
                reward={reward}
                onClose={() => closeRewardView(view.internalId)}
            />
        );
    });
};
