/**
 * Mounts the welcome window a new group opens with - Flash's `GroupCreatedWindowCtrl`, shown by
 * `onGuildCreated` and closed by either of its two buttons, which also ask for the group's details
 * so the details window opens on it.
 */
import { requestGroupDetails } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { GroupCreatedView } from '#base/views/groups/GroupCreatedView';

export const GroupCreatedComponent = () => {
    const createdGroupId = useGroupStore(x => x.createdGroupId);
    const { setCreatedGroupId } = useGroupActions();
    const { send } = useWebSocketContext();

    if (!createdGroupId) return null;

    return (
        <GroupCreatedView onClose={() => {
            setCreatedGroupId(0);
            requestGroupDetails(send, createdGroupId);
        }}
        />
    );
};
