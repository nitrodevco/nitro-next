/** The embedded `GroupDetailsCtrl` inside `ExtendedProfileWindowCtrl`, using the shared group view. */
import { GUILD_MEMBER_SEARCH_MEMBERS, GUILD_MEMBER_SEARCH_PENDING } from '@nitrodevco/nitro-packets';

import { canDeleteAnyGroup, deleteGroup, goToGroupBaseRoom, joinGroup, leaveGroup, openGroupForum, openGroupFurniCatalog, openGroupManagement, showGroupBases, toggleGroupMembers } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupStore } from '#base/context/groups';
import { useConfigValue } from '#base/context/system';
import { GroupDetailsView } from '#base/views/groups/GroupInfoView';

export const UserProfileGroupDetailsView = ({ groupId }: { groupId: number }) => {
    const details = useGroupStore(x => x.detailsById[groupId]);
    const groupDeletionEnabled = useConfigValue<boolean>('group.deletion.enabled') === true;
    const { send } = useWebSocketContext();

    if (!groupId || !details) return null;

    // `onDeleteGuild`'s gate: the owner, or a moderator on anyone's group.
    const canDelete = groupDeletionEnabled && (details.isOwner || canDeleteAnyGroup());

    return (
        <GroupDetailsView
            details={details}
            canDelete={canDelete}
            onJoin={() => joinGroup(send, groupId)}
            onLeave={() => leaveGroup(send, groupId)}
            onManage={() => openGroupManagement(send, groupId)}
            onDelete={() => deleteGroup(send, groupId)}
            onMembers={() => toggleGroupMembers(send, groupId, GUILD_MEMBER_SEARCH_MEMBERS)}
            onPendingMembers={() => toggleGroupMembers(send, groupId, GUILD_MEMBER_SEARCH_PENDING)}
            onBaseRoom={() => goToGroupBaseRoom(send, groupId, details.roomId)}
            onBuyFurni={openGroupFurniCatalog}
            onShowGroups={() => showGroupBases(send)}
            onForum={() => openGroupForum(send, groupId)}
        />
    );
};
