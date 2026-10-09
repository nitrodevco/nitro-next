/**
 * The group forums window - Flash `GroupForumView` over `habbo-friend-bar-com/groupforum_main_view_xml`,
 * listing a forums list (`ForumsListView`, `groupforum_forum_list_item_xml`), a forum's threads
 * (`ThreadListView`, `groupforum_thread_list_item_xml`) or a thread's messages (`MessageListView`,
 * `groupforum_message_list_item_xml`) in `scrollable_message_list`, 20 a page.
 *
 * - The top part: for a list, its icon (`forum_forum_list<code>`), header and description, not
 *   clickable; for a forum, the group's badge, name and description, a click opening the group.
 *   `settings_button` shows for whom may change the forum's settings.
 * - `initCommonControls`: the back button ("Mark As Read" on a list or a forum, "Back" in a thread),
 *   the post button ("New Thread" / "Reply", disabled without the permission - or in a locked thread
 *   for whom may not moderate - with the reason in `status`), the pager (`page_info`, first /
 *   previous / next / last), and the "My Forums" shortcut with the unread count.
 * - A forum row: alternating ground, the group badge, the name and its counts bold while it has
 *   unread messages; a click opens the forum. A thread row: its ground by state, the lock and pin
 *   marks (switches for moderators), hide / show and report buttons by permission; the name bold
 *   while it has unread messages, a click opening its first page. A message row: its ground by
 *   state, the author's figure, name and post count (a click opens the profile), the date and its
 *   number, the text with `*bold*`, `_italic_`, `@name` and `>` quote blocks (`initMessageText`),
 *   and hide / show, report and reply buttons by permission; each row as tall as its text.
 *
 * - The post button and a message's reply button open the compose window (`GroupForumComposeView`, a
 *   reply to a message quoting it), `settings_button` the forum settings window
 *   (`GroupForumSettingsView`), both beside this one; a thread's or message's report button the help
 *   window on that post (`IHabboHelp.reportThread` / `reportMessage`); the author names in a row's
 *   details are `friendbar/user/<name>` links to the user's profile.
 *
 * Not ported: scrolling to the message a link names.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import type { IExtendedForumData, IForumData, IPostMessage, IThreadData } from '@nitrodevco/nitro-packets';

import {
    closeGroupForum, deleteGroupForumMessage, deleteGroupForumThread, getGroupForumThreadLastReadIndex, goToGroupForumMessage, GROUP_FORUM_PAGE_SIZE, GROUP_FORUM_STATE_HIDDEN_BY_ADMIN, GROUP_FORUM_STATE_HIDDEN_BY_STAFF, markGroupForumAsRead,
    markGroupForumsListAsRead, openClientLink, openGroupForumCompose, openGroupForumSettings, openGroupForumsList, openGroupForumWindow, openProfile, requestGroupForumMessages, requestGroupForumThreads,
    setGroupForumWindowRect, undeleteGroupForumMessage, undeleteGroupForumThread, updateGroupForumThread,
} from '#base/commands';
import { reportGroupForumMessage, reportGroupForumThread } from '#base/commands/helpCommands';
import { AvatarImage } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import { GroupForumView as GroupForumViewState, useGroupStore } from '#base/context/groups';
import { useConfigValue, useTranslation } from '#base/context/system';
import { LayoutWindow, Template, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

const TEMPLATE = 'habbo-friend-bar-com/groupforum_main_view_xml';
const FORUM_ITEM = 'habbo-friend-bar-com/groupforum_forum_list_item_xml';
const THREAD_ITEM = 'habbo-friend-bar-com/groupforum_thread_list_item_xml';
const MESSAGE_ITEM = 'habbo-friend-bar-com/groupforum_message_list_item_xml';

/** The rows' alternating grounds. */
const ROW_COLORS = [ 4293852927, 4289914618 ];

/** `MessageListView`: a quote block's ground and indent. */
const QUOTE_BG_COLOR = 4291611852;
const QUOTE_INDENT = 20;

/** `MessageListView.LINE_PATTERN` / `_-82O`. */
const LINE_PATTERN = /\\?(?:(?:\*([^*]+)\*)|(?:_([^_]+)_)|(?:@\S+))/;
const QUOTE_PATTERN = /^>(?: ?|$)/;

