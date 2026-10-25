/**
 * The friend bar's tabs as the clones `HabboFriendBarView.populate` adds to `new_bar`'s `list`.
 *
 * A friend's is `NewFriendEntityTab` on `new_friend_entity`, put where `allocateFriendTabWindow` puts
 * it - at (0, 0), `Tab.WIDTH` x `Tab.HEIGHT`, its game invite `bubble` hidden - with the friend's name
 * in `name` (cut by `TextCropper`) and face in `canvas` (`HabboFaceFocuser.focusUserFace` of the `h`
 * image, the head at direction 2). Each notification token puts its icon in `icons`, newest first and
 * one per tag (`addListItemAt(icon, 0)` unless `getListItemByTag` has one). Selected
 * (`NewFriendEntityTab.select`), `pieces` gets a `message_piece` per token and then
 * `new_controls_piece` at x 30 - chat, visit while the friend allows following (`allowFollow`), and
 * profile - and the tab grows upwards to hold them (`growSelectedFriendTab`).
 *
 * A find friends tab is `AddFriendsTab` on `add_friends_tab`, `Tab.HEIGHT` tall with its `icon` swapped
 * for `find_friends_icon_png` and its `text` hidden (`allocateEntityWindow`); selected, it takes back the
 * layout's own height upwards and shows the text (`growSelectedFindFriendsTab`), and its `button` finds
 * new friends (`DATA.findNewFriends`).
 *
 * Hovering a tab exposes it (`expose` / `conceal`): its colour over the default, and its `label`
 * underlined. A press on it selects or deselects it (`Tab._onMouseClick`); a press on its profile, one
 * of its buttons or the find button acts and deselects it, and stops there - Flash's own listeners on
 * those windows, which a press on them does not pass on to the tab.
 *
 * Not carried: `btn_game`, which `new_controls_piece` does not have and which opens the game centre,
 * which is not ported; the game invite `bubble`, which nothing in this revision shows; the profile
 * region's `toolTipDelay` of 100.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { IMessengerFriend } from '@nitrodevco/nitro-packets';
import { FederatedPointerEvent } from 'pixi.js';

import { AVATAR_FACE_SIZE, AvatarFaceImage } from '#base/components';
import { FriendBarNotification } from '#base/context/user';
import { Box, findLayoutChildByName, getLayoutListItems, LayoutImage, LayoutWindow, Template, TemplateBinding, TemplateItem } from '#base/theme';

import { FRIEND_BAR_TAB_HEIGHT, FRIEND_BAR_TAB_WIDTH } from './friendBarLayout';
import { FriendBarTokenIcon, GAME_TOKEN_TYPE, TOKEN_ICON_SIZE } from './FriendBarTokenIcon';

export const FRIEND_TAB_TEMPLATE = 'habbo-friend-bar-com/new_friend_entity_xml';
export const MESSAGE_PIECE_TEMPLATE = 'habbo-friend-bar-com/message_piece_xml';
export const CONTROLS_PIECE_TEMPLATE = 'habbo-friend-bar-com/new_controls_piece_xml';
export const FIND_FRIENDS_TAB_TEMPLATE = 'habbo-friend-bar-com/add_friends_tab_xml';

/** `NewFriendEntityTab.DEFAULT_COLOR` (`10338138`) and its exposed colour (`13891476`). */
const FRIEND_COLOR = 0x9dbf5a;
const FRIEND_EXPOSED_COLOR = 0xd3f794;
/** `AddFriendsTab.DEFAULT_COLOR` (`8374494`) and its exposed colour (`9560569`). */
const FIND_COLOR = 0x7fc8de;
const FIND_EXPOSED_COLOR = 0x91e1f9;
/** Where `select` puts `new_controls_piece` in `pieces`. */
const CONTROLS_X = 30;
/** `icons`' `spacing`. */
const ICON_SPACING = 2;

/** The notification types a tab makes a token for (`addNotificationToken`); a finished game makes none. */
const TOKEN_TYPES = [ 0, 1, 2, 3 ];

