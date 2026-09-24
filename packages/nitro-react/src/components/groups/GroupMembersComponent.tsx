/**
 * Mounts the members window - Flash's `GuildMembersWindowCtrl`. The window is on screen exactly
 * while a page of members is loaded, which is how the controller works: `onMembersClick` asks and
 * `onGuildMembers` shows.
 *
 * The typing delay is Flash's own `Timer(1000, 1)`: every keystroke restarts it and the search
 * only goes out when it fires, with the spinner up in the meantime (`onFilterMembers` ->
 * `onSearchTimer` -> `doSearch(0)`).
 */
import { useEffect } from 'react';

import { applyGroupMemberAction, blockGroupMember, removeGroupMember, searchGroupMembers, showGroupMemberProfile, stepGroupMemberPage } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { useConfigValue } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { GroupMembersView } from '#base/views/groups/GroupMembersView';

/** `GuildMembersWindowCtrl._timer` - how long typing pauses before the filter is searched for. */
const SEARCH_DELAY_MS = 1000;

export const GroupMembersComponent = () => {
    const members = useGroupStore(x => x.members);
    const filterText = useGroupStore(x => x.filterText);
    const searching = useGroupStore(x => x.searching);
    const blockingEnabled = useConfigValue<boolean>('group.blocking.enabled') === true;
    const ownUserId = useOwnUserId();
    const { closeGroupMembers, setGroupMembersFilterText, setGroupMembersSearching } = useGroupActions();
    const { send } = useWebSocketContext();

    // The filter the server already answered with needs no second search; anything else is a fresh one.
    const pendingFilter = members && (filterText !== members.userNameFilter) ? filterText : undefined;

    useEffect(() => {
        if (pendingFilter === undefined) return undefined;

        const timer = window.setTimeout(() => searchGroupMembers(send, 0, pendingFilter), SEARCH_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [ pendingFilter, send ]);

    if (!members) return null;

    return (
        <GroupMembersView
            members={members}
            filterText={filterText}
            searching={searching}
            ownUserId={ownUserId}
            blockingEnabled={blockingEnabled}
            onClose={closeGroupMembers}
            onFilterTextChange={(text) => {
                setGroupMembersFilterText(text);
                setGroupMembersSearching(true);
            }}
            onSearchType={searchType => searchGroupMembers(send, 0, undefined, searchType)}
            onPage={pageIndex => stepGroupMemberPage(send, pageIndex)}
            onProfile={member => showGroupMemberProfile(send, member.userId)}
            onAction={member => applyGroupMemberAction(send, member)}
            onRemove={member => removeGroupMember(send, member)}
            onBlock={member => blockGroupMember(send, member)}
        />
    );
};
