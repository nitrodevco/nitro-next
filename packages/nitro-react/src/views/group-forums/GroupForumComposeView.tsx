/**
 * The compose window - Flash `ComposeMessageView` over `habbo-friend-bar-com/groupforum_compose_message_xml`:
 * a new thread (a subject and a message) or a reply to a thread (its subject, disabled), opened beside
 * the forum's window and outliving it.
 *
 * - `initControls`: the forum's top area (its badge, name and description; a click opens the group), the
 *   subject (up to 120 characters; "Replying to" with the thread's header in a reply), the message (up to
 *   4000); a reply to a message starts the message with its quote (`addQuote`), after what the field
 *   already holds - the window takes a second reply as `focus`, unless it is posting.
 * - `validateInputs`, on each key and every second: a subject or a message of 10 characters or fewer is too
 *   short, and a post is held back until 30 seconds after the last one (`post_cooldown`). Without an error
 *   `post_btn` is enabled; the status shows the reply hint until the first check after the window opened.
 * - Post: the fields and the button are disabled and the status says "Posting..." until the answer
 *   (`onPostThreadMessage` / `onPostMessageMessage`) closes the window.
 */
import type { IExtendedForumData, IPostMessage, IThreadData } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { closeGroupForumCompose, getGroupForumSinceLastPost, GROUP_FORUM_MESSAGE_MAX_LENGTH, GROUP_FORUM_POST_COOLDOWN_MS, GROUP_FORUM_SUBJECT_MAX_LENGTH, openClientLink, postGroupForumMessage, postGroupForumThread } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { GroupForumCompose, useGroupActions } from '#base/context/groups';
import { useConfigValue, useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

const TEMPLATE = 'habbo-friend-bar-com/groupforum_compose_message_xml';

/** `ComposeMessageView.SUBJECT_MIN_LENGTH` / `MESSAGE_MIN_LENGTH`; the checks are `<=` them. */
const MIN_LENGTH = 10;
const WINDOW_WIDTH = 455;
const CHECK_INTERVAL_MS = 1000;

/** `MessageListView._-82O`: a quoted line. */
const QUOTE_LINE = /^>(?: ?|$)/;

interface Fields {
    subject: string;
    message: string;
}

export const GroupForumComposeView = ({ compose }: { compose: GroupForumCompose }) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { setForumCompose } = useGroupActions();
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const position = { x: Math.max(0, Math.min(compose.x, window.innerWidth - WINDOW_WIDTH)), y: compose.y };
    const frame = useTemplateFrame({ id: 'group_forum_compose', defaultPosition: position, rememberPosition: false, resizeDirection: 'all', onClose: closeGroupForumCompose });
    const forum: IExtendedForumData = compose.forum;
    const thread = compose.thread;
    const posting = compose.posting;
    const ago = (seconds: number) => GetFriendlyTime(t, seconds, '.ago', 1);

    /** `addQuote`: the field's text (and two blank lines when it has some), the quote's header, its lines quoted - a quote inside it skipped once. */
    const buildQuote = (existing: string, quote: IPostMessage): string => {
        let text = existing;

        if (text.length > 0) text += '\n\n';

        text += t('groupforum.compose.reply_template', '', { author_name: quote.authorName, creation_time: ago(quote.creationTimeAsSecondsAgo) });
        text += '\n';

        let skipped = false;

        for (const line of quote.messageText.split('\r')) {
            if (QUOTE_LINE.test(line)) {
                if (!skipped) {
                    skipped = true;
                    text += `> ${t('groupforum.compose.skipped_quote')}\n`;
                }
            } else {
                text += `> ${line}\n`;
                skipped = false;
            }
        }

        return `${text}\n`;
    };

    const start = (compose: GroupForumCompose, previous: IThreadData | undefined, fields: Fields): Fields => {
        let { subject, message } = fields;

        if (compose.thread) subject = compose.thread.header;
        else if (previous) subject = '';

        if (compose.quote) message = buildQuote(message, compose.quote);

        return { subject, message };
    };

    const [ fields, setFields ] = useState<Fields>(() => start(compose, undefined, { subject: '', message: '' }));
    // Redrawn every second, for the cooldown's time left.
    const [ , setTick ] = useState(0);
    const [ hint, setHint ] = useState(true);
    const applied = useRef({ key: compose.key, thread });

    // `focus`: the window taken to another post, its fields as they are besides what the post sets.
    useEffect(() => {
        if (applied.current.key === compose.key) return;

        const previous = applied.current.thread;

        applied.current = { key: compose.key, thread };
        setFields(current => start(compose, previous, current));
    }, [ compose.key ]);

    // `onTimerEvent`: `validateInputs` every second.
    useEffect(() => {
        const timer = setInterval(() => {
            setTick(tick => tick + 1);
            setHint(false);
        }, CHECK_INTERVAL_MS);

        return () => clearInterval(timer);
    }, []);

    /** `validateInputs`: the first error's text, or nothing. */
    const validate = (): string => {
        if (!thread && (fields.subject.length <= MIN_LENGTH)) return t('groupforum.compose.subject_too_short');

        if (fields.message.length <= MIN_LENGTH) return t('groupforum.compose.message_too_short');

        // Inference: the AS3's comparison is lost in the decompile; the wait is `30000 - sinceLastPost`.
        const sinceLastPost = getGroupForumSinceLastPost();

        if (sinceLastPost < GROUP_FORUM_POST_COOLDOWN_MS) {
            return t('groupforum.compose.post_cooldown', '', { time_remaining: GetFriendlyTime(t, ((GROUP_FORUM_POST_COOLDOWN_MS - sinceLastPost) / 1000) + 1, '', 1) });
        }

        return '';
    };

    const error = validate();
    const status = posting ? t('groupforum.compose.posting') : (error || (hint ? t('groupforum.compose.reply_hint') : ''));

    /** `onHeaderKeyUpEvent` / `onMessageKeyUpEvent`: a key in a field is a check, which clears the hint. */
    const edit = (change: Partial<Fields>) => {
        setFields(current => ({ ...current, ...change }));
        setHint(false);
    };

    /** `onPostButtonClick`. */
    const onPost = () => {
        if (posting || validate()) return;

        setForumCompose({ ...compose, posting: true });

        if (thread) postGroupForumMessage(send, forum.groupId, thread.threadId, fields.message);
        else postGroupForumThread(send, forum.groupId, fields.subject, fields.message);
    };

    const bindings: TemplateBindings = {
        group_icon: { visible: true, asset: groupBadgeUrl.replace('%badgedata%', forum.icon) },
        top_header_text: { caption: forum.name },
        top_text: { caption: forum.description },
        top_click_area: { onPointerTap: () => openClientLink(send, `group/${forum.groupId}`) },
        thread_subject_header: { caption: t(thread ? 'groupforum.compose.subject_replying_to' : 'groupforum.compose.subject') },
        thread_subject: { caption: fields.subject, maxChars: GROUP_FORUM_SUBJECT_MAX_LENGTH, disabled: !!thread || posting, onChange: subject => edit({ subject }) },
        message_text: { caption: fields.message, maxChars: GROUP_FORUM_MESSAGE_MAX_LENGTH, disabled: posting, onChange: message => edit({ message }) },
        formatting_help: { htmlText: t('groupforum.compose.formatting_help'), onPointerTap: () => openClientLink(send, 'habbopages/forums/formatting') },
        cancel_btn: { onPointerTap: closeGroupForumCompose },
        post_btn: { disabled: posting || !!error, onPointerTap: onPost },
        status_text: { caption: status },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
