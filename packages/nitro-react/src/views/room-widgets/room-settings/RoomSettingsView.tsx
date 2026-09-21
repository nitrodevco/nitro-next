import { RoomChatFloodSensitivityType, RoomDoorModeEnum, RoomModerationType, RoomThicknessType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { IFlatCategory, IFlatController, IMessengerFriend, RoomSettingsDataEventMessageType } from '@nitrodevco/nitro-packets';
import { ReactNode } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Button, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeText } from '#base/theme';

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
    /** A localization key for whatever the server refused, or nothing. */
    error: string | undefined;
    saving: boolean;
    onChangeTab: (tab: number) => void;
    onChange: (changes: Partial<RoomSettingsDataEventMessageType>) => void;
    onChangePassword: (password: string) => void;
    onChangePasswordConfirm: (password: string) => void;
    onChangeFriendFilter: (filter: string) => void;
    onGiveRights: (userId: number) => void;
    onTakeRights: (userId: number) => void;
    onTakeAllRights: () => void;
    onSelectBannedUser: (userId: number) => void;
    onUnban: () => void;
    onDeleteRoom: () => void;
    onSave: () => void;
    onClose: () => void;
}

/** `navigator.roomsettings.tab.N` - the five tabs, in the order the layout lays them out. */
const TABS = [ 1, 2, 3, 4, 5 ];

const TAB_BASIC = 1;
const TAB_ACCESS = 2;
const TAB_RIGHTS = 3;
const TAB_CLUB_AND_CHAT = 4;
const TAB_MODERATION = 5;

/** `UserListCtrl.DISPLAY_LIMIT`: neither user list ever draws more rows than this. */
const DISPLAY_LIMIT = 200;

/** The door modes, in the order the `doormode` selector stacks their radio buttons. */
const DOOR_MODES: { mode: RoomDoorModeEnum; labelKey: string }[] = [
    { mode: RoomDoorModeEnum.Open, labelKey: 'navigator.roomsettings.doormode.open' },
    { mode: RoomDoorModeEnum.Locked, labelKey: 'navigator.roomsettings.doormode.doorbell' },
    { mode: RoomDoorModeEnum.Invisible, labelKey: 'navigator.roomsettings.doormode.invisible' },
    { mode: RoomDoorModeEnum.Password, labelKey: 'navigator.roomsettings.doormode.password' },
];

const TRADE_MODES: { mode: RoomTradeModeEnum; labelKey: string }[] = [
    { mode: RoomTradeModeEnum.Disabled, labelKey: 'navigator.roomsettings.trade_not_allowed' },
    { mode: RoomTradeModeEnum.RoomOwnerAndRights, labelKey: 'navigator.roomsettings.trade_not_with_Controller' },
    { mode: RoomTradeModeEnum.Everyone, labelKey: 'navigator.roomsettings.trade_allowed' },
];

/**
 * `RoomSettingsCtrl.localizeItems`: every moderation level the client can name. Value 3 is not one
 * of them - no Flash key exists for it - so a room that comes back with it falls to the first
 * option, exactly as `normalizeSelection` does.
 */
const MODERATION_LABELS: Partial<Record<RoomModerationType, string>> = {
    [RoomModerationType.None]: 'navigator.roomsettings.moderation.none',
    [RoomModerationType.Rights]: 'navigator.roomsettings.moderation.rights',
    [RoomModerationType.All]: 'navigator.roomsettings.moderation.all',
    [RoomModerationType.GroupRights]: 'navigator.roomsettings.moderation.group_admins',
    [RoomModerationType.RightsOrGroup]: 'navigator.roomsettings.moderation.group_admins_and_rights',
};

/** `populateRoomModerationSettings`: which levels each power offers, and what a group room adds. */
const moderationLevels = (power: 'mute' | 'kick' | 'ban', isGroupRoom: boolean): RoomModerationType[] => {
    const base = (power === 'kick')
        ? [ RoomModerationType.None, RoomModerationType.Rights, RoomModerationType.All ]
        : [ RoomModerationType.None, RoomModerationType.Rights ];

    return isGroupRoom ? [ ...base, RoomModerationType.GroupRights, RoomModerationType.RightsOrGroup ] : base;
};

/**
 * The `wall_thickness` / `floor_thickness` dropmenus' items, in order: each surface has its own
 * texts (`navigator.roomsettings.wall_thickness.thin`, `...floor_thickness.thin`) and no heading.
 */