/** The friend's tokens, in the order they were added. */
export const friendTokens = (notifications: readonly FriendBarNotification[]) => notifications.filter(notification => TOKEN_TYPES.includes(notification.typeCode));

/** A token's `message_piece` texts: the kind of news, and what it is about. */
export interface TokenTexts {
    title: string;
    message: string;
}

/** The handlers every tab shares: the tab's own press and hover, and what a button press does. */
export interface TabHandlers {
    /** `Tab._onMouseClick`: select the tab, or deselect it when it is selected. */
    onToggle: () => void;
    /** `_onMouseOver` / `_onMouseOut`: only a tab that is not selected is exposed. */
    onExpose: (exposed: boolean) => void;
    /** Deselect the tab after one of its buttons acted. */
    onDeselect: () => void;
}

/**
 * `Tab._onMouseOut` conceals only when the pointer has left the whole tab
 * (`hitTestGlobalPoint`): moving onto one of its own windows is not leaving it.
 */
const leftTab = (event: FederatedPointerEvent) => !event.currentTarget.getBounds().containsPoint(event.global.x, event.global.y);

/** The tab's own window: its colour, its press and its hover. */
const tabRoot = (color: number, { onToggle, onExpose }: TabHandlers): TemplateBinding => ({
    color,
    onPointerTap: onToggle,
    onPointerOver: () => onExpose(true),
    onPointerOut: (event) => {
        if (leftTab(event)) onExpose(false);
    },
});

/** A button's press: it acts, deselects the tab, and goes no further. */
const act = (action: () => void, onDeselect: () => void) => (event: FederatedPointerEvent) => {
    event.stopPropagation();
    action();
    onDeselect();
};

export interface FriendTabArgs extends TabHandlers {
    friend: IMessengerFriend;
    tokens: readonly FriendBarNotification[];
    selected: boolean;
    exposed: boolean;
    profileTooltip: string;
    tokenTexts: (token: FriendBarNotification) => TokenTexts;
    messageTemplate: Template | undefined;
    controlsTemplate: Template | undefined;
    onChat: () => void;
    onVisit: () => void;
    onProfile: () => void;
}

