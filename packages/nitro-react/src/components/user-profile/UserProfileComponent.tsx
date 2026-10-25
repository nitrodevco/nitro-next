/** Mounts the extended user profile - Flash's `ExtendedProfileWindowCtrl`. */
import { BlockUserComposer, UnblockUserComposer } from '@nitrodevco/nitro-packets';

import { askForAFriend, canBeAskedForAFriend, openClientLink, openProfile, searchRoomsByOwner, selectProfileGroup, showGroupBases, toggleProfileFavouriteGroup } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useIsWindowVisible, useTranslation, useWindowActions, useWindowParams } from '#base/context/system';
import { useOwnUserId, useUserStore } from '#base/context/user';
import { useProfileActions, useProfileStore } from '#base/context/user-profile';
import { UserProfileView } from '#base/views/user-profile/UserProfileView';

export const UserProfileComponent = () => {
    const visible = useIsWindowVisible('user_profile');
    const { userId } = useWindowParams('user_profile');
    const profile = useProfileStore(state => state.profile);
    const badges = useProfileStore(state => state.badges);
    const relationships = useProfileStore(state => state.relationships);
    const selectedGroupId = useProfileStore(state => state.selectedGroupId);
    const getLocalizationValue = useTranslation();
    const { hideWindow, showAlert, showConfirm, showWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const ownUserId = useOwnUserId();
    const isBlocked = useUserStore(state => state.blockedUserIds.includes(profile?.userId ?? -1));
    // `refreshHeader`: the add friend button follows the friend list, so one made a friend elsewhere loses it.
    const canAskForFriend = useUserStore(state => !!profile && canBeAskedForAFriend(profile.userId, state));
    const { markFriendRequestSent, selectGroup } = useProfileActions();
    const activityDisplayEnabled = useConfigBoolean('activity.point.display.enabled');
    const relationshipsEnabled = useConfigBoolean('relationship.status.enabled');

    if (!visible || !profile || !userId || (profile.userId !== userId)) return null;

    return (
        <UserProfileView
            key={profile.userId}
            profile={profile}
            badges={badges}
            relationships={relationships}
            selectedGroupId={selectedGroupId}
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
            // `onSelectGroup`: the group chosen, its details asked for.
            onSelectGroup={(groupId) => {
                selectGroup(groupId);
                selectProfileGroup(send, groupId);
            }}
            onShowGroups={() => showGroupBases(send)}
            onFavouriteGroup={(groupId, favourite) => {
                selectGroup(groupId);
                toggleProfileFavouriteGroup(send, groupId, favourite);
            }}
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