const asset = (name: string) => `habbo-window-manager-com-${name}`;

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The first `event:` link of a text, as a click on it sends it. */
const firstLink = (html: string) => /href="event:([^"]+)"/.exec(html)?.[1];

/** `getThreadColor`. */
const threadColor = (state: number, index: number) => {
    if (state === GROUP_FORUM_STATE_HIDDEN_BY_ADMIN) return 4289374890;
    if (state === GROUP_FORUM_STATE_HIDDEN_BY_STAFF) return 4294946981;

    return ROW_COLORS[index % 2];
};

/** `getMessageColor`: the message's ground and the author column's. */
const messageColors = (state: number, unread: boolean): [ number, number ] => {
    if (state === GROUP_FORUM_STATE_HIDDEN_BY_ADMIN) return [ 4293519840, 4292335567 ];
    if (state === GROUP_FORUM_STATE_HIDDEN_BY_STAFF) return [ 4294952634, 4294959058 ];

    return [ unread ? 4294964441 : 4294967295, 4291227641 ];
};

/** `parseMessageChunk`: `*bold*`, `_italic_` and `@name` as markup, the rest escaped. */
const parseMessageChunk = (text: string): string => {
    let out = '';
    let rest = text;

    for (;;) {
        const match = LINE_PATTERN.exec(rest);

        if (!match) break;

        if (match.index > 0) out += escapeHtml(rest.substring(0, match.index));

        const length = match[0].length;
        const first = rest.charAt(match.index);

        if (first === '*') {
            out += ` <b>${parseMessageChunk(rest.substring(match.index + 1, match.index + length - 1))}</b> `;
        } else if (first === '_') {
            out += ` <i>${parseMessageChunk(rest.substring(match.index + 1, match.index + length - 1))}</i> `;
        } else if ((first === '@') && ((match.index === 0) || (rest.charAt(match.index - 1) === ' '))) {
            out += `<u>${escapeHtml(rest.substring(match.index + 1, match.index + length))}</u>`;
        } else {
            // An escaped character, or an `@` inside a word: kept as it is.
            if (first === '@') out += '@';
            else out += rest.charAt(match.index + 1);

            rest = rest.substring(match.index + ((first === '@') ? 1 : 2));
            continue;
        }

        rest = rest.substring(match.index + length);
    }

    return out + escapeHtml(rest);
};

/** `initMessageText`: the text's lines in blocks - plain, or quoted (`>`) one level in. */
const messageBlocks = (text: string): { html: string; level: number }[] => {
    const blocks: { html: string; level: number }[] = [];
    let buffer = '';
    let level = 0;

    for (let line of text.split('\r')) {
        let lineLevel = 0;
        const quote = QUOTE_PATTERN.exec(line);

        if (quote) {
            lineLevel = 1;
            line = line.substring(quote[0].length);
        }

        if (lineLevel !== level) {
            blocks.push({ html: buffer, level });
            buffer = '';
            level = lineLevel;
        } else if (buffer.length > 0) {
            buffer += '\r';
        }

        buffer += parseMessageChunk(line);
    }

    blocks.push({ html: buffer, level });

    return blocks;
};

/** A window's descendant by name, as `findChildByName` finds it. */
const findIn = (window: LayoutWindow, name: string): LayoutWindow | undefined => {
    for (const child of window.children) {
        if (child.element?.name === name) return child;

        const found = findIn(child, name);

        if (found) return found;
    }

    return undefined;
};

/** A scrollable list's `_ITEMLIST` (`ScrollableWindow.list`). */
const innerList = (list: LayoutWindow | undefined): (LayoutWindow & { container?: LayoutWindow }) | undefined => {
    if (!list || !('list' in list)) return undefined;

    return list.list as (LayoutWindow & { container?: LayoutWindow }) | undefined;
};

/** `scrollable_message_list`'s rows: its inner list's items. */
const listRows = (list: LayoutWindow | undefined): LayoutWindow[] => {
    const inner = innerList(list);

    return inner?.container ? inner.container.children : [];
};

