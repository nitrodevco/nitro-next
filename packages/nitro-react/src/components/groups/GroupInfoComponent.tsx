/**
 * Mounts the group details window - Flash's `DetailsWindowCtrl`, which shows itself when a
 * `HabboGroupDetailsMessage` arrives with `openDetails` set and hides on its own close button,
 * on a room change and when the group it shows is deleted. There is no window name for it: what
 * is on screen is what the store's `infoGroupId` says, as it is in the client.
 */
import { GUILD_MEMBER_SEARCH_MEMBERS, GUILD_MEMBER_SEARCH_PENDING } from '@nitrodevco/nitro-packets';

import { canDeleteAnyGroup, deleteGroup, goToGroupBaseRoom, joinGroup, leaveGroup, openGroupForum, openGroupFurniCatalog, openGroupManagement, showGroupBases, toggleGroupMembers } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { useConfigValue } from '#base/context/system';
import { GroupInfoView } from '#base/views/groups/GroupInfoView';

export const GroupInfoComponent = () => {
    const groupId = useGroupStore(x => x.infoGroupId);
    const details = useGroupStore(x => (x.infoGroupId ? x.detailsById[x.infoGroupId] : undefined));
    const groupDeletionEnabled = useConfigValue<boolean>('group.deletion.enabled') === true;
    const { closeGroupInfo } = useGroupActions();
    const { send } = useWebSocketContext();

    if (!groupId || !details) return null;

    // `onDeleteGuild`'s gate: the owner, or a moderator on anyone's group.
    const canDelete = groupDeletionEnabled && (details.isOwner || canDeleteAnyGroup());

    return (
        <GroupInfoView
            details={details}
            canDelete={canDelete}
            onClose={closeGroupInfo}
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
