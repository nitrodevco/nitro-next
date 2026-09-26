/**
 * The extended profile response and its follow-up requests - Flash's
 * `ExtendedProfileWindowCtrl.onProfile`, `onProfileChanged`, `onRelationshipStatusInfo` and
 * `onUserBadges`.
 */
import { CloseConnectionMessage, ExtendedProfileChangedMessage, ExtendedProfileMessage, GetExtendedProfileComposer, GetRelationshipStatusInfoComposer, GetSelectedBadgesComposer, HabboUserBadgesMessage, RelationshipStatusInfoEventMessage } from '@nitrodevco/nitro-packets';

import { requestGroupDetails } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { profileStore } from '#base/context/user-profile';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerProfileHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setProfile, setBadges, setRelationships, clearProfile } = profileStore.getState();

    return subscribeAll(subscribe, [
        on(ExtendedProfileMessage, (data) => {
            // `HabboGroupsManager.onExtendedProfile` only opens when the response requests it.
            if (!data.openProfileWindow) return;

            setProfile(data);
            systemStore.getState().showWindow('user_profile', { userId: data.userId });

            // `ExtendedProfileWindowCtrl.refresh`: both answers are scoped to the visible profile.
            send(new GetSelectedBadgesComposer({ userId: data.userId }));
            send(new GetRelationshipStatusInfoComposer({ userId: data.userId }));
            if (data.guilds.length) requestGroupDetails(send, data.guilds[0].groupId);
        }),

        on(ExtendedProfileChangedMessage, (data) => {
            const { visibleWindows } = systemStore.getState();

            if ((visibleWindows.user_profile?.userId !== data.userId) || (profileStore.getState().profile?.userId !== data.userId)) return;

            // `ExtendedProfileWindowCtrl.onProfileChanged` re-fetches the open profile.
            send(new GetExtendedProfileComposer({ userId: data.userId, openProfile: true }));
        }),

        on(HabboUserBadgesMessage, data => setBadges(data.userId, data.selectedBadges)),
        on(RelationshipStatusInfoEventMessage, data => setRelationships(data.userId, data.relationships)),

        on(CloseConnectionMessage, () => {
            clearProfile();
            systemStore.getState().hideWindow('user_profile');
        }),
    ]);
};
