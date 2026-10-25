/**
 * The messenger window - `com.sulake.habbo.messenger.MainView`, drawn from the `frame` of its
 * `messenger` template (style 100, 282x385, its container at (120, 120) of the desktop), the
 * header's close restyled to 102 (`header_button_close.style = 102`, the illumina minimize look):
 *
 * - `avatar_list`: one clone of its first child, a 35x35 tab, per open conversation - a friend's
 *   head in `avatar_image` or a group chat's badge in `group_badge_image`, the `chat_indicator` on
 *   an unread one, the name as `avatar_click_region`'s tooltip, the selected one framed (`blend` 1,
 *   the rest 0); the `avatars_scroll_left` / `_right` arrows when more are open than fit
 *   (`refreshAvatarList`: the scrolled-past tabs skipped, then as many as fit, side by side).
 * - `separator_label` with `messenger.window.separator` (`You + <name>`).
 * - `button_strip`: follow, profile and report; `close_conversation_button`.
 * - `conversation`: the selected conversation's entries (`createChatItem`) - message runs as
 *   `illumina_chat_bubble`s (`messengerChatBubbleItem`), and clones of `msg_notification` /
 *   `msg_invitation` / `msg_info` - kept scrolled to the newest, asking for older history when
 *   scrolled to the top.
 * - `input_widget`: `MessengerInput`, sending through `MainView.onInput`.
 *
 * `selectConversation` registers the selected friend's name for the separator and the input's empty
 * text, and `refreshChatCount` the open count for the title: they are the template's `parameters`.
 *
 * - `habbicon_button`: the habbicon picker (`MessengerHabbiconPicker`, `messenger_habbicon_picker`,
 *   drawn by the shared `HabbiconPickerView`) at the button's x, its bottom 4 above the input
 *   (`positionHabbiconPicker`); a pick is sent into the conversation (`onHabbiconSelected`), and
 *   the picker stays up while shift is held. Flash adds the picker to the messenger's container,
 *   but a press on the header or the scaler sends the last pressed window (the button, or the
 *   picker) `WME_CLICK_AWAY`, and `hideHabbiconPickerIfOutside` hides it before the window moves or
 *   resizes - as the picker's press-outside close does here.
 * - The frame resizes from 282x275 up (`width_min` / `height_min`); its children follow by their
 *   params. `WE_RESIZE` re-lays what `MainView` sizes itself: the items take the new
 *   `conversationItemWidth` (`adjustListItemWidths`) and the tabs refill the stretched
 *   `avatar_list` (`refreshAvatarList`).
 *
 * The report button reports the conversation (`HabboMessenger.reportUser` ->
 * `HabboHelp.reportUserFromIM`). The separator's label is hidden while no conversation is selected,
 * where `selectConversation(-1)` shows it (`§_-8K§ < 0`) - `MainView` hides the window then, so it
 * is not seen either way.
 */
import { useState } from 'react';