const THICKNESSES: { thickness: RoomThicknessType; suffix: string }[] = [
    { thickness: RoomThicknessType.Thinnest, suffix: 'thinnest' },
    { thickness: RoomThicknessType.Thin, suffix: 'thin' },
    { thickness: RoomThicknessType.Normal, suffix: 'normal' },
    { thickness: RoomThicknessType.Thick, suffix: 'thick' },
];

const FLOOD_SENSITIVITIES: { sensitivity: RoomChatFloodSensitivityType; labelKey: string }[] = [
    { sensitivity: RoomChatFloodSensitivityType.Extra, labelKey: 'navigator.roomsettings.chat.flood.strict' },
    { sensitivity: RoomChatFloodSensitivityType.Normal, labelKey: 'navigator.roomsettings.chat.flood.normal' },
    { sensitivity: RoomChatFloodSensitivityType.Minimal, labelKey: 'navigator.roomsettings.chat.flood.loose' },
];

const MAX_NAME_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_TAG_LENGTH = 30;
const MAX_TIMEOUT_LENGTH = 5;
const MAX_TAGS = 2;

/**
 * `FlatCategory.visibleName`: a category with a global key is named by
 * `${navigator.flatcategory.global.<key>}`; one without it carries the name the server sent, which
 * is not a key and is shown as it stands.
 */
const categoryName = (category: IFlatCategory, t: (key: string) => string) => (category.globalCategoryKey
    ? t(`navigator.flatcategory.global.${category.globalCategoryKey}`)
    : category.nodeName);

/** One labelled switch, the shape every checkbox row on these tabs takes. */
const SettingCheckBox = ({ label, checked, disabled, onToggle }: { label: string; checked: boolean; disabled?: boolean; onToggle: () => void }) => (
    <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 18 }}>
        <CheckBox
            variant="0"
            selected={checked}
            disabled={disabled}
            onPointerTap={disabled ? undefined : onToggle}
            layout={{ width: 18, height: 18 }}
        />
        <ThemeText
            text={label}
            textOptions={{ fill: '#000000' }}
            alpha={disabled ? 0.5 : 1}
        />
    </Box>
);

/**
 * One row of radio buttons for a small enumeration. Every setting on these tabs is numeric - an
 * enum or a visitor count - so this takes numbers rather than a generic: a generic arrow in a
 * `.tsx` file reads as JSX to the dev transform.
 */
const SettingRadioGroup = ({ options, value, onSelect }: {
    options: { value: number; label: string }[];
    value: number;
    onSelect: (value: number) => void;
}) => (
    <Box layout={{ flexDirection: 'column', gap: 2 }}>
        {options.map(option => (
            <Box
                key={option.value}
                layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 18 }}
            >
                <RadioButton
                    variant="0"
                    selected={option.value === value}
                    onPointerTap={() => onSelect(option.value)}
                    layout={{ width: 18, height: 18 }}
                />
                <ThemeText
                    text={option.label}
                    textOptions={{ fill: '#000000' }}
                />
            </Box>
        ))}
    </Box>
);

/** One of the window's drop menus, over a numeric setting. */
const SettingDropmenu = ({ options, value, disabled, onSelect }: {
    options: { value: number; label: string }[];
    value: number;
    disabled?: boolean;
    onSelect: (value: number) => void;
}) => (
    <Dropmenu
        variant="3"
        disabled={disabled}
        caption={options.find(option => option.value === value)?.label ?? ''}
        options={options.map(option => ({ key: option.value, label: option.label, selected: option.value === value, onSelect: () => onSelect(option.value) }))}
        layout={{ width: '100%', height: 23 }}
    />
);

/**
 * One `ros_banned_user` row: clicking it picks it out (`BanListCtrl.onBgMouseClick`), and the one
 * `moderation_unban_btn` under the list acts on whichever row is picked.
 */
const BannedUserRow = ({ name, selected, onSelect }: { name: string; selected: boolean; onSelect: () => void }) => (
    <Region
        cursor="pointer"
        backgroundColor={selected ? '#c0c0d9' : undefined}
        onPointerTap={onSelect}
        layout={{ flexDirection: 'row', alignItems: 'center', height: 20 }}
    >
        <ThemeText
            text={name}
            textOptions={{ fill: '#000000' }}
            layout={{ marginLeft: 24 }}
        />
    </Region>
);

/**
 * One `ros_flat_controller` / `ros_friend` row: the name alone, and a click anywhere on it moves
 * the user to the other list (`UserListCtrl.onBgMouseClick`). Flash gives the row no button text.
 */
