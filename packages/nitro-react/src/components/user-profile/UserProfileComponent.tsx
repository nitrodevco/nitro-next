/** Mounts the extended user profile - Flash's `ExtendedProfileWindowCtrl`. */
import { BlockUserComposer, DeselectFavouriteHabboGroupComposer, SelectFavouriteHabboGroupComposer, UnblockUserComposer } from '@nitrodevco/nitro-packets';

import { askForAFriend, canBeAskedForAFriend, openClientLink, openProfile, requestGroupDetails, searchRoomsByOwner, showGroupBases } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useIsWindowVisible, useSystemActions, useWindowActions, useWindowParams } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useProfileActions, useProfileStore } from '#base/context/user-profile';
import { UserProfileView } from '#base/views/user-profile/UserProfileView';

export const UserProfileComponent = () => {
    const visible = useIsWindowVisible('user_profile');
    const { userId } = useWindowParams('user_profile');
    const profile = useProfileStore(state => state.profile);
    const badges = useProfileStore(state => state.badges);
    const relationships = useProfileStore(state => state.relationships);
    const { getLocalizationValue, hideWindow, showConfirm, showWindow } = useSystemActions();
    const { showAlert } = useWindowActions();
    const { send } = useWebSocketContext();
    const ownUserId = useUserStore(state => state.userId);
    const isBlocked = useUserStore(state => state.blockedUserIds.includes(profile?.userId ?? -1));
    // `refreshHeader`: the add friend button follows the friend list, so one made a friend elsewhere loses it.
    const canAskForFriend = useUserStore(state => !!profile && canBeAskedForAFriend(profile.userId, state));
    const { markFriendRequestSent } = useProfileActions();
    const activityDisplayEnabled = useConfigValue<boolean>('activity.point.display.enabled') === true;
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') === true;

    if (!visible || !profile || !userId || (profile.userId !== userId)) return null;

    return (
        <UserProfileView
            key={profile.userId}
            profile={profile}
            badges={badges}
            relationships={relationships}
            ownUserId={ownUserId}
            activityDisplayEnabled={activityDisplayEnabled}
            relationshipsEnabled={relationshipsEnabled}
            canAskForFriend={canAskForFriend}
            isBlocked={isBlocked}
            onClose={() => hideWindow('user_profile')}
            // `ExtendedProfileWindowCtrl.onAddAsFriend`: a refused request says nothing here; one that went out shows as sent.
            onAddFriend={() => {
                if (askForAFriend(send, profile.userId, profile.userName)) markFriendRequestSent(profile.userId);
            }}
            onRooms={() => searchRoomsByOwner(send, profile.userName)}
            onChangeLooks={() => showWindow('avatar_editor')}
            onChangeBadges={() => showWindow('inventory', { tab: 'badges' })}
            onBadgeCount={() => openClientLink(send, 'badge_leaderboard/0/-1/0')}
            onOpenProfile={openUserId => openProfile(send, openUserId)}
            onSelectGroup={groupId => requestGroupDetails(send, groupId)}
            onShowGroups={() => showGroupBases(send)}
            onFavouriteGroup={(groupId, favourite) => send(favourite ? new DeselectFavouriteHabboGroupComposer({ groupId }) : new SelectFavouriteHabboGroupComposer({ groupId }))}
            // `onRelationshipLink` -> `addFriendsAlertCallback`: the alert, then the friend list, the profile closed.
            onFindFriends={() => showAlert(getLocalizationValue('extendedprofile.add.friends.alert.title'), getLocalizationValue('extendedprofile.add.friends.alert.body'), {
                onClose: () => {
                    hideWindow('user_profile');
                    showWindow('friendlist');
                },
            })}
            onToggleBlock={() => showConfirm(
                getLocalizationValue(isBlocked ? 'extendedprofile.unblock_player.title' : 'extendedprofile.block_player.title'),
                getLocalizationValue(isBlocked ? 'extendedprofile.unblock_player.desc' : 'extendedprofile.block_player.desc'),
                () => send(isBlocked ? new UnblockUserComposer({ userId: profile.userId }) : new BlockUserComposer({ userId: profile.userId })),
            )}
        />
    );
};
