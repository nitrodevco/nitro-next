/**
 * Mounts the group banner a base room shows - Flash's `GroupRoomInfoCtrl`, which the room's own
 * `habboGroupId` opens and leaving the room closes. It is gated on `groupRoomInfo.enabled` and
 * only drawn for a guild (`refresh` returns early for a group that is not one).
 */
import { joinGroup, openGroupInfo, openGroupManagement } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { useConfigValue } from '#base/context/system';
import { GroupRoomInfoView } from '#base/views/groups/GroupRoomInfoView';

export const GroupRoomInfoComponent = () => {
    const roomGroupId = useGroupStore(x => x.roomGroupId);
    const details = useGroupStore(x => (x.roomGroupId ? x.detailsById[x.roomGroupId] : undefined));
    const expanded = useGroupStore(x => x.expanded);
    const enabled = useConfigValue<boolean>('groupRoomInfo.enabled') === true;
    const { toggleGroupRoomInfoExpanded } = useGroupActions();
    const { send } = useWebSocketContext();

    if (!enabled || !roomGroupId || !details || !details.isGuild) return null;

    return (
        <GroupRoomInfoView
            details={details}
            expanded={expanded}
            onToggle={toggleGroupRoomInfoExpanded}
            onInfo={() => openGroupInfo(send, roomGroupId)}
            onJoin={() => joinGroup(send, roomGroupId)}
            onManage={() => openGroupManagement(send, roomGroupId)}
        />
    );
};