export const friendTabItem = (template: Template, args: FriendTabArgs): TemplateItem => {
    const { friend, tokens, selected, exposed, profileTooltip, tokenTexts, messageTemplate, controlsTemplate, onChat, onVisit, onProfile, onToggle, onDeselect } = args;

    // `addListItemAt(icon, 0)` for a tag the list does not hold yet: one icon per tag, newest first.
    const icons: FriendBarNotification[] = [];

    for (const token of tokens) {
        const isGame = token.typeCode === GAME_TOKEN_TYPE;

        if (!icons.some(icon => ((icon.typeCode === GAME_TOKEN_TYPE) === isGame))) icons.unshift(token);
    }

    /** A token icon's `WME_CLICK` is the tab's own `onMouseClick`. */
    const toggleFromIcon = (event: FederatedPointerEvent) => {
        event.stopPropagation();
        onToggle();
    };

    const pieces: TemplateItem[] = [];

    if (selected) {
        if (messageTemplate) {
            for (const token of tokens) {
                const { title, message } = tokenTexts(token);

                pieces.push({
                    key: `token-${token.typeCode}`,
                    from: messageTemplate,
                    bindings: {
                        'items/title': { caption: title },
                        'items/message': { caption: message },
                    },
                });
            }
        }

        if (controlsTemplate) {
            pieces.push({
                key: 'controls',
                from: controlsTemplate,
                bindings: {
                    btn_chat: { onPointerTap: act(onChat, onDeselect) },
                    btn_visit: { visible: friend.canFollow, onPointerTap: friend.canFollow ? act(onVisit, onDeselect) : undefined },
                    button_profile: { onPointerTap: act(onProfile, onDeselect) },
                },
                arrange: ({ root }) => root()?.setX(CONTROLS_X),
            });
        }
    }

    return {
        key: `friend-${friend.playerId}`,
        from: template,
        bindings: {
            '': tabRoot(exposed ? FRIEND_EXPOSED_COLOR : FRIEND_COLOR, args),
            name: { caption: friend.name, underline: exposed, crop: true },
            region_profile: { tooltip: profileTooltip, onPointerTap: act(onProfile, onDeselect) },
            canvas: {
                children: (
                    <AvatarFaceImage
                        figure={friend.figure}
                        gender={friend.gender ?? AvatarGenderType.Unisex}
                        direction={2}
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                ),
            },
            icons: {
                children: (icons.length > 0) && (
                    // `icons` is 0 wide at x 117 and grows to the left as icons are added.
                    <Box layout={{ position: 'absolute', right: 0, top: 0, height: TOKEN_ICON_SIZE, flexDirection: 'row', gap: ICON_SPACING }}>
                        {icons.map((icon) => {
                            const tag = (icon.typeCode === GAME_TOKEN_TYPE) ? 'game' : 'notify';

                            return (
                                <FriendBarTokenIcon
                                    key={tag}
                                    typeCode={icon.typeCode}
                                    dropKey={`${friend.playerId}:${tag}:${icon.message}`}
                                    onPress={toggleFromIcon}
                                />
                            );
                        })}
                    </Box>
                ),
            },
            bubble: { visible: false },
            pieces: { added: pieces },
        },
        arrange: ({ root, find }) => {
            // `allocateFriendTabWindow`.
            root()?.setRectangle(0, 0, FRIEND_BAR_TAB_WIDTH, FRIEND_BAR_TAB_HEIGHT);

            // `refresh`: `canvas` takes the face bitmap's size, and its `on_resize_align_center` /
            // `_middle` params keep its centre, so the 10x10 slot becomes the face box around it.
            const canvas = find('canvas');

            canvas?.setWidth(AVATAR_FACE_SIZE);
            canvas?.setHeight(AVATAR_FACE_SIZE);
        },
    };
};

export interface FindFriendsTabArgs extends TabHandlers {
    index: number;
    selected: boolean;
    exposed: boolean;
    onFind: () => void;
}

export const findFriendsTabItem = (template: Template, args: FindFriendsTabArgs): TemplateItem => {
    const { index, selected, exposed, onFind, onDeselect } = args;

    return {
        key: `find-${index}`,
        from: template,
        bindings: {
            '': tabRoot(exposed ? FIND_EXPOSED_COLOR : FIND_COLOR, args),
            title: { underline: exposed },
            icon: { asset: LayoutImage('habbo-friend-bar-com/find_friends_icon.png') },
            text: { visible: selected },
            // `onButtonClick`: find new friends, and close the tab.
            button: { onPointerTap: act(onFind, onDeselect) },
        },
        // `allocateEntityWindow`: the tab is as tall as the bar's tabs until it is selected.
        arrange: ({ root }) => root()?.setHeight(FRIEND_BAR_TAB_HEIGHT),
    };
};

/** `IItemListWindow.getListItemAt`: a list's items are its `container`'s children. */
export const listItemAt = (list: LayoutWindow | undefined, index: number): LayoutWindow | undefined => getLayoutListItems(list)[index];

/** `NewFriendEntityTab.select`: the tab as tall as `pieces`, its bottom kept on the bar. */
export const growSelectedFriendTab = (tab: LayoutWindow) => {
    const pieces = findLayoutChildByName(tab, 'pieces');

    if (!pieces) return;

    tab.setHeight(pieces.height);
    tab.setY(FRIEND_BAR_TAB_HEIGHT - tab.height);
};

/** `AddFriendsTab.select`: the layout's own height back (`_SafeStr_8120`), grown upwards. */
export const growSelectedFindFriendsTab = (tab: LayoutWindow, template: Template) => {
    tab.setHeight(template.height);
    tab.setY(tab.y - (tab.height - FRIEND_BAR_TAB_HEIGHT));
};
