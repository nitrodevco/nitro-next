/**
 * The messenger window - `com.sulake.habbo.messenger.MainView`, drawn from its `messenger` layout
 * (style 100 frame, 282x385, content margins 1/40/1/0):
 *
 * - `avatar_list`: one 35x35 tab per open conversation, a friend's head or a group chat's badge,
 *   the `chat_indicator` on an unread one, the selected one framed (`blend` 1, the rest 0); the
 *   `avatars_scroll_left` / `_right` arrows when more are open than fit (`refreshAvatarList`).
 * - The `separator` with `messenger.window.separator` (`You + <name>`).
 * - `button_strip`: follow, profile and report; `close_conversation_button`.
 * - `conversation`: the selected conversation's entries (`createChatItem`) - message runs as
 *   `MessengerChatBubble`s, and `msg_notification` / `msg_invitation` / `msg_info` notices - kept
 *   scrolled to the newest, asking for older history when scrolled to the top.
 * - `input_widget`: `MessengerInput`, sending through `MainView.onInput`.
 *
 * Not drawn yet: `habbicon_button` and its picker (`MessengerHabbiconPicker`) - sending habbicons
 * comes with the habbicon picker; received habbicons are shown. The report button reports the
 * conversation (`HabboMessenger.reportUser` -> `HabboHelp.reportUserFromIM`). The frame is not
 * resizable: `MainView` re-lays its items on `WE_RESIZE`, and the port keeps the layout's size.
 */
import { followMessengerConversation, getMessengerFriend, hideMessenger, hideMessengerConversation, openMessengerConversationProfile, requestMessengerHistory, selectMessengerConversation, sendMessengerMessage } from '#base/commands';
import { reportUserFromIM } from '#base/commands/helpCommands';
import { AvatarImage } from '#base/components/AvatarImage';
import { useWebSocketContext } from '#base/context/communication';
import {
    groupMessengerEntries, MESSENGER_ENTRY_INFO, MESSENGER_ENTRY_INVITATION, MESSENGER_ENTRY_NOTIFICATION, MESSENGER_ENTRY_OTHER, MESSENGER_ENTRY_OWN, MESSENGER_ITEM_WIDTH_INSET,
    MESSENGER_NO_CONVERSATION, MESSENGER_NOTIFICATION_ICON_WIDTH, MessengerChatEntry, MessengerConversation, useMessengerActions, useMessengerStore,
} from '#base/context/messenger';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useFriends, useUserStore } from '#base/context/user';
import { Border, Box, Button, CloseButton, ContainerButton, Frame, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { MessengerChatBubble } from './MessengerChatBubble';
import { MessengerInput } from './MessengerInput';

/** `messenger`: the frame and the pieces placed in its content area. */
const FRAME_WIDTH = 282;
const FRAME_HEIGHT = 385;
const AVATAR_LIST_X = 16;
const AVATAR_LIST_WIDTH = 248;
const AVATAR_SIZE = 35;
const CONVERSATION_X = 7;
const CONVERSATION_Y = 84;
const CONVERSATION_WIDTH = 266;
const CONVERSATION_HEIGHT = 212;
/** `MainView.conversationItemWidth`. */
const ITEM_WIDTH = FRAME_WIDTH - MESSENGER_ITEM_WIDTH_INSET;
/** `illumina_input:max_chars`. */
const INPUT_MAX_CHARS = 120;
/** `separator_label`'s `0x444444`. */
const SEPARATOR_TEXT_COLOR = '#444444';
/** `msg_invitation`'s border colour. */
const INVITATION_COLOR = '#d1efde';

/** One `avatar_list` tab: `avatar_image` (a friend) or `group_badge_image` (a group chat), `chat_indicator`, `avatar_click_region`. */
const ConversationTab = ({ conversation, selected, left, groupBadgeUrl, onSelect }: { conversation: MessengerConversation; selected: boolean; left: number; groupBadgeUrl: string; onSelect: () => void }) => (
    <Border
        variant="102"
        blend={selected ? 1 : 0}
        layout={{ position: 'absolute', left, top: 0, width: AVATAR_SIZE, height: AVATAR_SIZE, overflow: 'hidden' }}
    >
        {(conversation.chatId > 0)
            ? (
                    // `avatar_image`: a 45x72 widget at (-3, -14) that draws the small head in its middle.
                    <Box layout={{ position: 'absolute', left: -3, top: -14, width: 45, height: 72, alignItems: 'center', justifyContent: 'center' }}>
                        <AvatarImage
                            figure={conversation.figure}
                            gender={conversation.gender}
                            headOnly
                            direction={2}
                            scale={0.5}
                        />
                    </Box>
                )
            : (
                    <ThemeImage
                        src={groupBadgeUrl.replace('%badgedata%', conversation.figure)}
                        bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                        scale={0.5}
                        layout={{ position: 'absolute', left: 8, top: 8, width: 20, height: 20 }}
                        eventMode="none"
                    />
                )}
        {conversation.unread && (
            <ThemeImage
                src={LayoutImage('habbo-window-manager-com/common_chat_indicator.png')}
                layout={{ position: 'absolute', left: 19, top: 6, width: 13, height: 12 }}
                eventMode="none"
            />
        )}
        <Region
            name="avatar_click_region"
            tooltip={conversation.name}
            onPointerTap={onSelect}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, top: 0, width: AVATAR_SIZE, height: AVATAR_SIZE }}
        />
    </Border>
);

