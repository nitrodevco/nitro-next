/**
 * The forum settings window - Flash `ForumSettingsView` over `habbo-friend-bar-com/groupforum_forum_settings_xml`,
 * opened by the forum window's `settings_button` beside it, and outliving it.
 *
 * - `initControls`: the forum's top area (a click opens the group) and four choices of who may read,
 *   post messages, start threads and moderate (0 everybody, 1 group members, 2 group administrators,
 *   3 the owner), each selected as the forum has it.
 * - `setSelectorState`: a choice below the one before it is disabled - nobody may post who may not read,
 *   nor start a thread who may not post - and a selection under it moves up to it
 *   (`onSelectionChanged` runs the chain read, post message, post thread). Moderating starts at 2.
 * - OK sends `UpdateForumSettings` with the four choices and closes the window; cancel only closes it.
 *
 * Not drawn: the half blend `setSelectorState` gives the labels of a disabled choice - the layout names
 * the four containers' labels alike (`label0`..`label3`), which a binding cannot tell apart.
 */
import { useState } from 'react';

import { closeGroupForumSettings, openClientLink, updateGroupForumSettings } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { GroupForumSettings } from '#base/context/groups';
import { useConfigValue } from '#base/context/system';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-friend-bar-com/groupforum_forum_settings_xml';
const WINDOW_WIDTH = 350;
const OPTIONS = 4;
const MODERATE_MINIMUM = 2;

interface Choices {
    read: number;
    postMessage: number;
    postThread: number;
    moderate: number;
}

/** `setSelectorState`'s state: the wanted one, or the lowest the choice allows. */
const atLeast = (minimum: number, wanted: number) => Math.max(minimum, wanted);

/** `initControls` / `onSelectionChanged`: each choice no lower than the one before it. */
const chain = (wanted: Choices): Choices => {
    const read = atLeast(0, wanted.read);
    const postMessage = atLeast(read, wanted.postMessage);
    const postThread = atLeast(postMessage, wanted.postThread);

    return { read, postMessage, postThread, moderate: atLeast(MODERATE_MINIMUM, wanted.moderate) };
};

export const GroupForumSettingsView = ({ settings }: { settings: GroupForumSettings }) => {
    const { send } = useWebSocketContext();
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const forum = settings.forum;
    const position = { x: Math.max(0, Math.min(settings.x, window.innerWidth - WINDOW_WIDTH)), y: settings.y };
    const frame = useTemplateFrame({ id: 'group_forum_settings', defaultPosition: position, rememberPosition: false, resizeDirection: 'y', onClose: closeGroupForumSettings });
    const [ choices, setChoices ] = useState<{ forum: GroupForumSettings['forum']; value: Choices }>(() => ({ forum, value: chain({ read: forum.readPermissions, postMessage: forum.postMessagePermissions, postThread: forum.postThreadPermissions, moderate: forum.moderatePermissions }) }));

    // `focus`: another forum's settings take the window.
    if (choices.forum !== forum) setChoices({ forum, value: chain({ read: forum.readPermissions, postMessage: forum.postMessagePermissions, postThread: forum.postThreadPermissions, moderate: forum.moderatePermissions }) });

    const value = choices.value;
    const select = (key: keyof Choices, option: number) => setChoices({ forum, value: chain({ ...value, [key]: option }) });

    /** A choice's radio buttons: the selected one, and those below `minimum` disabled. */
    const selector = (name: string, key: keyof Choices, options: number[], minimum: number): TemplateBindings => Object.fromEntries(options.map(option => [
        `${name}/${option}`,
        { selected: value[key] === option, disabled: option < minimum, onPointerTap: () => select(key, option) },
    ]));

    const onOk = () => {
        updateGroupForumSettings(send, forum.groupId, value.read, value.postMessage, value.postThread, value.moderate);
        closeGroupForumSettings();
    };

    const all = Array.from({ length: OPTIONS }, (_, option) => option);
    const bindings: TemplateBindings = {
        group_icon: { visible: true, asset: groupBadgeUrl.replace('%badgedata%', forum.icon) },
        top_header_text: { caption: forum.name },
        top_text: { caption: forum.description },
        top_click_area: { onPointerTap: () => openClientLink(send, `group/${forum.groupId}`) },
        ...selector('read_selector', 'read', all.slice(0, 3), 0),
        ...selector('post_message_selector', 'postMessage', all, value.read),
        ...selector('post_thread_selector', 'postThread', all, value.postMessage),
        ...selector('moderate_selector', 'moderate', all.slice(MODERATE_MINIMUM), MODERATE_MINIMUM),
        cancel_btn: { onPointerTap: closeGroupForumSettings },
        ok_btn: { onPointerTap: onOk },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
