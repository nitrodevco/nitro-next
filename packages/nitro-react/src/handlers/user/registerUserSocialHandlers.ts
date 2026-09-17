import { BlockListInitComposer, BlockListMessage, BlockUserUpdateMessage, GetIgnoredUsersComposer, HabboGroupBadgesMessage, HabboGroupDetailsMessage, IgnoredUsersMessage, IgnoreResultMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The lists the avatar menu consults about other people - who is ignored, who is blocked - and
 * the group badges seen so far. `SessionDataManager` asked for both lists once the user was known,
 * and kept them current from the server's answers to every ignore and block.
 */
export const registerUserSocialHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setIgnoredUsers, applyIgnoreResult, setBlockedUsers, applyBlockUpdate, mergeGroupBadges, setGroupDetails } = userStore.getState();

    return subscribeAll(subscribe, [
        on(UserObjectMessage, () => {
            send(new GetIgnoredUsersComposer({}));
            send(new BlockListInitComposer({}));
        }),

        on(IgnoredUsersMessage, data => setIgnoredUsers(data.userIds)),

        on(IgnoreResultMessage, data => applyIgnoreResult(data.result, data.userId)),

        on(BlockListMessage, data => setBlockedUsers(data.userIds)),

        on(BlockUserUpdateMessage, data => applyBlockUpdate(data.result, data.userId)),

        on(HabboGroupBadgesMessage, data => mergeGroupBadges(data.badges)),

        on(HabboGroupDetailsMessage, data => setGroupDetails(data.data)),
    ]);
};