const RightsRow = ({ name, onAction }: { name: string; onAction: () => void }) => (
    <Region
        cursor="pointer"
        onPointerTap={onAction}
        layout={{ flexDirection: 'row', alignItems: 'center', height: 20 }}
    >
        <ThemeText
            text={name}
            textOptions={{ fill: '#000000' }}
            layout={{ marginLeft: 24 }}
        />
    </Region>
);

const SettingHeading = ({ text }: { text: string }) => (
    <ThemeText
        text={text}
        textStyle="u_bold"
        textOptions={{ fill: '#000000' }}
        layout={{ marginTop: 4 }}
    />
);

const SettingLabel = ({ text, disabled }: { text: string; disabled?: boolean }) => (
    <ThemeText
        text={text}
        textOptions={{ fill: '#000000' }}
        alpha={disabled ? 0.5 : 1}
    />
);

/**
 * The room settings, on the `ros_room_settings` layout (five tabs) - `RoomSettingsCtrl`.
 *
 * Every text is the layout's own key and every field sits on the tab the layout puts it on:
 * name, description, category, maximum visitors, trade mode, the two tags and walk-through on
 * tab 1 with the delete link; the door mode, its password pair and the three pet switches on
 * tab 2; rights and friends on tab 3; the club look and the idle behaviour on tab 4; the three
 * moderation powers and the ban list on tab 5. The chat mode, bubble and scroll settings moved
 * to the account in this revision, so only the flood sensitivity is left of the chat settings.
 *
 * Deliberate difference: Flash has no Save button - `onUnfocus` saves the whole form on every
 * change and blur. This window keeps one button and one save, so a half-typed name is never sent;
 * everything the save carries, and every rule that refuses it, is Flash's (`RoomSettingsCtrl.save`).
 */
