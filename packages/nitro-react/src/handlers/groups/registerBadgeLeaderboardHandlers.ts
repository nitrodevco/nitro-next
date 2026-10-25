/** `BadgeLeaderboardController.registerMessageEvents`: its one packet, handed to its data server. */
import { BadgeLeaderboardResultMessage } from '@nitrodevco/nitro-packets';

import { onBadgeLeaderboardResult } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerBadgeLeaderboardHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(BadgeLeaderboardResultMessage, data => onBadgeLeaderboardResult(send, data)),
]);
