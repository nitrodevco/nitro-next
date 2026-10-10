/** The embedded `GroupDetailsCtrl` inside `ExtendedProfileWindowCtrl`, using the shared group view. */
import { useGroupStore } from '#base/context/groups';
import { useGroupDetailsHandlers } from '#base/hooks';
import { GroupDetailsView } from '#base/views/groups/GroupInfoView';

export const UserProfileGroupDetailsView = ({ groupId }: { groupId: number }) => {
    const details = useGroupStore(x => x.detailsById[groupId]);
    const handlers = useGroupDetailsHandlers(groupId, details);

    if (!groupId || !details) return null;

    return (
        <GroupDetailsView
            details={details}
            {...handlers}
        />
    );
};
