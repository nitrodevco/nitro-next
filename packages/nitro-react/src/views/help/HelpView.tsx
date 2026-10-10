/**
 * The help window - `TopicsFlowHelpController` over `habbo-help-com/topics_flow_help_xml`, built as a
 * modal dialog (`HabboHelp.getModalXmlWindow("topics_flow_help")`, centred over the darkened client).
 *
 * `toggleWindow` opens it on `start_container`. `showContainer` shows one container at a time: it
 * hides every container of `_containers` (`start_container`, `help_container`, `users_container`,
 * `user`, `reason_container`, `message_container`, `chat_container`, `back_button`,
 * `summary_container`), shows the continue button for `REQUIRES_CONTINUE_BUTTON`, the reported
 * user's strip (`user`) for `REQUIRES_USER_DATA`, and the back button everywhere but the start page
 * (`updateBackButtonVisibility` for a report started here). `openWindow` hides the reports status
 * link and its icon unless `my.reports.status.enabled`. The layout itself hides `button_habbo_help`.
 *
 * The start page (`windowEventProcedure`):
 * - `button_account` opens `zendesk.url` in the hotel's main browser window and closes the window.
 * - `faq_link` opens `cfh.faq.url` (`openCfhFaq`, nothing when it is empty); the window stays.
 * - `sanction_info_link` / `reports_status` ask for the sanction / reports status and close it.
 * - `button_user_report` ("Someone is misbehaving") starts a report:
 *   1. `users_container` (`populateUsers`): one `user_prototype` per user of the user registry who
 *      said something the chat registry kept - their head, name and the room they were seen in, the
 *      user being reported highlighted (`user_bg` at full blend). A click picks the user and their
 *      room (`selectUserToReport`). With nobody to list, `help.cfh.error.nochathistory` instead.
 *   2. Continue (`verifyUserSelected`) -> `chat_container` (`populateChatMessage`): the reported
 *      user's lines with a checkbox each; a line ticked from another room makes that room the
 *      reported one (`onChatEntryEvent`).
 *   3. Continue (`verifySelectedChatLines`) -> `reason_container` (`populateReasons`): one button per
 *      category (`help.cfh.reason.<name>`); a category's button lists its topics in the same list
 *      (`populateTopics`, `help.cfh.topic.<id>` with the user's name), and a topic opens
 *      `message_container` (`onReportTopic`).
 *   4. Continue (`verifyMessage`) -> `summary_container`; `submit_button` sends the report
 *      (`submitCallForHelp`) and closes the window.
 *   Back walks the steps back as `windowEventProcedure`'s `back_button` does; `change_user` goes to
 *   the user list again.
 */