export const GroupForumView = () => {
    const view = useGroupStore(x => x.forumView);
    const unreadForumsCount = useGroupStore(x => x.unreadForumsCount);
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const forumItem = useTemplate(FORUM_ITEM);
    const threadItem = useTemplate(THREAD_ITEM);
    const messageItem = useTemplate(MESSAGE_ITEM);
    const frame = useTemplateFrame({ id: 'group_forum', centered: true, rememberPosition: false, resizeDirection: 'all', onClose: () => closeGroupForum(send), onPositionChange: position => setGroupForumWindowRect(position) });

    if (!view || !forumItem || !threadItem || !messageItem) return null;

    const ago = (seconds: number) => GetFriendlyTime(t, seconds, '.ago', 1);
    const badge = (code: string) => groupBadgeUrl.replace('%badgedata%', code);
    const forum = (view.kind === 'forums') ? undefined : view.forum;

    // `openForumsList` / `openThreadList` / `openMessagesList`: the page and the number of pages.
    const total = (view.kind === 'forums') ? view.forums.totalAmount : (view.kind === 'threads') ? view.threads.totalThreads : view.messages.totalMessages;
    const startIndex = (view.kind === 'forums') ? view.forums.startIndex : (view.kind === 'threads') ? view.threads.startIndex : view.messages.startIndex;
    const pages = Math.ceil(total / GROUP_FORUM_PAGE_SIZE);
    const page = Math.ceil(startIndex / GROUP_FORUM_PAGE_SIZE);

    /** `requestNewPageData`. */
    const requestPage = (target: number) => {
        const start = target * GROUP_FORUM_PAGE_SIZE;

        if (view.kind === 'forums') openGroupForumsList(send, view.forums.listCode, start);
        else if (view.kind === 'threads') requestGroupForumThreads(send, view.forum.groupId, start);
        else requestGroupForumMessages(send, view.forum.groupId, view.messages.threadId, start);
    };

    /** `onClickButton('back_button')`. */
    const onBack = () => {
        if (view.kind === 'messages') {
            requestGroupForumThreads(send, view.forum.groupId, view.threads.startIndex);
        } else if (view.kind === 'threads') {
            markGroupForumAsRead(send, true);

            if (view.forums) openGroupForumsList(send, view.forums.listCode, view.forums.startIndex);
            else closeGroupForum(send);
        } else {
            markGroupForumsListAsRead(send);
            closeGroupForum(send);
        }
    };

    /** `onClickButton('post_button')`: the thread being read is replied to, none starts a new one. */
    const onPost = () => {
        if (view.kind === 'forums') return;

        openGroupForumCompose(view.forum, (view.kind === 'messages') ? view.threads.threads.find(entry => entry.threadId === view.messages.threadId) : undefined);
    };

    /** A row's `event:` link: the author's `friendbar/user/<name>`. */
    const onLink = (link: string) => openClientLink(send, link);

    const forumRow = (entry: IForumData, index: number): TemplateItem => {
        const unread = entry.unreadMessages;
        const open = () => openGroupForumWindow(send, entry.groupId);

        return {
            key: `forum_${entry.groupId}`,
            from: forumItem,
            bindings: {
                '': { color: ROW_COLORS[(index + 1) % 2] },
                header: (unread > 0) ? { htmlText: `<b>${escapeHtml(entry.name)}</b>` } : { caption: entry.name },
                header_region: { onPointerTap: open },
                details: { htmlText: t('groupforum.view.forum_details', '', { rating: String(entry.leaderboardScore), last_author_id: String(entry.lastMessageAuthorId), last_author_name: entry.lastMessageAuthorName, update_time: ago(entry.lastMessageTimeAsSecondsAgo) }), onLink: onLink },
                unread_region: { onPointerTap: open },
                messages1: boldCaption(t('groupforum.view.thread_details1', '', { total_messages: String(entry.totalMessages), new_messages: String(unread) }), unread > 0),
                messages2: boldCaption(t('groupforum.view.thread_details2', '', { total_messages: String(entry.totalMessages), new_messages: String(unread) }), unread > 0),
                group_icon: { asset: badge(entry.icon) },
            },
        };
    };

    const threadRow = (data: IExtendedForumData, thread: IThreadData, index: number): TemplateItem => {
        const moderator = data.moderatePermissionError.length === 0;
        const staff = data.isStaff;
        const unread = thread.nMessages - getGroupForumThreadLastReadIndex(thread.threadId) - 1;
        const color = threadColor(thread.state, index);
        let header = (thread.header === '') ? '(No Subject)' : thread.header;

        if ((thread.state > 1) && !moderator && !staff) {
            header = (thread.state === GROUP_FORUM_STATE_HIDDEN_BY_ADMIN) ? t('groupforum.view.thread_hidden_by_admin', '', { admin_name: thread.adminName }) : t('groupforum.view.thread_hidden_by_staff', '', { admin_name: thread.adminName });
        }

        const open = () => goToGroupForumMessage(send, data.groupId, thread.threadId, 0);
        const canHide = moderator || staff;
        // `handleButtonVisibility`: hide while shown, show again while hidden (staff's hiding only for staff).
        const hideState = (thread.state === GROUP_FORUM_STATE_HIDDEN_BY_ADMIN) ? 'unhide' : ((thread.state === GROUP_FORUM_STATE_HIDDEN_BY_STAFF) ? (staff ? 'unhide' : 'none') : 'hide');

        return {
            key: `thread_${thread.threadId}`,
            from: threadItem,
            bindings: {
                texts_container: { color },
                unread_texts_container: { color },
                button_container: { color },
                left_button_container: { color },
                header: (unread > 0) ? { htmlText: `<b>${escapeHtml(header)}</b>` } : { caption: header },
                header_region: { onPointerTap: open },
                details: { htmlText: t('groupforum.view.thread_details', '', { thread_author_id: String(thread.threadAuthorId), thread_author_name: thread.threadAuthorName, last_author_id: String(thread.lastMessageAuthorId), last_author_name: thread.lastMessageAuthorName, creation_time: ago(thread.creationTimeAsSecondsAgo), update_time: ago(thread.lastMessageTimeAsSecondsAgo) }), onLink: onLink },
                unread_region: { onPointerTap: open },
                messages1: boldCaption(t('groupforum.view.thread_details1', '', { total_messages: String(thread.nMessages), new_messages: String(unread) }), unread > 0),
                messages2: boldCaption(t('groupforum.view.thread_details2', '', { total_messages: String(thread.nMessages), new_messages: String(unread) }), unread > 0),
                // `handleLeftButtonsVisibility`: switches for moderators, marks otherwise.
                thread_lock: canHide
                    ? { onPointerTap: () => updateGroupForumThread(send, data, thread.threadId, !thread.isLocked, thread.isSticky) }
                    : { visible: thread.isLocked, disabled: true },
                'thread_lock/icon': { asset: asset((canHide && !thread.isLocked) ? 'forum_forum_unlocked' : 'forum_forum_locked') },
                thread_pin: canHide
                    ? { onPointerTap: () => updateGroupForumThread(send, data, thread.threadId, thread.isLocked, !thread.isSticky) }
                    : { visible: thread.isSticky, disabled: true },
                'thread_pin/icon': { asset: asset((canHide && !thread.isSticky) ? 'forum_forum_unpinned' : 'forum_forum_pinned') },
                delete_thread: (!canHide || (hideState === 'none'))
                    ? { visible: false }
                    : { onPointerTap: () => ((hideState === 'hide') ? deleteGroupForumThread(send, data, thread.threadId) : undeleteGroupForumThread(send, data, thread.threadId)) },
                'delete_thread/icon': { asset: asset((hideState === 'unhide') ? 'forum_forum_unhide' : 'forum_forum_hide') },
                // `canReport` is always true.
                report_thread: { onPointerTap: () => reportGroupForumThread(data.groupId, thread.threadId) },
            },
        };
    };

    const messageRow = (data: IExtendedForumData, threads: IThreadData[], threadId: number, lastReadIndex: number, message: IPostMessage, textTemplate: Template['elements'][number] | undefined): TemplateItem => {
        const moderator = data.moderatePermissionError.length === 0;
        const staff = data.isStaff;
        const state = message.state;
        const [ ground, column ] = messageColors(state, message.messageIndex > lastReadIndex);
        const hidden = ((state === GROUP_FORUM_STATE_HIDDEN_BY_STAFF) && !staff) || ((state > 1) && !moderator);
        const moderation = (state === GROUP_FORUM_STATE_HIDDEN_BY_ADMIN)
            ? t('groupforum.view.message_hidden_by_admin', '', { admin_name: message.adminName })
            : t('groupforum.view.message_hidden_by_staff', '', { admin_name: message.adminName });
        const blocks = hidden ? [ { html: escapeHtml(moderation), level: 0 } ] : messageBlocks(message.messageText);
        const hideState = (state === GROUP_FORUM_STATE_HIDDEN_BY_ADMIN) ? 'unhide' : ((state === GROUP_FORUM_STATE_HIDDEN_BY_STAFF) ? (staff ? 'unhide' : 'none') : 'hide');

        return {
            key: `message_${message.messageId}`,
            from: messageItem,
            bindings: {
                date: { caption: ago(message.creationTimeAsSecondsAgo) },
                reply_num: { caption: `#${message.messageIndex + 1}` },
                // `initMessageText`: the layout's text taken out, a clone of it per block.
                message_text: { visible: false },
                message_text_container: {
                    added: textTemplate
                        ? blocks.map((block, index) => ({
                                key: `block_${index}`,
                                from: textTemplate,
                                // A quote's field is filled grey (`backgroundColor`), its text left the layout's colour.
                                bindings: { '': (block.level > 0) ? { htmlText: block.html, backgroundColor: QUOTE_BG_COLOR } : { htmlText: block.html } },
                                arrange: ({ root }) => {
                                    const text = root();

                                    if (!text || (block.level === 0)) return;

                                    text.setX(text.x + (block.level * QUOTE_INDENT));
                                    text.setWidth(text.width - ((block.level + 1) * QUOTE_INDENT));
                                },
                            }))
                        : undefined,
                },
                msg_container: { color: ground },
                avatar_image: { color: column, onPointerTap: () => openProfile(send, message.authorId) },
                avatar_widget: {
                    children: (
                        <AvatarImage
                            figure={message.authorFigure}
                            gender={AvatarGenderType.Male}
                            direction={2}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    ),
                },
                author: { caption: message.authorName },
                author_post_count: { caption: `${message.authorPostCount} ${t('messageboard.messages', 'posts')}` },
                delete_message: (!moderator || (hideState === 'none'))
                    ? { visible: false }
                    : { onPointerTap: () => ((hideState === 'hide') ? deleteGroupForumMessage(send, data, threadId, message.messageId) : undeleteGroupForumMessage(send, data, threadId, message.messageId)) },
                'delete_message/icon': { asset: asset((hideState === 'unhide') ? 'forum_forum_unhide' : 'forum_forum_hide') },
                report_message: { onPointerTap: () => reportGroupForumMessage(data.groupId, threadId, message.messageId) },
                reply_message: {
                    visible: data.postMessagePermissionError.length === 0,
                    onPointerTap: () => openGroupForumCompose(data, threads.find(entry => entry.threadId === threadId), message),
                },
            },
        };
    };

    const messageTextTemplate = findElement(messageItem.elements, 'message_text');

    const rows: TemplateItem[] = (view.kind === 'forums')
        ? view.forums.forums.map(forumRow)
        : (view.kind === 'threads')
                ? view.threads.threads.map((thread, index) => threadRow(view.forum, thread, index))
                : view.messages.messages.map(message => messageRow(view.forum, view.threads.threads, view.messages.threadId, view.messages.lastReadIndex, message, messageTextTemplate));

    // `setStatusTextError` / the forums list's own status.
    let status = '';
    let postDisabled = false;

    if (view.kind === 'forums') {
        status = t('groupforum.view.forums_list.status');
    } else if (view.kind === 'threads') {
        postDisabled = view.forum.postThreadPermissionError.length > 0;
        status = postDisabled ? statusError(t, 'post_thread', view.forum.postThreadPermissionError) : '';
    } else {
        const thread = view.threads.threads.find(entry => entry.threadId === view.messages.threadId);

        if (view.forum.postMessagePermissionError.length > 0) {
            postDisabled = true;
            status = statusError(t, 'post_message', view.forum.postMessagePermissionError);
        } else if (thread?.isLocked && (view.forum.moderatePermissionError.length > 0)) {
            postDisabled = true;
            status = statusError(t, 'post_in_locked', view.forum.moderatePermissionError);
        }
    }

    const listHeader = (view.kind === 'forums')
        ? t(`groupforum.view.forums_list.${view.forums.listCode}`)
        : (view.kind === 'threads') ? t('groupforum.view.all_threads') : (view.threads.threads.find(entry => entry.threadId === view.messages.threadId)?.header ?? '');

    const shortcut = (html: string) => ({ htmlText: html, onPointerTap: () => {
        const link = firstLink(html);

        if (link) openClientLink(send, link);
    } });

    const bindings: TemplateBindings = {
        group_icon: forum ? { visible: true, asset: badge(forum.icon) } : { visible: false },
        header_icon: forum ? { visible: false } : { visible: true, asset: asset(`forum_forum_list${(view as Extract<GroupForumViewState, { kind: 'forums' }>).forums.listCode}`) },
        top_header_text: { caption: forum ? forum.name : t(`groupforum.view.forums_header.${(view as Extract<GroupForumViewState, { kind: 'forums' }>).forums.listCode}`) },
        top_text: { caption: forum ? forum.description : t(`groupforum.view.forums_description.${(view as Extract<GroupForumViewState, { kind: 'forums' }>).forums.listCode}`) },
        top_click_area: forum ? { onPointerTap: () => openClientLink(send, `group/${forum.groupId}`) } : { disabled: true },
        settings_button: { visible: !!forum?.canChangeSettings, onPointerTap: () => forum && openGroupForumSettings(forum) },
        my: shortcut((unreadForumsCount > 0) ? t('groupforum.view.shortcuts.my.unread', '', { unread_count: String(unreadForumsCount) }) : t('groupforum.view.shortcuts.my')),
        active: shortcut(t('groupforum.view.shortcuts.active')),
        popular: shortcut(t('groupforum.view.shortcuts.popular')),
        list_header: { caption: listHeader },
        scrollable_message_list: { items: rows },
        back_button_label: { caption: t((view.kind === 'messages') ? 'groupforum.view.back' : 'groupforum.view.mark_read') },
        back_button: { onPointerTap: onBack },
        post_button: { visible: view.kind !== 'forums', disabled: postDisabled, onPointerTap: () => onPost() },
        post_button_label: { caption: t((view.kind === 'messages') ? 'groupforum.view.reply' : 'groupforum.view.start_thread') },
        page_info: { caption: `${page + 1} / ${pages}` },
        show_first: { disabled: page <= 0, onPointerTap: () => (page > 0) && requestPage(0) },
        show_previous: { disabled: page <= 0, onPointerTap: () => (page > 0) && requestPage(page - 1) },
        show_next: { disabled: page >= (pages - 1), onPointerTap: () => ((page + 1) <= pages) && requestPage(page + 1) },
        show_last: { disabled: page >= (pages - 1), onPointerTap: () => (page < pages) && requestPage(pages - 1) },
        status: { htmlText: status, onPointerTap: () => {
            const link = firstLink(status);

            if (link) openClientLink(send, link);
        } },
    };

    // `updateItemWidths` / `updateItemSizes`: each row as wide as the list, a message row as tall as its text.
    const arrange = ({ find, root }: TemplateWindows) => {
        const width = root()?.width;

        if (width) setGroupForumWindowRect({ width });

        const list = find('scrollable_message_list');
        const inner = innerList(list);

        if (!inner) return;

        for (const row of listRows(list)) {
            row.setWidth(inner.width - 2);

            if (view.kind !== 'messages') continue;

            const texts = findIn(row, 'texts_container');
            const container = findIn(row, 'message_text_container');

            if (!texts || !container) continue;

            let y = 2;

            for (const text of container.children) {
                if (!text.visible) continue;

                text.setY(y);
                y = text.y + text.height;
            }

            container.setHeight(y);
            row.setHeight(texts.height + container.y + container.height);
        }
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
            arrange={arrange}
        />
    );
};

/** `setStatusTextError`. */
const statusError = (t: ReturnType<typeof useTranslation>, operation: string, error: string) => t(`groupforum.view.error.${error}`, '', { operation: t(`groupforum.view.error.operation_${operation}`) });

/** A text bold while it counts unread messages (`ITextWindow.bold`). */
const boldCaption = (text: string, bold: boolean) => (bold ? { htmlText: `<b>${escapeHtml(text)}</b>` } : { caption: text });

/** A template element by name, as `findChildByName` finds it. */
const findElement = (elements: readonly Template['elements'][number][], name: string): Template['elements'][number] | undefined => {
    for (const element of elements) {
        if (element.name === name) return element;

        const found = findElement(element.children, name);

        if (found) return found;
    }

    return undefined;
};
