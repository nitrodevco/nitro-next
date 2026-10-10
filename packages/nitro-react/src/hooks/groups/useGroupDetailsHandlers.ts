import { GUILD_MEMBER_SEARCH_MEMBERS, GUILD_MEMBER_SEARCH_PENDING, IHabboGroupDetails } from '@nitrodevco/nitro-packets';

import { canDeleteAnyGroup, deleteGroup, goToGroupBaseRoom, joinGroup, leaveGroup, openGroupForum, openGroupFurniCatalog, openGroupManagement, showGroupBases, toggleGroupMembers } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue } from '#base/context/system';

/**
 * What a group's details view does - `GroupDetailsCtrl`, shared by the details window
 * (`DetailsWindowCtrl`) and the extended profile's embedded copy: join, leave, manage, delete,
 * the member lists, the base room, the furni catalogue page, the group bases and the forum, and
 * `onDeleteGuild`'s gate (`group.deletion.enabled`, and the owner or a moderator on anyone's group).
 */
export const useGroupDetailsHandlers = (groupId: number, details: IHabboGroupDetails | undefined) => {
    const groupDeletionEnabled = useConfigValue<boolean>('group.deletion.enabled') === true;
    const { send } = useWebSocketContext();

    return {
        canDelete: !!details && groupDeletionEnabled && (details.isOwner || canDeleteAnyGroup()),
        onJoin: () => joinGroup(send, groupId),
        onLeave: () => leaveGroup(send, groupId),
        onManage: () => openGroupManagement(send, groupId),
        onDelete: () => deleteGroup(send, groupId),
        onMembers: () => toggleGroupMembers(send, groupId, GUILD_MEMBER_SEARCH_MEMBERS),
        onPendingMembers: () => toggleGroupMembers(send, groupId, GUILD_MEMBER_SEARCH_PENDING),
        onBaseRoom: () => goToGroupBaseRoom(send, groupId, details?.roomId ?? 0),
        onBuyFurni: openGroupFurniCatalog,
        onShowGroups: () => showGroupBases(send),
        onForum: () => openGroupForum(send, groupId),
    };
};
