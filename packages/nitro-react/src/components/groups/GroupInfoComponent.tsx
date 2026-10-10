/**
 * Mounts the group details window - Flash's `DetailsWindowCtrl`, which shows itself when a
 * `HabboGroupDetailsMessage` arrives with `openDetails` set and hides on its own close button,
 * on a room change and when the group it shows is deleted. There is no window name for it: what
 * is on screen is what the store's `infoGroupId` says, as it is in the client.
 */
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { useGroupDetailsHandlers } from '#base/hooks';
import { GroupInfoView } from '#base/views/groups/GroupInfoView';

export const GroupInfoComponent = () => {
    const groupId = useGroupStore(x => x.infoGroupId);
    const details = useGroupStore(x => (x.infoGroupId ? x.detailsById[x.infoGroupId] : undefined));
    const { closeGroupInfo } = useGroupActions();
    const handlers = useGroupDetailsHandlers(groupId ?? 0, details);

    if (!groupId || !details) return null;

    return (
        <GroupInfoView
            details={details}
            onClose={closeGroupInfo}
            {...handlers}
        />
    );
};
