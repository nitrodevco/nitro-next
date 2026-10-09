/** `RewardTrackController`'s four packets. */
import { RewardTrackClaimResultMessage, RewardTrackPremiumPurchaseResultMessage, RewardTrackProgressMessage, RewardTracksMessage } from '@nitrodevco/nitro-packets';

import { onRewardTrackClaimResult, onRewardTrackPremiumPurchaseResult, onRewardTrackProgress, onRewardTracks } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerRewardTrackHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(RewardTracksMessage, onRewardTracks),
    on(RewardTrackProgressMessage, onRewardTrackProgress),
    on(RewardTrackClaimResultMessage, onRewardTrackClaimResult),
    on(RewardTrackPremiumPurchaseResultMessage, onRewardTrackPremiumPurchaseResult),
]);
