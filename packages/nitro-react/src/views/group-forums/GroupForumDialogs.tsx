/**
 * The group forums' two windows of their own: `ComposeMessageView` and `ForumSettingsView`. Each is held by
 * `GroupForumController` (`composeMessageView` / `forumSettingsView`) and not by the forum window, so they
 * stay while it is closed.
 */
import { useGroupStore } from '#base/context/groups';

import { GroupForumComposeView } from './GroupForumComposeView';
import { GroupForumSettingsView } from './GroupForumSettingsView';

export const GroupForumDialogs = () => {
    const compose = useGroupStore(x => x.forumCompose);
    const settings = useGroupStore(x => x.forumSettings);

    return (
        <>
            {compose && <GroupForumComposeView compose={compose} />}
            {settings && <GroupForumSettingsView settings={settings} />}
        </>
    );
};
