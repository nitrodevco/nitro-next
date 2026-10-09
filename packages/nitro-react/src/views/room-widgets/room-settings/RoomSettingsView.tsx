import { RoomDoorModeEnum, RoomModerationType, RoomThicknessType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { IFlatCategory, IFlatController, IMessengerFriend, RoomSettingsDataEventMessageType } from '@nitrodevco/nitro-packets';
import { ReactNode, useState } from 'react';

import { openClientLink, openProfile } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { RoomSettingsErrorField, RoomSettingsFormError } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { findTemplateChild, TemplateBindings, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';
import { flatCategoryName } from '#base/utils';
import { NavigatorErrorPopup } from '#base/views/navigator/NavigatorErrorPopup';

import { BANNED_USER_TEMPLATE, FLAT_CONTROLLER_TEMPLATE, FRIEND_TEMPLATE, userRowItem } from './roomSettingsUserRows';

/**
 * `startRoomSettingsEdit` / `startRoomSettingsEditFromNavigator`: with no `roomId` the window edits
 * the room you are standing in; the navigator's room info popup names another room and its group.
 */
export type RoomSettingsViewWindowParams = { roomId?: number; groupId?: number };

export interface RoomSettingsViewProps {
    settings: RoomSettingsDataEventMessageType;
    /** `navigator.data.allCategories` - every category the client knows, unfiltered. */
    categories: IFlatCategory[];
    /** Who holds rights in the room. */
    controllers: IFlatController[];
    /** Who is banned from it. */
    bannedUsers: IFlatController[];
    /** Which banned row is picked out; the one unban button acts on it (`BanListCtrl.selectedRow`). */
    selectedBannedUser: number;
    /** Your friends, so rights can be handed to one without typing a name. */
    friends: IMessengerFriend[];
    /** What has been typed into the friend search on the rights tab. */
    friendFilter: string;
    /** Only read for a password door: the server never sends the current one back. */
    password: string;
    passwordConfirm: string;
    /** `refreshMaxVisitors`: the steps the `maxvisitors` menu offers, and the one it has selected. */
    visitorSteps: number[];
    selectedVisitors: number;
    /** `VIPFeaturesAllowed()` - without it the whole club tab is dead and its values are left as the server sent them. */
    hasClub: boolean;
    /** `_groupId > 0`: a group room's moderation powers can also be given to its admins. */
    isGroupRoom: boolean;
    /** `showDeleteButton`: the delete link is hidden outside the room and greyed while the account is safety locked. */
    canDelete: boolean;
    deleteDisabled: boolean;
    /** `hasSecurity(4)`: staff never see the Builders Club "room locked" panel. */
    isStaff: boolean;
    /** Which of the five tabs is open. */
    tab: number;
    /**
     * `_removeTabsForNavigatorView`: the settings of a room you are not standing in (opened from the
     * navigator) leave out the access and rights tabs, and `resizeTabs` spreads the rest wider.
     */
    removeTabsForNavigatorView: boolean;
    /** What the last save was refused for, shown over the field it names, or nothing. */
    error: RoomSettingsFormError | undefined;
    onChangeTab: (tab: number) => void;
    /** A field being typed into: the form changes, nothing is sent until the field is left. */
    onChange: (changes: Partial<RoomSettingsDataEventMessageType>) => void;
    /** A pick - a dropmenu, switch or door mode: the form changes and is saved (`onUnfocus`). */
    onSelectSetting: (changes: Partial<RoomSettingsDataEventMessageType>) => void;
    /** The three room behaviour switches: saved only once their timeouts are valid (`onRoomBehaviorSettingsChanged`). */
    onSelectBehaviour: (changes: Partial<RoomSettingsDataEventMessageType>) => void;
    /** A text field was left: the form as typed is saved. */
    onCommit: () => void;
    onChangePassword: (password: string) => void;
    onChangePasswordConfirm: (password: string) => void;
    onChangeFriendFilter: (filter: string) => void;
    onGiveRights: (userId: number) => void;
    onTakeRights: (userId: number) => void;
    onTakeAllRights: () => void;
    onSelectBannedUser: (userId: number) => void;
    onUnban: () => void;
    onDeleteRoom: () => void;
    onClose: () => void;
}

const TEMPLATE = 'habbo-navigator-com/ros_room_settings_xml';

/** `navigator.roomsettings.tab.N` - the five tabs, `tab_1` to `tab_5`. */
const TABS = [ 1, 2, 3, 4, 5 ];

const TAB_ACCESS = 2;
const TAB_RIGHTS = 3;

/** `UserListCtrl.DISPLAY_LIMIT`: neither user list ever draws more rows than this. */
const DISPLAY_LIMIT = 200;

/** `populateForm` / `save`: the `doormode` selector's radio button of each door mode. */
const DOOR_MODES: { mode: RoomDoorModeEnum; name: string }[] = [
    { mode: RoomDoorModeEnum.Open, name: 'doormode_open' },
    { mode: RoomDoorModeEnum.Locked, name: 'doormode_doorbell' },
    { mode: RoomDoorModeEnum.Invisible, name: 'doormode_invisible' },
    { mode: RoomDoorModeEnum.Password, name: 'doormode_password' },
];

/** `setTradeModeSelection`: the entries, whose index is the trade mode. */
const TRADE_MODES = [ RoomTradeModeEnum.Disabled, RoomTradeModeEnum.RoomOwnerAndRights, RoomTradeModeEnum.Everyone ];
const TRADE_MODE_TEXTS = [ '${navigator.roomsettings.trade_not_allowed}', '${navigator.roomsettings.trade_not_with_Controller}', '${navigator.roomsettings.trade_allowed}' ];

/**
 * `RoomSettingsCtrl.localizeItems`: every moderation level the client can name. Value 3 is not one
 * of them - no Flash key exists for it - so a room that comes back with it falls to the first
 * option, exactly as `normalizeSelection` does.
 */
const MODERATION_TEXTS: Partial<Record<RoomModerationType, string>> = {
    [RoomModerationType.None]: '${navigator.roomsettings.moderation.none}',
    [RoomModerationType.Rights]: '${navigator.roomsettings.moderation.rights}',
    [RoomModerationType.All]: '${navigator.roomsettings.moderation.all}',
    [RoomModerationType.GroupRights]: '${navigator.roomsettings.moderation.group_admins}',
    [RoomModerationType.RightsOrGroup]: '${navigator.roomsettings.moderation.group_admins_and_rights}',
};

type ModerationPower = 'mute' | 'kick' | 'ban';

/** `populateRoomModerationSettings`: which levels each power offers, and what a group room adds. */
const moderationLevels = (power: ModerationPower, isGroupRoom: boolean): RoomModerationType[] => {
    const base = (power === 'kick')
        ? [ RoomModerationType.None, RoomModerationType.Rights, RoomModerationType.All ]
        : [ RoomModerationType.None, RoomModerationType.Rights ];

    return isGroupRoom ? [ ...base, RoomModerationType.GroupRights, RoomModerationType.RightsOrGroup ] : base;
};

/** `getThicknessSelectionIndex`: the `wall_thickness` / `floor_thickness` entry of a thickness; `save` takes `selection - 2`. */
const thicknessIndex = (thickness: RoomThicknessType) => {
    const index = Number(thickness) + 2;

    return [ 0, 1, 3 ].includes(index) ? index : 2;
};

/** `TextFieldManager`'s `maxChars` for each field (the layout sets none). */
const MAX_NAME_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_TAG_LENGTH = 30;
const MAX_PASSWORD_LENGTH = 30;
const MAX_TIMEOUT_LENGTH = 5;
const MAX_TAGS = 2;

/** `disableWindow` / `enableWindow`: a disabled window is blended to half. */
const DISABLED_ALPHA = 0.5;

/** `getHelpPageWithTab`: tab 4's help page; every other tab has none. */
const HELP_PAGE_TAB = 4;
const HELP_PAGE = 'chat/options';

/** `TextFieldManager.displayError`: a refused field's `textBackgroundColor` (`0xFFF18F9B`). */
const ERROR_BACKGROUND = 0xf18f9b;

/** A timeout typed: its digits, as many as the field takes. */
const parseTimeout = (text: string) => Number(text.replace(/\D/g, '').slice(0, MAX_TIMEOUT_LENGTH)) || 0;

/**
 * The room settings, drawn from `habbo-navigator-com/ros_room_settings` - `RoomSettingsCtrl`, which
 * builds it in `prepareWindow` and opens it centred (`_window.center()`).
 *
 * - The tabs: `onTab` / `switchToTab` select `tab_N`, and `refresh` shows only `tab_container_N` of
 *   `content_container` (`Util.hideChildren`). `refreshNavigatorTabs` hides tabs 2 and 3 for a room
 *   you are not standing in, and `resizeTabs` gives each visible tab `_window.width / visible - 1`
 *   and a hidden one 0, which the tab context's selector packs.
 * - Tab 1: `room_name`, `description`, the two tags (`setTag` shows a tag with its `#`, `addTag`
 *   takes it off), the `categories` (`setCategorySelection`: the visible non-automatic ones and the
 *   room's own), `maxvisitors` (`refreshMaxVisitors`) and `tradesettings` (`setTradeModeSelection`)
 *   menus, `allow_walk_through_checkbox`, and `remove_link_region` (`showDeleteButton`: greyed while
 *   the account is safety locked), its `remove_icon` put 15 left of `remove_link`.
 * - Tab 2: the `doormode` radio buttons, `password_container` while the password door is picked
 *   (`changePasswordField`), `doormode_override_info` while Builders Club hid the room (staff are not
 *   told), and `flexible_content`: `guild_access_disclaimer` in a group room, then the pet switches.
 * - Tab 3: `filter_users_input` narrows both lists (`refreshFlatControllers`), the users with rights
 *   and the friends without them (`UserListCtrl`, `roomSettingsUserRows`), with their counts as the
 *   texts' `displayed` / `total` parameters, and `remove_all_flat_ctrls`.
 * - Tab 4: `refreshRoomBehaviorSettingsState` / `refreshTimeoutFieldState` - without club the club
 *   settings are disabled at half blend, and each timeout field only while its switch is off; the
 *   wall / floor thickness and flood menus take their entries from the layout's `item_array`.
 * - Tab 5: the three moderation menus (`populateRoomModerationSettings`), the banned users
 *   (`BanListCtrl`) and `moderation_unban_btn`.
 *
 * There is no Save button: `onUnfocus` saves the whole form on every pick and whenever a text field
 * is left. `TextFieldManager.displayError` puts `nav_error_popup` over a refused field, in the
 * field's parent. The Builders Club panel's `builders_faq_button` sends the
 * `habbopages/builders-club/faq` link, which `openClientLink` only logs until the habbo pages are ported.
 *
 * `TextFieldManager` gives each field its `maxChars`, and `displayError` tints a refused one
 * (`textBackgroundColor`) as well as putting its popup over it.
 */
export const RoomSettingsView = ({
    settings, categories, controllers, bannedUsers, selectedBannedUser, friends, friendFilter,
    password, passwordConfirm, visitorSteps, selectedVisitors, hasClub, isGroupRoom, canDelete, deleteDisabled, isStaff,
    tab, removeTabsForNavigatorView, error,
    onChangeTab, onChange, onSelectSetting, onSelectBehaviour, onCommit, onChangePassword, onChangePasswordConfirm, onChangeFriendFilter,
    onGiveRights, onTakeRights, onTakeAllRights, onSelectBannedUser, onUnban, onDeleteRoom, onClose,
}: RoomSettingsViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const template = useTemplate(TEMPLATE);
    const flatControllerTemplate = useTemplate(FLAT_CONTROLLER_TEMPLATE);
    const friendTemplate = useTemplate(FRIEND_TEMPLATE);
    const bannedUserTemplate = useTemplate(BANNED_USER_TEMPLATE);
    const frame = useTemplateFrame({ id: 'room-settings', centered: true, rememberPosition: false, onClose });
    // `onBgMouseOver` / `onBgMouseOut` and `onUserInfoMouseOver` / `Out`: the row, and the eye, under the pointer.
    const [ hoveredRow, setHoveredRow ] = useState<string>();
    const [ hoveredEye, setHoveredEye ] = useState<string>();

    const isTabRemoved = (index: number) => removeTabsForNavigatorView && ((index === TAB_ACCESS) || (index === TAB_RIGHTS));
    const visibleTabCount = TABS.filter(index => !isTabRemoved(index)).length;

    /** `TextFieldManager.displayError`'s popup over a field, in that field's parent's coordinates. */
    const errorPopup = (field: RoomSettingsErrorField, name: string, shown: boolean = error?.field === field): ReactNode => {
        const rect = template && findTemplateChild(template.elements, name);

        return (shown && error && rect)
            ? (
                    <NavigatorErrorPopup
                        key={name}
                        text={t(error.key)}
                        fieldLeft={rect.x}
                        fieldTop={rect.y}
                        fieldWidth={rect.width}
                    />
                )
            : null;
    };

    /** `displayError`'s tint on the field the last save was refused for. */
    const refusedBackground = (field: RoomSettingsErrorField) => ((error?.field === field) ? ERROR_BACKGROUND : undefined);

    // `setTagError`: only the tag input holding the tag the server named is marked.
    const isTagError = (index: number) => (error?.field === 'tags') && !!settings.tags[index]
        && [ settings.tags[index].toLowerCase(), `#${settings.tags[index].toLowerCase()}` ].includes((error.tag ?? '').toLowerCase());

    // `setCategorySelection`: the visible non-automatic categories, plus the room's own even when it is hidden.
    const shownCategories = categories.filter(category => (category.visible || (category.nodeId === settings.categoryId)) && !category.automatic);
    const categoryIndex = Math.max(0, shownCategories.findIndex(category => category.nodeId === settings.categoryId));
    const visitorIndex = Math.max(0, visitorSteps.indexOf(selectedVisitors));
    const tradeIndex = Math.max(0, TRADE_MODES.findIndex(mode => Number(mode) === Number(settings.tradeMode)));

    // `refreshRoomBehaviorSettingsState` / `refreshTimeoutFieldState`.
    const clubAlpha = hasClub ? 1 : DISABLED_ALPHA;
    const idleSleepActive = hasClub && settings.idleSleepEnabled;
    const idleAutokickActive = hasClub && settings.idleAutokickEnabled;

    // `refreshFlatControllers`: `filter_users_input` narrows both lists as you type; a friend already holding rights drops out.
    const filter = friendFilter.trim().toLowerCase();
    const matches = (name: string) => (!filter.length || name.toLowerCase().includes(filter));
    const friendsWithoutRights = friends.filter(friend => !controllers.some(controller => controller.userId === friend.playerId));
    const shownControllers = controllers.filter(controller => matches(controller.userName)).slice(0, DISPLAY_LIMIT);
    const candidates = friendsWithoutRights.filter(friend => matches(friend.name)).slice(0, DISPLAY_LIMIT);

    const rowHandlers = (key: string, userId: number) => ({
        hovered: hoveredRow === key,
        eyeHovered: hoveredEye === key,
        onHover: (hovered: boolean) => setHoveredRow(current => (hovered ? key : ((current === key) ? undefined : current))),
        onEyeHover: (hovered: boolean) => setHoveredEye(current => (hovered ? key : ((current === key) ? undefined : current))),
        // `onUserInfoMouseClick`.
        onEye: () => openProfile(send, userId),
    });

    // `populateRoomModerationSettings`: each menu's entries, and `normalizeSelection` - a level the room cannot offer reads as the first.
    const moderationMenu = (power: ModerationPower, value: RoomModerationType, key: 'whoCanMute' | 'whoCanKick' | 'whoCanBan') => {
        const levels = moderationLevels(power, isGroupRoom);

        return {
            options: levels.map(level => MODERATION_TEXTS[level] ?? ''),
            selection: Math.max(0, levels.indexOf(Number(value))),
            onSelect: (index: number) => onSelectSetting({ moderation: { ...settings.moderation, [key]: levels[index] } }),
        };
    };

    const doorMode = Number(settings.doorMode);

    const bindings: TemplateBindings = {
        // `refresh` / `switchToTab`: `_window.helpPage = getHelpPageWithTab(_currentTab)` - the chat options page on tab 4.
        '': { helpPage: (tab === HELP_PAGE_TAB) ? HELP_PAGE : '' },
        ...Object.fromEntries(TABS.flatMap(index => [
            [ `tab_${index}`, { visible: !isTabRemoved(index), selected: tab === index, onPointerTap: () => onChangeTab(index) } ],
            [ `tab_container_${index}`, { visible: tab === index } ],
        ])),

        // Tab 1.
        tab_container_1: {
            visible: tab === 1,
            children: [ errorPopup('name', 'room_name'), errorPopup('description', 'description') ],
        },
        room_name: { caption: settings.name, maxChars: MAX_NAME_LENGTH, backgroundColor: refusedBackground('name'), onChange: name => onChange({ name }), onBlur: onCommit },
        description: { caption: settings.description, maxChars: MAX_DESCRIPTION_LENGTH, backgroundColor: refusedBackground('description'), onChange: description => onChange({ description }), onBlur: onCommit },
        categories: {
            options: shownCategories.map(category => flatCategoryName(category, t)),
            selection: categoryIndex,
            onSelect: index => onSelectSetting({ categoryId: shownCategories[index]?.nodeId ?? settings.categoryId }),
        },
        maxvisitors: {
            options: visitorSteps.map(String),
            selection: visitorIndex,
            onSelect: index => onSelectSetting({ maximumVisitors: visitorSteps[index] }),
        },
        tradesettings: {
            options: TRADE_MODE_TEXTS,
            selection: tradeIndex,
            onSelect: index => onSelectSetting({ tradeMode: TRADE_MODES[index] }),
        },
        ...Object.fromEntries([ ...Array(MAX_TAGS).keys() ].map(index => [ `tag${index + 1}`, {
            caption: settings.tags[index] ? `#${settings.tags[index]}` : '',
            // The field holds the tag with its `#`.
            maxChars: MAX_TAG_LENGTH + 1,
            backgroundColor: isTagError(index) ? ERROR_BACKGROUND : undefined,
            onChange: (text: string) => {
                const tags = [ ...settings.tags ];

                tags[index] = text.replace(/^#/, '');
                onChange({ tags });
            },
            onBlur: onCommit,
        } ])),
        tag_category_container: {
            children: [ ...Array(MAX_TAGS).keys() ].map(index => errorPopup('tags', `tag${index + 1}`, isTagError(index))),
        },
        allow_walk_through_checkbox: { selected: settings.allowWalkThrough, onPointerTap: () => onSelectSetting({ allowWalkThrough: !settings.allowWalkThrough }) },
        remove_link_region: { visible: canDelete, disabled: deleteDisabled, onPointerTap: deleteDisabled ? undefined : onDeleteRoom },
        remove_link: { alpha: deleteDisabled ? DISABLED_ALPHA : 1 },
        remove_icon: { alpha: deleteDisabled ? DISABLED_ALPHA : 1 },

        // Tab 2.
        ...Object.fromEntries(DOOR_MODES.map(({ mode, name }) => [ name, {
            selected: doorMode === Number(mode),
            onPointerTap: () => onSelectSetting({ doorMode: mode }),
        } ])),
        password_container: {
            visible: doorMode === Number(RoomDoorModeEnum.Password),
            children: [ errorPopup('password', 'password'), errorPopup('passwordConfirm', 'password_confirm') ],
        },
        password: { caption: password, maxChars: MAX_PASSWORD_LENGTH, backgroundColor: refusedBackground('password'), onChange: onChangePassword, onBlur: onCommit },
        password_confirm: { caption: passwordConfirm, maxChars: MAX_PASSWORD_LENGTH, backgroundColor: refusedBackground('passwordConfirm'), onChange: onChangePasswordConfirm, onBlur: onCommit },
        doormode_override_info: { visible: settings.hiddenByBc && !isStaff },
        // `onBuildersClubFaqButtonClick`.
        builders_faq_button: { onPointerTap: () => openClientLink(send, 'habbopages/builders-club/faq') },
        guild_access_disclaimer: { visible: isGroupRoom },
        allow_pets_checkbox: { selected: settings.allowPets, onPointerTap: () => onSelectSetting({ allowPets: !settings.allowPets }) },
        allow_foodconsume_checkbox: { selected: settings.allowFoodConsume, onPointerTap: () => onSelectSetting({ allowFoodConsume: !settings.allowFoodConsume }) },
        mute_all_pets_checkbox: { selected: settings.muteAllPets, onPointerTap: () => onSelectSetting({ muteAllPets: !settings.muteAllPets }) },

        // Tab 3.
        filter_users_input: { caption: friendFilter, onChange: onChangeFriendFilter },
        users_with_rights_item_list: {
            items: flatControllerTemplate
                ? shownControllers.map((controller, index) => userRowItem(flatControllerTemplate, {
                        userId: controller.userId,
                        name: controller.userName,
                        index,
                        hasArrow: true,
                        // `onBgMouseClick`: a user with rights loses them.
                        onPress: () => onTakeRights(controller.userId),
                        ...rowHandlers(`rights-${controller.userId}`, controller.userId),
                    }))
                : [],
        },
        friends_item_list: {
            items: friendTemplate
                ? candidates.map((friend, index) => userRowItem(friendTemplate, {
                        userId: friend.playerId,
                        name: friend.name,
                        index,
                        hasArrow: true,
                        // `onBgMouseClick`: a friend is given rights.
                        onPress: () => onGiveRights(friend.playerId),
                        ...rowHandlers(`friend-${friend.playerId}`, friend.playerId),
                    }))
                : [],
        },
        remove_all_flat_ctrls: { onPointerTap: onTakeAllRights },

        // Tab 4.
        tab_container_4: {
            visible: tab === 4,
            children: [ errorPopup('idleSleepTimeout', 'idle_sleep_timeout'), errorPopup('idleAutokickTimeout', 'idle_autokick_timeout') ],
        },
        hide_walls_checkbox: { selected: settings.hideWalls, disabled: !hasClub, alpha: clubAlpha, onPointerTap: () => onSelectSetting({ hideWalls: !settings.hideWalls }) },
        hide_walls_text: { alpha: clubAlpha },
        wall_thickness: {
            selection: thicknessIndex(settings.wallThickness),
            disabled: !hasClub,
            alpha: clubAlpha,
            onSelect: index => onSelectSetting({ wallThickness: index - 2 }),
        },
        floor_thickness: {
            selection: thicknessIndex(settings.floorThickness),
            disabled: !hasClub,
            alpha: clubAlpha,
            onSelect: index => onSelectSetting({ floorThickness: index - 2 }),
        },
        // Flash's switch is worded the other way round: ticked means do NOT leave.
        do_not_leave_on_door_tile_checkbox: {
            selected: !settings.leaveOnDoorTileEnabled,
            disabled: !hasClub,
            alpha: clubAlpha,
            onPointerTap: () => onSelectBehaviour({ leaveOnDoorTileEnabled: !settings.leaveOnDoorTileEnabled }),
        },
        do_not_leave_on_door_tile_text: { alpha: clubAlpha },
        idle_sleep_checkbox: {
            selected: settings.idleSleepEnabled,
            disabled: !hasClub,
            alpha: clubAlpha,
            onPointerTap: () => onSelectBehaviour({ idleSleepEnabled: !settings.idleSleepEnabled }),
        },
        idle_sleep_text: { alpha: clubAlpha },
        idle_sleep_timeout: {
            caption: String(settings.idleSleepTimeoutSeconds),
            restrict: '0-9',
            disabled: !idleSleepActive,
            alpha: idleSleepActive ? 1 : DISABLED_ALPHA,
            onChange: text => onChange({ idleSleepTimeoutSeconds: parseTimeout(text) }),
            onBlur: onCommit,
        },
        idle_sleep_timeout_label: { alpha: idleSleepActive ? 1 : DISABLED_ALPHA },
        idle_autokick_checkbox: {
            selected: settings.idleAutokickEnabled,
            disabled: !hasClub,
            alpha: clubAlpha,
            onPointerTap: () => onSelectBehaviour({ idleAutokickEnabled: !settings.idleAutokickEnabled }),
        },
        idle_autokick_text: { alpha: clubAlpha },
        idle_autokick_timeout: {
            caption: String(settings.idleAutokickTimeoutSeconds),
            restrict: '0-9',
            disabled: !idleAutokickActive,
            alpha: idleAutokickActive ? 1 : DISABLED_ALPHA,
            onChange: text => onChange({ idleAutokickTimeoutSeconds: parseTimeout(text) }),
            onBlur: onCommit,
        },
        idle_autokick_timeout_label: { alpha: idleAutokickActive ? 1 : DISABLED_ALPHA },
        chat_flood_sensitivity: {
            selection: Number(settings.chatFloodSensitivity),
            onSelect: index => onSelectSetting({ chatFloodSensitivity: index }),
        },

        // Tab 5.
        moderation_mute_dropdown: moderationMenu('mute', settings.moderation.whoCanMute, 'whoCanMute'),
        moderation_kick_dropdown: moderationMenu('kick', settings.moderation.whoCanKick, 'whoCanKick'),
        moderation_ban_dropdown: moderationMenu('ban', settings.moderation.whoCanBan, 'whoCanBan'),
        moderation_banned_users: {
            items: bannedUserTemplate
                ? bannedUsers.slice(0, DISPLAY_LIMIT).map((user, index) => userRowItem(bannedUserTemplate, {
                        userId: user.userId,
                        name: user.userName,
                        index,
                        picked: user.userId === selectedBannedUser,
                        hasArrow: false,
                        // `BanListCtrl.onBgMouseClick`: the row is picked out for the unban button.
                        onPress: () => onSelectBannedUser(user.userId),
                        ...rowHandlers(`banned-${user.userId}`, user.userId),
                    }))
                : [],
        },
        moderation_unban_btn: { onPointerTap: onUnban },
    };

    const arrange = ({ root, find }: TemplateWindows) => {
        const window = root();

        // `resizeTabs`.
        if (window) {
            const width = Math.trunc(window.width / visibleTabCount) - 1;

            for (const index of TABS) find(`tab_${index}`)?.setWidth(isTabRemoved(index) ? 0 : width);
        }

        // `prepareWindow`: `remove_icon.x = remove_link.x - 15`.
        const link = find('remove_link');

        if (link) find('remove_icon')?.setX(link.x - 15);
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            arrange={arrange}
            bindings={bindings}
            // `refreshFlatControllers`: the lists' counts, registered for their texts.
            parameters={{
                'navigator.flatctrls.userswithrights': { displayed: String(shownControllers.length), total: String(controllers.length) },
                'navigator.flatctrls.friends': { displayed: String(candidates.length), total: String(friendsWithoutRights.length) },
            }}
        />
    );
};