import type { ICallForHelpTopic } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { confirmHelpReportedUser, forgetUnlistedReportedUser, hasSelectedHelpLines, requestCfhReportsStatus, requestSanctionStatus, selectHelpReportedUser, startHelpReport, submitCallForHelp, toggleHelpChatLine, toggleHelpImLine } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { HelpReportEntry, HelpUserItem, useHelpStore } from '#base/context/help';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { ModalDialog, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';
import { AvatarImageWidgetHead } from '#base/views/shared/AvatarImageWidgetHead';

import { HelpMessageInput } from './HelpMessageInput';

const TEMPLATE = 'habbo-help-com/topics_flow_help_xml';

/** `_containers`: what `showContainer` hides before it shows one. */
const CONTAINERS = [ 'start_container', 'help_container', 'users_container', 'user', 'reason_container', 'message_container', 'chat_container', 'back_button', 'summary_container' ];
const REQUIRES_CONTINUE_BUTTON = [ 'users_container', 'message_container', 'chat_container' ];
const REQUIRES_USER_DATA = [ 'reason_container', 'message_container', 'chat_container', 'summary_container' ];

/** `_unlawfulCategories`. */
const UNLAWFUL_CATEGORIES = [ 'unlawful_activity' ];

/** `FIELD_MAX_CHARS`: `help_message`'s `maxChars`. */
const FIELD_MAX_CHARS = 253;
/** `showContainer("message_container")` makes `help_message` this high. */
const HELP_MESSAGE_HEIGHT = 220;
/** `help.cfh.length.minimum`'s default. */
const MESSAGE_MINIMUM_LENGTH_DEFAULT = 15;

type Container = 'start_container' | 'help_container' | 'users_container' | 'reason_container' | 'topic_container' | 'message_container' | 'chat_container' | 'summary_container';

/** A list item's text grown to its lines plus 5 and the item to hold it (`populateTopics`, `populateChatMessage`). */
const fitListText = (textName: string, extra: number) => ({ find, root }: TemplateWindows) => {
    const text = find(textName);
    const item = root();

    if (!text || !item) return;

    if (text.height < text.textHeight) text.setHeight(text.textHeight + 5);

    if (item.height < (text.height + (text.y * 2) + extra)) item.setHeight(text.height + (text.y * 2) + extra);
};

/** `populateRoomReportButton`'s topic: the room report's one button (`help.cfh.topic.34`). */
const ROOM_REPORT_TOPIC_ID = 34;
const ROOM_REPORT_TOPIC_NAME = 'inappropiate_room_group_event';

export interface HelpViewProps {
    /** The report that opened the window; the start page when there is none (`toggleWindow`). */
    entry?: HelpReportEntry;
    onClose: () => void;
}

/** Where each entry opens: `openReportingChatLineSelection`, `showReasons(4)`, `openReportingIMSelection`. */
const firstContainer = (entry: HelpReportEntry | undefined): Container => {
    switch (entry) {
        case 'user':
        case 'im':
            return 'chat_container';
        case 'room':
        case 'photo':
        case 'thread':
        case 'message':
            return 'reason_container';
        default:
            return 'start_container';
    }
};

export const HelpView = ({ entry, onClose }: HelpViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { showAlert } = useWindowActions();
    const zendeskUrl = useConfigValue<string>('zendesk.url');
    const faqUrl = useConfigValue<string>('cfh.faq.url');
    const reportsStatusEnabled = useConfigValue<boolean>('my.reports.status.enabled') === true;
    const minimumLength = useConfigValue<number>('help.cfh.length.minimum') ?? MESSAGE_MINIMUM_LENGTH_DEFAULT;
    const frame = useTemplateFrame({ id: 'help_topics_flow', modal: true, rememberPosition: false, resizeDirection: 'none', onClose });
    const ownUserId = useUserStore(x => x.userId);
    const users = useHelpStore(x => x.users);
    const chatItems = useHelpStore(x => x.chatItems);
    const categories = useHelpStore(x => x.callForHelpCategories);
    const reportedUserId = useHelpStore(x => x.reportedUserId);
    const reportedRoomName = useHelpStore(x => x.reportedRoomName);
    const storedReportedUserName = useHelpStore(x => x.reportedUserName);
    const imItems = useHelpStore(x => x.imItems);
    /** `_-UZ`. */
    const [ container, setContainer ] = useState<Container>(() => firstContainer(entry));
    /** `name`: the category picked; `room_report` once `populateRoomReportButton` has run. */
    const [ categoryName, setCategoryName ] = useState(() => ((entry === 'room') ? 'room_report' : ''));
    /** What the reason list holds: the room report's one button until `populateReasons` lists the categories. */
    const [ roomReportButton, setRoomReportButton ] = useState(entry === 'room');
    /** `_-325`: the topic picked. */
    const [ topic, setTopic ] = useState<ICallForHelpTopic | undefined>(undefined);
    const [ message, setMessage ] = useState('');

    const alert = (key: string) => showAlert(t('generic.alert.title'), t(key), { modal: true });

    /**
     * `populateUsers`: the registry's users who said something the chat registry kept. Each is added
     * at the top of the list, and after the reported user at the second place - so the reported
     * user first, then the others newest first.
     */
    const withLines = users.filter(user => chatItems.some(item => item.userId === user.userId)).reverse();
    const listedUsers = [ ...withLines.filter(user => user.userId === reportedUserId), ...withLines.filter(user => user.userId !== reportedUserId) ];
    const reportedUser = users.find(user => user.userId === reportedUserId);
    /** `updateUserData`: the registry's name, or the one the report came with. */
    const reportedUserName = reportedUser?.userName ?? storedReportedUserName;

    /** `populateUsers`' side effect: a reported user who is not listed is forgotten. */
    const listUsers = (): boolean => forgetUnlistedReportedUser(listedUsers.map(user => user.userId));

    // `openWindow`, then the entry's own start - closed again with an alert when the report cannot go on.
    useEffect(() => {
        const error = startHelpReport(entry, listedUsers.map(user => user.userId));

        if (!error) return;

        alert(error);
        onClose();
        // Once, as the window opens.
    }, []);

    /** `button_user_report` / `change_user`. */
    const showUsers = () => {
        if (listUsers()) setContainer('users_container');
        else alert('help.cfh.error.nochathistory');
    };

    /** `selectUserToReport`. */
    const selectUser = (user: HelpUserItem) => selectHelpReportedUser(user.userId, user.roomId);

    /** `populateChatMessage`: the reported user's lines (every line with nobody reported), never the user's own. */
    const chatLines = chatItems.filter(item => ((reportedUserId > 0) ? (item.userId === reportedUserId) : true) && (item.userId !== ownUserId));
    /** `populateInstantMessages`: the reported conversation's messages. */
    const imLines = imItems.find(([ chatId ]) => chatId === reportedUserId)?.[1] ?? [];

    /** `populateReasons`. */
    const showReasons = () => {
        setRoomReportButton(false);
        setContainer('reason_container');
    };

    /** `populateTopics`: the category's topics in the reason list, or false when it has none. */
    const showTopics = (name: string) => {
        setCategoryName(name);

        const topics = categories.find(category => category.name === name)?.topics;

        if (topics?.length) setContainer('topic_container');
    };

    /** `onReportTopic`. */
    const pickTopic = (picked: ICallForHelpTopic) => {
        setTopic(picked);
        setContainer('message_container');
    };

    /** `verifyMessage`. Flash hides the unlawful fields on every `showContainer`, so they are always empty here. */
    const verifyMessage = (): boolean => {
        if (UNLAWFUL_CATEGORIES.includes(categoryName)) {
            alert('help.emergency.main.step.one.description');

            return false;
        }

        if (!message) {
            alert('help.cfh.error.nomsg');

            return false;
        }

        if (message.length < minimumLength) {
            alert('help.cfh.error.msgtooshort');

            return false;
        }

        return true;
    };

    const onBack = () => {
        switch (container) {
            case 'reason_container':
                setContainer('chat_container');
                break;
            case 'topic_container':
            case 'message_container':
                showReasons();
                break;
            case 'chat_container':
                if (listUsers()) setContainer('users_container');
                else setContainer('start_container');
                break;
            case 'summary_container':
                setContainer('message_container');
                break;
            default:
                setContainer('start_container');
        }
    };

    const onContinue = () => {
        switch (container) {
            case 'users_container':
                // `verifyUserSelected`.
                if (!confirmHelpReportedUser()) {
                    alert('guide.bully.request.usermissing');
                    break;
                }

                setContainer('chat_container');
                break;
            case 'message_container':
                if (verifyMessage()) setContainer('summary_container');
                break;
            case 'chat_container':
                // `verifySelectedChatLines`: the lines `collectSelectedEntries` would send for this mode.
                if (!hasSelectedHelpLines(entry)) {
                    alert('help.cfh.error.chatmissing');
                    break;
                }

                showReasons();
                break;
            default:
                setContainer('start_container');
        }
    };

    const onSubmit = () => {
        if (!topic) {
            alert('help.cfh.error.notopic');

            return;
        }

        submitCallForHelp(send, message, topic, true, entry);
        onClose();
    };

    /** The container `showContainer` showed; `topic_container` is the reason list showing topics. */
    const shown = (container === 'topic_container') ? 'reason_container' : container;

    const userItems: TemplateItem[] = listedUsers.map(user => ({
        key: String(user.userId),
        from: 'user_prototype',
        bindings: {
            '': { onPointerTap: () => selectUser(user) },
            user_bg: { alpha: (user.userId === reportedUserId) ? 1 : 0 },
            user_name: { caption: user.userName },
            room_name: { caption: user.roomName ? t('help.emergency.main.step.two.room.name', '', { room_name: user.roomName }) : '' },
            user_avatar: { children: (
                <AvatarImageWidgetHead
                    figure={user.figure}
                    cropped={false}
                />
            ) },
        },
    }));

    const chatLineItems: TemplateItem[] = (entry === 'im')
        ? imLines.map(item => ({
                key: `im_${item.index}`,
                from: 'chat_prototype',
                bindings: {
                    chat_text: { caption: item.text, onPointerTap: () => toggleHelpImLine(item.index) },
                    chat_check: { selected: item.selected, onPointerTap: () => toggleHelpImLine(item.index) },
                },
            }))
        : chatLines.map(item => ({
                key: String(item.index),
                from: 'chat_prototype',
                bindings: {
                    chat_text: { caption: item.text, onPointerTap: () => toggleHelpChatLine(item.index) },
                    chat_check: { selected: item.selected, onPointerTap: () => toggleHelpChatLine(item.index) },
                },
                arrange: fitListText('chat_text', 0),
            }));

    const topics = (container === 'topic_container') ? (categories.find(category => category.name === categoryName)?.topics ?? []) : [];
    /** `populateRoomReportButton`: one button, `help.cfh.topic.34` with the user's name, opening the room topic. */
    const roomReportItems: TemplateItem[] = [ {
        key: ROOM_REPORT_TOPIC_NAME,
        from: 'reason_prototype',
        bindings: {
            '': {
                onPointerTap: () => {
                    // `onReportTopic` -> `getTopic`: the topic of that name the server listed, if any.
                    setTopic(categories.flatMap(category => category.topics).find(topicData => topicData.name === ROOM_REPORT_TOPIC_NAME));
                    setContainer('message_container');
                },
            },
            name: { caption: t(`help.cfh.topic.${ROOM_REPORT_TOPIC_ID}`, '', { name: reportedUserName }) },
        },
        arrange: fitListText('name', 5),
    } ];
    const reasonItems: TemplateItem[] = roomReportButton
        ? roomReportItems
        : (container === 'topic_container')
                ? topics.map(entry => ({
                        key: `topic_${entry.id}`,
                        from: 'reason_prototype',
                        bindings: {
                            '': { onPointerTap: () => pickTopic(entry) },
                            name: { caption: t(`help.cfh.topic.${entry.id}`, '', { name: reportedUserName }) },
                        },
                        arrange: fitListText('name', 5),
                    }))
                : categories.map(category => ({
                        key: `reason_${category.name}`,
                        from: 'reason_prototype',
                        bindings: {
                            '': { onPointerTap: () => showTopics(category.name) },
                            name: { caption: `\${help.cfh.reason.${category.name}}` },
                        },
                    }));

    /** `updateUserData`: a forum thread's or message's report shows no user at all. */
    const forumReport = (entry === 'thread') || (entry === 'message');

    const bindings: TemplateBindings = {
        ...Object.fromEntries(CONTAINERS.map(name => [ name, { visible: false } ])),
        [shown]: { visible: true },
        continue_button: { visible: REQUIRES_CONTINUE_BUTTON.includes(shown), onPointerTap: onContinue },
        user: { visible: REQUIRES_USER_DATA.includes(shown) },
        // `updateBackButtonVisibility`, by the reporting mode.
        back_button: { visible: (container !== 'start_container') && ((entry === 'im') ? (container !== 'chat_container') : ((entry === 'room') || (entry === 'photo') || (entry === 'thread') || (entry === 'message')) ? (container !== 'reason_container') : true), onPointerTap: onBack },

        // `start_container`.
        reports_status_bitmap: { visible: reportsStatusEnabled },
        reports_status: {
            visible: reportsStatusEnabled,
            onPointerTap: () => {
                requestCfhReportsStatus(send);
                onClose();
            },
        },
        button_account: {
            onPointerTap: () => {
                if (zendeskUrl?.length) window.open(zendeskUrl, 'habboMain');
                onClose();
            },
        },
        faq_link: { onPointerTap: () => { if (faqUrl?.length) window.open(faqUrl, 'habboMain'); } },
        sanction_info_link: {
            onPointerTap: () => {
                requestSanctionStatus(send);
                onClose();
            },
        },
        button_user_report: { onPointerTap: showUsers },

        // `users_container`.
        user_list: { items: userItems },

        // `user` (`updateUserData`): a room report shows the room's name alone.
        user_info_title: { visible: (entry !== 'room') && !forumReport },
        reported_user_avatar: { visible: (entry !== 'room') && !forumReport && !!reportedUser, children: reportedUser && (
            <AvatarImageWidgetHead
                figure={reportedUser.figure}
                cropped
            />
        ) },
        reported_user_name: { visible: !forumReport, caption: (entry === 'room') ? reportedRoomName : reportedUserName },
        // `showReportingDialog`'s second argument: only the avatar menu's report offers another user.
        change_user: { visible: (entry === undefined) || (entry === 'user'), onPointerTap: showUsers },

        // `chat_container`.
        chat_list: { items: chatLineItems },

        // `reason_container`.
        reason_list: { items: reasonItems },

        // `message_container`: the unlawful fields stay hidden, and the description is the default one.
        unlawful_message_content: { visible: false },
        message_container_description: { caption: '${help.emergency.main.step.one.description}' },
        help_message: {
            children: (
                <HelpMessageInput
                    value={message}
                    onChange={setMessage}
                    maxChars={FIELD_MAX_CHARS}
                    emptyMessage={t('help.emergency.main.step.one.entry.instruction')}
                    width={390}
                    height={HELP_MESSAGE_HEIGHT}
                />
            ),
        },

        // `summary_container`.
        submit_button: { onPointerTap: onSubmit },
    };

    const arrange = ({ find }: TemplateWindows) => {
        find('help_message')?.setHeight(HELP_MESSAGE_HEIGHT);
    };

    return (
        <ModalDialog>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                bindings={bindings}
                arrange={arrange}
            />
        </ModalDialog>
    );
};