export const RoomSettingsView = ({
    settings, categories, controllers, bannedUsers, selectedBannedUser, friends, friendFilter,
    password, passwordConfirm, visitorSteps, selectedVisitors, hasClub, isGroupRoom, canDelete, deleteDisabled, isStaff,
    tab, error, saving,
    onChangeTab, onChange, onChangePassword, onChangePasswordConfirm, onChangeFriendFilter,
    onGiveRights, onTakeRights, onTakeAllRights, onSelectBannedUser, onUnban, onDeleteRoom, onSave, onClose,
}: RoomSettingsViewProps) => {
    const t = useTranslation();

    let body: ReactNode = null;

    if (tab === TAB_BASIC) {
        // `setCategorySelection`: the visible non-automatic categories, plus the room's own even when it is hidden.
        const shownCategories = categories.filter(category => (category.visible || (category.nodeId === settings.categoryId)) && !category.automatic);

        body = (
            <>
                <SettingHeading text={t('navigator.roomname')} />
                <TextInput
                    value={settings.name}
                    onChange={name => onChange({ name })}
                    maxLength={MAX_NAME_LENGTH}
                    layout={{ width: '100%', height: 22 }}
                />
                <SettingHeading text={t('navigator.roomsettings.desc')} />
                <TextInput
                    value={settings.description}
                    onChange={description => onChange({ description })}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    multiline
                    layout={{ width: '100%', height: 50 }}
                />
                <SettingHeading text={t('navigator.category')} />
                <SettingDropmenu
                    options={shownCategories.map(category => ({ value: category.nodeId, label: categoryName(category, t) }))}
                    value={settings.categoryId}
                    onSelect={categoryId => onChange({ categoryId })}
                />
                <SettingHeading text={t('navigator.maxvisitors')} />
                <SettingDropmenu
                    options={visitorSteps.map(step => ({ value: step, label: String(step) }))}
                    value={selectedVisitors}
                    onSelect={maximumVisitors => onChange({ maximumVisitors })}
                />
                <SettingHeading text={t('navigator.tradesettings')} />
                <SettingDropmenu
                    options={TRADE_MODES.map(x => ({ value: x.mode, label: t(x.labelKey) }))}
                    value={settings.tradeMode}
                    onSelect={tradeMode => onChange({ tradeMode })}
                />
                <SettingHeading text={t('navigator.tags')} />
                <Box layout={{ flexDirection: 'row', gap: 4 }}>
                    {[ ...Array(MAX_TAGS).keys() ].map(index => (
                        <TextInput
                            key={index}
                            // `setTag` shows a tag with the hash Flash puts on it; `addTag` takes it off again.
                            value={settings.tags[index] ? `#${settings.tags[index]}` : ''}
                            onChange={(tag) => {
                                const tags = [ ...settings.tags ];

                                tags[index] = tag.replace(/^#/, '');
                                onChange({ tags });
                            }}
                            maxLength={MAX_TAG_LENGTH + 1}
                            layout={{ flex: 1, height: 22 }}
                        />
                    ))}
                </Box>
                <SettingCheckBox
                    label={t('navigator.roomsettings.allow_walk_through')}
                    checked={settings.allowWalkThrough}
                    onToggle={() => onChange({ allowWalkThrough: !settings.allowWalkThrough })}
                />
                {canDelete && (
                    <Region
                        cursor={deleteDisabled ? undefined : 'pointer'}
                        onPointerTap={deleteDisabled ? undefined : onDeleteRoom}
                        alpha={deleteDisabled ? 0.5 : 1}
                        layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 20, marginTop: 6 }}
                    >
                        <Icon
                            variant="9"
                            tintColor="#bb2200"
                        />
                        <ThemeText
                            text={t('navigator.roomsettings.delete')}
                            textStyle="u_bold"
                            textOptions={{ fill: '#bb2200' }}
                            flashFormat={{ underline: true }}
                        />
                    </Region>
                )}
            </>
        );
    }

    if (tab === TAB_ACCESS) body = (
        <>
            <SettingHeading text={t('navigator.roomsettings.roomaccess.caption')} />
            <ThemeText
                text={t('navigator.roomsettings.roomaccess.info')}
                textStyle="u_regular"
                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 300 }}
            />
            <SettingHeading text={t('navigator.roomsettings.doormode')} />
            <SettingRadioGroup
                options={DOOR_MODES.map(x => ({ value: x.mode, label: t(x.labelKey) }))}
                value={settings.doorMode}
                onSelect={doorMode => onChange({ doorMode })}
            />
            {/* `changePasswordField`: the pair only exists while the password mode is picked. */}
            {Number(settings.doorMode) === Number(RoomDoorModeEnum.Password) && (
                <>
                    <SettingLabel text={t('navigator.roomsettings.password')} />
                    <TextInput
                        value={password}
                        onChange={onChangePassword}
                        maxLength={MAX_TAG_LENGTH}
                        password
                        layout={{ width: '100%', height: 22 }}
                    />
                    <SettingLabel text={t('navigator.roomsettings.passwordconfirm')} />
                    <TextInput
                        value={passwordConfirm}
                        onChange={onChangePasswordConfirm}
                        maxLength={MAX_TAG_LENGTH}
                        password
                        layout={{ width: '100%', height: 22 }}
                    />
                </>
            )}
            {/* `doormode_override_info`: Builders Club took the room out of the navigator; staff are not told. */}
            {settings.hiddenByBc && !isStaff && (
                <Box layout={{ flexDirection: 'column', gap: 2, marginTop: 6 }}>
                    <SettingHeading text={t('notification.builders_club.room_locked.title')} />
                    <ThemeText
                        text={t('notification.builders_club.room_locked.message')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 300 }}
                    />
                </Box>
            )}
            {isGroupRoom && (
                <ThemeText
                    text={t('navigator.roomsettings.roomaccess.guild.disclaimer')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 300 }}
                    layout={{ marginTop: 6 }}
                />
            )}
            <SettingHeading text={t('navigator.roomsettings.pets')} />
            <SettingCheckBox
                label={t('navigator.roomsettings.allowpets')}
                checked={settings.allowPets}
                onToggle={() => onChange({ allowPets: !settings.allowPets })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.allowfoodconsume')}
                checked={settings.allowFoodConsume}
                onToggle={() => onChange({ allowFoodConsume: !settings.allowFoodConsume })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.mute_all_pets')}
                checked={settings.muteAllPets}
                onToggle={() => onChange({ muteAllPets: !settings.muteAllPets })}
            />
        </>
    );

    if (tab === TAB_RIGHTS) {
        // `filter_users_input` narrows both lists as you type; a friend already holding rights drops out.
        const filter = friendFilter.trim().toLowerCase();
        const matches = (name: string) => (!filter.length || name.toLowerCase().includes(filter));
        const friendsWithoutRights = friends.filter(friend => !controllers.some(controller => controller.userId === friend.playerId));
        const shownControllers = controllers.filter(controller => matches(controller.userName));
        const candidates = friendsWithoutRights.filter(friend => matches(friend.name));

        body = (
            <>
                <TextInput
                    value={friendFilter}
                    onChange={onChangeFriendFilter}
                    placeholder={t('navigator.flatctrls.filter')}
                    layout={{ width: '100%', height: 22 }}
                />
                <SettingHeading text={t('navigator.flatctrls.userswithrights', '', { displayed: String(shownControllers.length), total: String(controllers.length) })} />
                {shownControllers.slice(0, DISPLAY_LIMIT).map(controller => (
                    <RightsRow
                        key={controller.userId}
                        name={controller.userName}
                        onAction={() => onTakeRights(controller.userId)}
                    />
                ))}
                <Button
                    variant="3"
                    onPointerTap={onTakeAllRights}
                    layout={{ width: 200, height: 24, marginTop: 2 }}
                >
                    {t('navigator.flatctrls.clear')}
                </Button>
                <SettingHeading text={t('navigator.flatctrls.friends', '', { displayed: String(candidates.length), total: String(friendsWithoutRights.length) })} />
                {candidates.slice(0, DISPLAY_LIMIT).map(friend => (
                    <RightsRow
                        key={friend.playerId}
                        name={friend.name}
                        onAction={() => onGiveRights(friend.playerId)}
                    />
                ))}
            </>
        );
    }

    if (tab === TAB_CLUB_AND_CHAT) body = (
        <>
            <SettingHeading text={t('navigator.roomsettings.vip.caption')} />
            <ThemeText
                text={t('navigator.roomsettings.vip.info')}
                textStyle="u_regular"
                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 300 }}
            />
            <SettingHeading text={t('navigator.roomsettings.vip_settings')} />
            <SettingCheckBox
                label={t('navigator.roomsettings.hide_walls')}
                checked={settings.hideWalls}
                disabled={!hasClub}
                onToggle={() => onChange({ hideWalls: !settings.hideWalls })}
            />
            <SettingDropmenu
                options={THICKNESSES.map(x => ({ value: x.thickness, label: t(`navigator.roomsettings.wall_thickness.${x.suffix}`) }))}
                value={settings.wallThickness}
                disabled={!hasClub}
                onSelect={wallThickness => onChange({ wallThickness })}
            />
            <SettingDropmenu
                options={THICKNESSES.map(x => ({ value: x.thickness, label: t(`navigator.roomsettings.floor_thickness.${x.suffix}`) }))}
                value={settings.floorThickness}
                disabled={!hasClub}
                onSelect={floorThickness => onChange({ floorThickness })}
            />
            <SettingHeading text={t('navigator.roomsettings.room_behavior')} />
            {/* Flash's switch is worded the other way round: ticked means do NOT leave. */}
            <SettingCheckBox
                label={t('navigator.roomsettings.do_not_leave_on_door_tile')}
                checked={!settings.leaveOnDoorTileEnabled}
                disabled={!hasClub}
                onToggle={() => onChange({ leaveOnDoorTileEnabled: !settings.leaveOnDoorTileEnabled })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.idle_sleep')}
                checked={settings.idleSleepEnabled}
                disabled={!hasClub}
                onToggle={() => onChange({ idleSleepEnabled: !settings.idleSleepEnabled })}
            />
            {/* `refreshTimeoutFieldState`: the seconds only accept input while the switch above them is on. */}
            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 22 }}>
                <TextInput
                    value={String(settings.idleSleepTimeoutSeconds)}
                    onChange={text => onChange({ idleSleepTimeoutSeconds: Number(text.replace(/\D/g, '').slice(0, MAX_TIMEOUT_LENGTH)) || 0 })}
                    maxLength={MAX_TIMEOUT_LENGTH}
                    layout={{ width: 50, height: 22 }}
                />
                <SettingLabel
                    text={t('navigator.roomsettings.timeout.seconds')}
                    disabled={!hasClub || !settings.idleSleepEnabled}
                />
            </Box>
            <SettingCheckBox
                label={t('navigator.roomsettings.idle_autokick')}
                checked={settings.idleAutokickEnabled}
                disabled={!hasClub}
                onToggle={() => onChange({ idleAutokickEnabled: !settings.idleAutokickEnabled })}
            />
            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 22 }}>
                <TextInput
                    value={String(settings.idleAutokickTimeoutSeconds)}
                    onChange={text => onChange({ idleAutokickTimeoutSeconds: Number(text.replace(/\D/g, '').slice(0, MAX_TIMEOUT_LENGTH)) || 0 })}
                    maxLength={MAX_TIMEOUT_LENGTH}
                    layout={{ width: 50, height: 22 }}
                />
                <SettingLabel
                    text={t('navigator.roomsettings.timeout.seconds')}
                    disabled={!hasClub || !settings.idleAutokickEnabled}
                />
            </Box>
            <SettingHeading text={t('navigator.roomsettings.chat.flood_sensitivity')} />
            <SettingDropmenu
                options={FLOOD_SENSITIVITIES.map(x => ({ value: x.sensitivity, label: t(x.labelKey) }))}
                value={settings.chatFloodSensitivity}
                onSelect={chatFloodSensitivity => onChange({ chatFloodSensitivity })}
            />
        </>
    );

    if (tab === TAB_MODERATION) {
        const levels = (power: 'mute' | 'kick' | 'ban') => moderationLevels(power, isGroupRoom)
            .map(level => ({ value: level, label: t(MODERATION_LABELS[level] ?? '') }));
        // `normalizeSelection`: a level this room cannot offer reads as the first one.
        const normalize = (power: 'mute' | 'kick' | 'ban', value: RoomModerationType) => (moderationLevels(power, isGroupRoom).includes(Number(value))
            ? value
            : RoomModerationType.None);

        body = (
            <>
                <ThemeText
                    text={t('navigator.roomsettings.moderation.header')}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 300 }}
                />
                <SettingHeading text={t('navigator.roomsettings.moderation.mute.header')} />
                <SettingDropmenu
                    options={levels('mute')}
                    value={normalize('mute', settings.moderation.whoCanMute)}
                    onSelect={whoCanMute => onChange({ moderation: { ...settings.moderation, whoCanMute } })}
                />
                <SettingHeading text={t('navigator.roomsettings.moderation.kick.header')} />
                <SettingDropmenu
                    options={levels('kick')}
                    value={normalize('kick', settings.moderation.whoCanKick)}
                    onSelect={whoCanKick => onChange({ moderation: { ...settings.moderation, whoCanKick } })}
                />
                <SettingHeading text={t('navigator.roomsettings.moderation.ban.header')} />
                <SettingDropmenu
                    options={levels('ban')}
                    value={normalize('ban', settings.moderation.whoCanBan)}
                    onSelect={whoCanBan => onChange({ moderation: { ...settings.moderation, whoCanBan } })}
                />
                <SettingHeading text={t('navigator.roomsettings.moderation.banned.users')} />
                {bannedUsers.slice(0, DISPLAY_LIMIT).map(user => (
                    <BannedUserRow
                        key={user.userId}
                        name={user.userName}
                        selected={user.userId === selectedBannedUser}
                        onSelect={() => onSelectBannedUser(user.userId)}
                    />
                ))}
                <Button
                    variant="3"
                    onPointerTap={onUnban}
                    layout={{ width: 200, height: 24, marginTop: 2 }}
                >
                    {t('navigator.roomsettings.moderation.unban')}
                </Button>
            </>
        );
    }

    return (
        <Frame
            variant="3"
            id="room-settings"
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 140, y: 50 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 420, height: 460 }}
        >
            <TabContext
                variant="3"
                name="tab_context"
                layout={{ width: '100%', height: 30 }}
            >
                {TABS.map(index => (
                    <TabButton
                        key={index}
                        selected={tab === index}
                        onPointerTap={() => onChangeTab(index)}
                        layout={{ width: '100%' }}
                    >
                        {t(`navigator.roomsettings.tab.${index}`)}
                    </TabButton>
                ))}
            </TabContext>
            <ScrollArea
                orientation="vertical"
                layout={{ width: '100%', flex: 1 }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 4, padding: 6 }}
            >
                {body}
            </ScrollArea>
            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3, paddingLeft: 6, paddingRight: 6 }}>
                {!!error && (
                    <ThemeText
                        text={t(error)}
                        textOptions={{ fill: '#cc0000', wordWrap: true, wordWrapWidth: 260 }}
                        layout={{ flex: 1 }}
                    />
                )}
                <Region layout={{ flex: 1 }} />
                <Button
                    variant="3"
                    disabled={saving}
                    onPointerTap={onSave}
                    layout={{ width: 120, height: 26 }}
                >
                    {t('navigator.roomsettings.save')}
                </Button>
            </Box>
        </Frame>
    );
};