import { followMessengerConversation, getMessengerFriend, hideMessenger, hideMessengerConversation, openHabbiconHub, openMessengerConversationProfile, requestMessengerHistory, selectMessengerConversation, sendMessengerHabbicon, sendMessengerMessage } from '#base/commands';
import { reportUserFromIM } from '#base/commands/help/helpCommands';
import { AvatarImage } from '#base/components/AvatarImage';
import { useWebSocketContext } from '#base/context/communication';
import { useHabbiconsStore } from '#base/context/habbicons';
import {
    groupMessengerEntries, MESSENGER_ENTRY_INFO, MESSENGER_ENTRY_INVITATION, MESSENGER_ENTRY_NOTIFICATION, MESSENGER_ENTRY_OTHER, MESSENGER_ENTRY_OWN, MESSENGER_ITEM_WIDTH_INSET,
    MESSENGER_NO_CONVERSATION, MESSENGER_NOTIFICATION_ICON_WIDTH, MessengerChatEntry, MessengerConversation, useMessengerActions, useMessengerStore,
} from '#base/context/messenger';
import { useConfigBoolean, useGroupBadgeImageUrl } from '#base/context/system';
import { useFriends, useOwnUserFigure, useOwnUserGender, useUserStore } from '#base/context/user';
import { useReopenGuard } from '#base/hooks';
import { Box, findTemplateChild, getGlobalRect, Template, TemplateElement, TemplateItem, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';
import { HabbiconPickerLook, HabbiconPickerView } from '#base/views/habbicons/HabbiconPickerView';

import { MESSENGER_CHAT_BUBBLE_TEMPLATE, messengerCaption, messengerChatBubbleItem } from './MessengerChatBubble';
import { MessengerInput } from './MessengerInput';

const TEMPLATE = 'habbo-messenger-com/messenger_xml';
/** `MessengerHabbiconPicker` and its section/tile views' sizes and slot colours. */
const HABBICON_PICKER_LOOK: HabbiconPickerLook = {
    template: 'habbo-messenger-com/messenger_habbicon_picker_xml',
    width: 256,
    minHeight: 94,
    maxHeight: 304,
    topBarHeight: 42,
    bottomPadding: 6,
    columns: 5,
    slotSize: 45,
    slotSpacing: 2,
    filledColor: 0xffffff,
    emptyColor: 0xdddddd,
    hoverColor: 0xeeeeee,
};
/** `positionHabbiconPicker`: the picker's bottom sits 4 above `input_widget`, which shares the button's y. */
const HABBICON_PICKER_GAP = 4;
/** `messenger`'s frame and its layout width. */
const FRAME_WIDTH = 282;
/** `avatar_list`'s layout width and a tab's, which `refreshAvatarList` fits tabs into; the list stretches with the frame. */
const AVATAR_LIST_WIDTH = 248;
const AVATAR_SIZE = 35;
/** `input_widget`'s layout width; it stretches with the frame. */
const INPUT_WIDTH = 232;
/** `illumina_input:max_chars`. */
const INPUT_MAX_CHARS = 120;
/** `avatar_image`: the 45x72 widget the small head is drawn in the middle of. */
const AVATAR_IMAGE_WIDTH = 45;
const AVATAR_IMAGE_HEIGHT = 72;

/** `illumina_input:empty_message`. */
const INPUT_EMPTY_MESSAGE = '${messenger.window.input.default}';

/**
 * `avatar_list`'s tab, as `MainView` takes it out of the layout, at the blend `refreshAvatarList`
 * gives it - two copies, so a selected and an unselected tab never share an element. The blend fades
 * only the tab's own border: its children draw into its graphic context unfaded.
 */
const tabPrototypes = new WeakMap<Template, { selected: TemplateElement; unselected: TemplateElement }>();

const tabPrototype = (template: Template, selected: boolean): TemplateElement | undefined => {
    let made = tabPrototypes.get(template);

    if (!made) {
        const tab = findTemplateChild(template.elements, 'avatar_list')?.children[0];

        if (!tab) return undefined;

        made = { selected: { ...structuredClone(tab), blend: 1 }, unselected: { ...structuredClone(tab), blend: 0 } };
        tabPrototypes.set(template, made);
    }

    return selected ? made.selected : made.unselected;
};

/** A notice's text right of its 55px icon (`createChatItem`: `conversationItemWidth - 55`). */
const arrangeNotice = (itemWidth: number) => ({ find }: TemplateWindows) => {
    find('content')?.setWidth(itemWidth - MESSENGER_NOTIFICATION_ICON_WIDTH);
};

/** `msg_info`'s text held to `conversationItemWidth` (`limits.minWidth` / `maxWidth`). */
const arrangeInfo = (itemWidth: number) => ({ find }: TemplateWindows) => {
    const content = find('content');

    if (!content) return;

    content.minWidth = itemWidth;
    content.maxWidth = itemWidth;
    content.setWidth(itemWidth);
};

export const MessengerView = () => {
    const { send } = useWebSocketContext();
    const template = useTemplate(TEMPLATE);
    const bubbleTemplate = useTemplate(MESSENGER_CHAT_BUBBLE_TEMPLATE);
    const conversations = useMessengerStore(x => x.conversations);
    const entries = useMessengerStore(x => x.entries);
    const selectedChatId = useMessengerStore(x => x.selectedChatId);
    const avatarScrollOffset = useMessengerStore(x => x.avatarScrollOffset);
    const { setAvatarScrollOffset } = useMessengerActions();
    const habbiconPreviews = useHabbiconsStore(x => x.previews);
    const friends = useFriends();
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const ownName = useUserStore(x => x.name);
    const groupBadgeUrl = useGroupBadgeImageUrl();
    const [ frameSize, setFrameSize ] = useState<{ width: number; height: number } | null>(null);
    const frame = useTemplateFrame({ id: 'messenger', defaultPosition: { x: 120, y: 120 }, resizeDirection: 'all', onResize: setFrameSize, onClose: hideMessenger, closeButtonVariant: '102' });
    const habbiconsEnabled = useConfigBoolean('habbicons.enabled');
    const [ pickerAt, setPickerAt ] = useState<{ x: number; bottom: number } | null>(null);
    // A press on the button that just closed the picker from outside must not open it again.
    const pickerGuard = useReopenGuard();
    const closePicker = () => {
        pickerGuard.markClosed();
        setPickerAt(null);
    };

    const frameWidth = frameSize?.width ?? FRAME_WIDTH;
    // The frame's width change, which the stretching children (`avatar_list`, `input_widget`) take as well.
    const widthChange = frameWidth - FRAME_WIDTH;
    // `MainView.conversationItemWidth`.
    const itemWidth = frameWidth - MESSENGER_ITEM_WIDTH_INSET;

    const visible = conversations.filter(conversation => conversation.visible);
    const selected = conversations.find(conversation => conversation.chatId === selectedChatId);
    const friendName = selected?.name ?? '';
    // `refreshAvatarList`: skip the scrolled-past tabs, then as many as fit.
    const shownTabs = visible.slice(avatarScrollOffset, avatarScrollOffset + Math.floor((AVATAR_LIST_WIDTH + widthChange) / AVATAR_SIZE));
    const moreRight = visible.length > (avatarScrollOffset + shownTabs.length);
    const selectedEntries = entries[selectedChatId] ?? [];
    const selectedFriend = (selectedChatId > 0) ? friends[selectedChatId] : undefined;
    const newest = selectedEntries[selectedEntries.length - 1];

    const tabItem = (conversation: MessengerConversation, index: number): TemplateItem[] => {
        const prototype = template && tabPrototype(template, conversation.chatId === selectedChatId);
        const friend = conversation.chatId > 0;

        if (!prototype) return [];

        return [ {
            key: String(conversation.chatId),
            from: prototype,
            bindings: {
                avatar_image: {
                    visible: friend,
                    children: friend && (
                        <Box layout={{ width: AVATAR_IMAGE_WIDTH, height: AVATAR_IMAGE_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                            <AvatarImage
                                figure={conversation.figure}
                                gender={conversation.gender}
                                headOnly
                                direction={2}
                                scale={0.5}
                            />
                        </Box>
                    ),
                },
                group_badge_image: { visible: !friend, asset: friend ? undefined : groupBadgeUrl(conversation.figure) },
                chat_indicator: { visible: conversation.unread },
                avatar_click_region: { tooltip: conversation.name, onPointerTap: () => selectMessengerConversation(send, conversation.chatId) },
            },
            arrange: ({ root }: TemplateWindows) => {
                root()?.setX(index * AVATAR_SIZE);
            },
        } ];
    };

    const chatItem = (group: MessengerChatEntry[], key: string): TemplateItem[] => {
        const first = group[0];
        const bubble = (args: Omit<Parameters<typeof messengerChatBubbleItem>[1], 'key' | 'entries' | 'width' | 'habbiconPreviews' | 'onProfile'>) => (bubbleTemplate
            ? [ messengerChatBubbleItem(bubbleTemplate, { ...args, key, entries: group, width: itemWidth, habbiconPreviews, onProfile: userId => openMessengerConversationProfile(send, userId) }) ]
            : []);

        switch (first.type) {
            // `msg_normal`: a run of messages, as one `illumina_chat_bubble`.
            case MESSENGER_ENTRY_OWN:
                return bubble({
                    flipped: false,
                    figure: ownFigure,
                    gender: ownGender,
                    userName: ownName,
                    userId: 0,
                    persistedForOffline: !!selectedFriend && !selectedFriend.isOnline && (selectedFriend.persistedUser || selectedFriend.pocketHabboUser),
                });
            case MESSENGER_ENTRY_OTHER:
                return bubble({
                    flipped: true,
                    figure: first.senderFigure,
                    gender: getMessengerFriend(first.senderId)?.gender ?? ownGender,
                    userName: first.senderName,
                    userId: first.senderId,
                    persistedForOffline: false,
                });
            case MESSENGER_ENTRY_NOTIFICATION:
            case MESSENGER_ENTRY_INVITATION:
                return [ {
                    key,
                    from: (first.type === MESSENGER_ENTRY_NOTIFICATION) ? 'msg_notification' : 'msg_invitation',
                    bindings: { content: { caption: messengerCaption(first.message.text, first.message.localized) } },
                    arrange: arrangeNotice(itemWidth),
                } ];
            case MESSENGER_ENTRY_INFO:
                return [ {
                    key,
                    from: 'msg_info',
                    bindings: { content: { caption: messengerCaption(first.message.text, first.message.localized) } },
                    arrange: arrangeInfo(itemWidth),
                } ];
            default:
                return [];
        }
    };

    return (
        <>
            <TemplateWindow
                id={TEMPLATE}
                part="frame"
                frame={frame}
                parameters={{
                    'messenger.window.title': { open_chat_count: String(visible.length) },
                    'messenger.window.separator': { friend_name: friendName },
                    'messenger.window.input.default': { friend_name: friendName },
                }}
                bindings={{
                    avatar_list: { items: shownTabs.flatMap(tabItem) },
                    avatars_scroll_left: { visible: avatarScrollOffset > 0, onPointerTap: () => setAvatarScrollOffset(avatarScrollOffset - 1) },
                    avatars_scroll_right: { visible: moreRight, onPointerTap: () => setAvatarScrollOffset(avatarScrollOffset + 1) },
                    separator_label: { visible: ((selectedChatId < 0) || !!selected) && (selectedChatId !== MESSENGER_NO_CONVERSATION) },
                    follow_button: { onPointerTap: () => followMessengerConversation(send, selectedChatId) },
                    profile_button: { onPointerTap: () => openMessengerConversationProfile(send, selectedChatId) },
                    report_button: { onPointerTap: () => reportUserFromIM(selectedChatId) },
                    close_conversation_button: { onPointerTap: () => hideMessengerConversation(send, selectedChatId) },
                    // `toggleHabbiconPicker`.
                    habbicon_button: {
                        onPointerTap: (event) => {
                            if (!habbiconsEnabled || pickerGuard.justClosed()) return;

                            if (pickerAt) {
                                closePicker();

                                return;
                            }

                            const button = getGlobalRect(event.currentTarget);

                            setPickerAt({ x: Math.round(button.x), bottom: Math.round(button.y) - HABBICON_PICKER_GAP });
                        },
                    },
                    conversation: {
                        items: groupMessengerEntries(selectedChatId, selectedEntries).flatMap(item => chatItem(item.entries, item.key)),
                        // The bubbles' template too: until it is in, the list holds only the notices.
                        scrollEndKey: `${selectedChatId}:${selectedEntries.length}:${newest?.messageId ?? ''}:${bubbleTemplate ? 1 : 0}`,
                        onReachStart: () => requestMessengerHistory(send, selectedChatId),
                    },
                    input_widget: {
                        children: (
                            <MessengerInput
                                width={INPUT_WIDTH + widthChange}
                                emptyMessage={INPUT_EMPTY_MESSAGE}
                                parameters={{ 'messenger.window.input.default': { friend_name: friendName } }}
                                maxChars={INPUT_MAX_CHARS}
                                onSubmit={message => sendMessengerMessage(send, message)}
                            />
                        ),
                    },
                }}
            />
            {habbiconsEnabled && pickerAt && (
                <HabbiconPickerView
                    look={HABBICON_PICKER_LOOK}
                    x={pickerAt.x}
                    bottom={pickerAt.bottom}
                    onPick={(habbiconId, keepOpen) => {
                        sendMessengerHabbicon(send, habbiconId);

                        if (!keepOpen) closePicker();
                    }}
                    // `onOpenHubClicked`: `openHabbiconHub`, then `hide()`.
                    onOpenHub={() => {
                        openHabbiconHub(send);
                        closePicker();
                    }}
                    onClose={closePicker}
                />
            )}
        </>
    );
};