/** `msg_notification` / `msg_invitation`: a style 105 border with its icon and the text right of it. */
const NoticeItem = ({ text, icon, tintColor }: { text: string; icon: string; tintColor?: string }) => (
    <Border
        variant="105"
        tintColor={tintColor}
        layout={{ width: ITEM_WIDTH, minHeight: 50, flexDirection: 'row', flexShrink: 0 }}
    >
        <ThemeImage
            src={LayoutImage(icon)}
            bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
            layout={{ position: 'absolute', left: 0, top: 0, width: 50, height: 50 }}
            eventMode="none"
        />
        <ThemeText
            text={text}
            textStyle="il_regular"
            textOptions={{ wordWrap: true, wordWrapWidth: ITEM_WIDTH - MESSENGER_NOTIFICATION_ICON_WIDTH }}
            // 8 from the top and 9 below, as the official client draws it (checked against a capture).
            layout={{ marginLeft: 50, marginTop: 8, marginBottom: 9, width: ITEM_WIDTH - MESSENGER_NOTIFICATION_ICON_WIDTH }}
        />
    </Border>
);

export const MessengerView = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const conversations = useMessengerStore(x => x.conversations);
    const entries = useMessengerStore(x => x.entries);
    const selectedChatId = useMessengerStore(x => x.selectedChatId);
    const avatarScrollOffset = useMessengerStore(x => x.avatarScrollOffset);
    const { setAvatarScrollOffset } = useMessengerActions();
    const friends = useFriends();
    const ownFigure = useUserStore(x => x.figure);
    const ownGender = useUserStore(x => x.sex);
    const ownName = useUserStore(x => x.name);
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';

    const visible = conversations.filter(conversation => conversation.visible);
    const selected = conversations.find(conversation => conversation.chatId === selectedChatId);
    const friendName = selected?.name ?? '';
    // `refreshAvatarList`: skip the scrolled-past tabs, then as many as fit.
    const shownTabs = visible.slice(avatarScrollOffset, avatarScrollOffset + Math.floor(AVATAR_LIST_WIDTH / AVATAR_SIZE));
    const moreRight = visible.length > (avatarScrollOffset + shownTabs.length);
    const selectedEntries = entries[selectedChatId] ?? [];
    const items = groupMessengerEntries(selectedChatId, selectedEntries);
    const selectedFriend = (selectedChatId > 0) ? friends[selectedChatId] : undefined;
    const newest = selectedEntries[selectedEntries.length - 1];

    const renderItem = (group: MessengerChatEntry[], key: string) => {
        const first = group[0];

        switch (first.type) {
            // `msg_normal`: a run of messages, as one `illumina_chat_bubble`.
            case MESSENGER_ENTRY_OWN:
                return (
                    <MessengerChatBubble
                        key={key}
                        entries={group}
                        flipped={false}
                        width={ITEM_WIDTH}
                        figure={ownFigure}
                        gender={ownGender}
                        userName={ownName}
                        userId={0}
                        persistedForOffline={!!selectedFriend && !selectedFriend.isOnline && (selectedFriend.persistedUser || selectedFriend.pocketHabboUser)}
                        onProfile={userId => openMessengerConversationProfile(send, userId)}
                    />
                );
            case MESSENGER_ENTRY_OTHER: {
                const sender = getMessengerFriend(first.senderId);

                return (
                    <MessengerChatBubble
                        key={key}
                        entries={group}
                        flipped
                        width={ITEM_WIDTH}
                        figure={first.senderFigure}
                        gender={sender?.gender ?? ownGender}
                        userName={first.senderName}
                        userId={first.senderId}
                        persistedForOffline={false}
                        onProfile={userId => openMessengerConversationProfile(send, userId)}
                    />
                );
            }
            case MESSENGER_ENTRY_NOTIFICATION:
            case MESSENGER_ENTRY_INVITATION: {
                const message = first.message.localized ? t(first.message.text) : first.message.text;

                return (first.type === MESSENGER_ENTRY_NOTIFICATION)
                    ? (
                            <NoticeItem
                                key={key}
                                text={message}
                                icon="habbo-window-manager-com/messenger_caution.png"
                            />
                        )
                    : (
                            <NoticeItem
                                key={key}
                                text={message}
                                icon="habbo-window-manager-com/messenger_notification_icon.png"
                                tintColor={INVITATION_COLOR}
                            />
                        );
            }
            case MESSENGER_ENTRY_INFO:
                return (
                    <ThemeText
                        key={key}
                        text={first.message.localized ? t(first.message.text) : first.message.text}
                        textStyle="il_regular"
                        textOptions={{ align: 'center', wordWrap: true, wordWrapWidth: ITEM_WIDTH }}
                        layout={{ width: ITEM_WIDTH, marginTop: 10, marginBottom: 10, flexShrink: 0 }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Frame
            variant="100"
            id="messenger"
            caption={t('messenger.window.title', '', { open_chat_count: String(visible.length) })}
            dropShadow={{ distance: 0, alpha: 0.35, blur: 20 }}
            onClose={hideMessenger}
            // `MainView`: `header_button_close.style = 102`, the illumina minimize look.
            closeButtonVariant="102"
            resizeDirection="none"
            // The layout's container sits at (120, 120) of the desktop.
            defaultPosition={{ x: 120, y: 120 }}
            margins={[ 1, 40, 1, 0 ]}
            layout={{ position: 'absolute', width: FRAME_WIDTH, height: FRAME_HEIGHT }}
        >
            {/* `avatar_list` */}
            <Box layout={{ position: 'absolute', left: AVATAR_LIST_X, top: 0, width: AVATAR_LIST_WIDTH, height: 40, overflow: 'hidden' }}>
                {shownTabs.map((conversation, index) => (
                    <ConversationTab
                        key={conversation.chatId}
                        conversation={conversation}
                        selected={conversation.chatId === selectedChatId}
                        left={index * AVATAR_SIZE}
                        groupBadgeUrl={groupBadgeUrl}
                        onSelect={() => selectMessengerConversation(send, conversation.chatId)}
                    />
                ))}
            </Box>
            {(avatarScrollOffset > 0) && (
                <Region
                    name="avatars_scroll_left"
                    onPointerTap={() => setAvatarScrollOffset(avatarScrollOffset - 1)}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 15, height: 35 }}
                >
                    <ThemeImage
                        src={LayoutImage('habbo-window-manager-com/help_habboway_prev.png')}
                        bitmap={{ pivot: 'center left', stretchedX: false, stretchedY: false }}
                        layout={{ position: 'absolute', left: 7, top: 0, width: 8, height: 35 }}
                        eventMode="none"
                    />
                </Region>
            )}
            {moreRight && (
                <Region
                    name="avatars_scroll_right"
                    onPointerTap={() => setAvatarScrollOffset(avatarScrollOffset + 1)}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 265, top: 0, width: 15, height: 35 }}
                >
                    <ThemeImage
                        src={LayoutImage('habbo-window-manager-com/help_habboway_next.png')}
                        bitmap={{ pivot: 'center left', stretchedX: false, stretchedY: false }}
                        layout={{ position: 'absolute', left: 1, top: 0, width: 8, height: 35 }}
                        eventMode="none"
                    />
                </Region>
            )}
            {/*
              * The `separator` widget (`SeparatorWidget.refresh`): `illumina_light_separator_horizontal`
              * tiled across at `height / 2 - 1`, then every visible child's rectangle cleared - so the
              * line breaks where `separator_label` sits: its caption plus its 5px margins, from the left.
              */}
            <Box layout={{ position: 'absolute', left: 0, top: 39, width: FRAME_WIDTH - 1, height: 15, flexDirection: 'row' }}>
                {((selectedChatId < 0) || !!selected) && (selectedChatId !== MESSENGER_NO_CONVERSATION) && (
                    <ThemeText
                        text={t('messenger.window.separator', '', { friend_name: friendName })}
                        textStyle="il_border"
                        textOptions={{ fill: SEPARATOR_TEXT_COLOR }}
                        layout={{ marginLeft: 5, marginRight: 5, flexShrink: 0 }}
                    />
                )}
                <Box layout={{ flexGrow: 1, height: 15 }}>
                    <ThemeImage
                        src={LayoutImage('habbo-window-manager-com/illumina_light_separator_horizontal.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, wrapX: true }}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 6, width: '100%', height: 2 }}
                        eventMode="none"
                    />
                </Box>
            </Box>
            {/* `button_strip` */}
            <ContainerButton
                name="follow_button"
                variant="102"
                tooltip={t('messenger.followfriend.tooltip')}
                onPointerTap={() => followMessengerConversation(send, selectedChatId)}
                layout={{ position: 'absolute', left: 7, top: 57, width: 21, height: 20 }}
            >
                <ThemeImage
                    src={LayoutImage('habbo-window-manager-com/messenger_visit_icon.png')}
                    layout={{ position: 'absolute', left: 6, top: 5 }}
                    eventMode="none"
                />
            </ContainerButton>
            <ContainerButton
                name="profile_button"
                variant="102"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={() => openMessengerConversationProfile(send, selectedChatId)}
                layout={{ position: 'absolute', left: 32, top: 57, width: 30, height: 20 }}
            >
                <ThemeImage
                    src={LayoutImage('habbo-window-manager-com/messenger_profile_icon.png')}
                    layout={{ position: 'absolute', left: 7, top: 4 }}
                    eventMode="none"
                />
            </ContainerButton>
            <Button
                name="report_button"
                variant="102"
                textStyle="il_button"
                tooltip={t('messenger.window.button.report.tooltip')}
                onPointerTap={() => reportUserFromIM(selectedChatId)}
                // The layout's 193 is its maximum: the `button_strip` item fits its caption. `height_max`
                // 20 holds it under the style's own 28px minimum.
                layout={{ position: 'absolute', left: 66, top: 57, height: 20, minHeight: 20, maxHeight: 20, maxWidth: 193 }}
            >
                {t('messenger.window.button.report')}
            </Button>
            <CloseButton
                name="close_conversation_button"
                variant="100"
                onPointerTap={() => hideMessengerConversation(send, selectedChatId)}
                layout={{ position: 'absolute', left: 253, top: 57, width: 20, height: 20 }}
            />
            {/* `conversation` */}
            <ScrollArea
                scrollEndKey={`${selectedChatId}:${selectedEntries.length}:${newest?.messageId ?? ''}`}
                onReachStart={() => requestMessengerHistory(send, selectedChatId)}
                layout={{ position: 'absolute', left: CONVERSATION_X, top: CONVERSATION_Y, width: CONVERSATION_WIDTH, height: CONVERSATION_HEIGHT }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 0 }}
            >
                {items.map(item => renderItem(item.entries, item.key))}
            </ScrollArea>
            {/*
              * `habbicon_button`: toggles `MessengerHabbiconPicker` in Flash. The picker is not ported
              * yet, so the button draws and does nothing.
              */}
            <ContainerButton
                name="habbicon_button"
                variant="102"
                tooltip={t('messenger.habbicons.tooltip')}
                layout={{ position: 'absolute', left: 243, top: 305, width: 30, height: 28, minHeight: 28 }}
            >
                <ThemeImage
                    src={LayoutImage('habbo-window-manager-com/habbicons_habbicons_dm.png')}
                    bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 8, top: 7, width: 14, height: 14 }}
                    eventMode="none"
                />
            </ContainerButton>
            {/* `input_widget` */}
            <Box layout={{ position: 'absolute', left: CONVERSATION_X, top: 305, width: 232, height: 30 }}>
                <MessengerInput
                    width={232}
                    emptyMessage={t('messenger.window.input.default', '', { friend_name: friendName })}
                    maxChars={INPUT_MAX_CHARS}
                    onSubmit={message => sendMessengerMessage(send, message)}
                />
            </Box>
        </Frame>
    );
};
