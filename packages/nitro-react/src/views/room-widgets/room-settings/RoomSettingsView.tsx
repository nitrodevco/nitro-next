import { RoomChatFloodSensitivityType, RoomDoorModeEnum, RoomModerationType, RoomThicknessType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { IFlatController, IMessengerFriend, RoomSettingsDataEventMessageType } from '@nitrodevco/nitro-packets';
import { ReactNode } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Button, CheckBox, Frame, RadioButton, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeText } from '#base/theme';

export interface RoomSettingsViewProps {
    settings: RoomSettingsDataEventMessageType;
    /** Who holds rights in the room. */
    controllers: IFlatController[];
    /** Who is banned from it. */
    bannedUsers: IFlatController[];
    /** Your friends, so rights can be handed to one without typing a name. */
    friends: IMessengerFriend[];
    /** What has been typed into the friend search on the rights tab. */
    friendFilter: string;
    /** Only read for a password door: the server never sends the current one back. */
    password: string;
    /** Which of the five tabs is open. */
    tab: number;
    /** A localization key for whatever the server refused, or nothing. */
    error: string | undefined;
    saving: boolean;
    onChangeTab: (tab: number) => void;
    onChange: (changes: Partial<RoomSettingsDataEventMessageType>) => void;
    onChangePassword: (password: string) => void;
    onChangeFriendFilter: (filter: string) => void;
    onGiveRights: (userId: number) => void;
    onTakeRights: (userId: number) => void;
    onTakeAllRights: () => void;
    onUnban: (userId: number) => void;
    onSave: () => void;
    onClose: () => void;
}

/** `navigator.roomsettings.tab.N` - the five tabs, in the order the layout lays them out. */
const TABS = [ 1, 2, 3, 4, 5 ];

const TAB_BASIC = 1;
const TAB_ACCESS = 2;
const TAB_RIGHTS = 3;
const TAB_BEHAVIOUR = 4;
const TAB_MODERATION = 5;

/** The door modes, in the order the layout stacks their radio buttons. */
const DOOR_MODES: { mode: RoomDoorModeEnum; labelKey: string }[] = [
    { mode: RoomDoorModeEnum.Open, labelKey: 'navigator.roomsettings.doormode.open' },
    { mode: RoomDoorModeEnum.Locked, labelKey: 'navigator.roomsettings.doormode.doorbell' },
    { mode: RoomDoorModeEnum.Password, labelKey: 'navigator.roomsettings.doormode.password' },
    { mode: RoomDoorModeEnum.Invisible, labelKey: 'navigator.roomsettings.doormode.invisible' },
];

const TRADE_MODES: { mode: RoomTradeModeEnum; labelKey: string }[] = [
    { mode: RoomTradeModeEnum.Disabled, labelKey: 'navigator.roomsettings.trade_not_allowed' },
    { mode: RoomTradeModeEnum.RoomOwnerAndRights, labelKey: 'navigator.roomsettings.trade_not_with_Controller' },
    { mode: RoomTradeModeEnum.Everyone, labelKey: 'navigator.roomsettings.trade_allowed' },
];

/** `moderation_*_none` / `_rights` / `_all` - who a moderation power is given to. */
const MODERATION_LEVELS: { level: RoomModerationType; labelKey: string }[] = [
    { level: RoomModerationType.None, labelKey: 'navigator.roomsettings.moderation.none' },
    { level: RoomModerationType.Rights, labelKey: 'navigator.roomsettings.moderation.rights' },
    { level: RoomModerationType.All, labelKey: 'navigator.roomsettings.moderation.all' },
];

const THICKNESSES: { thickness: RoomThicknessType; labelKey: string }[] = [
    { thickness: RoomThicknessType.Thinnest, labelKey: 'navigator.roomsettings.thickness.thinnest' },
    { thickness: RoomThicknessType.Thin, labelKey: 'navigator.roomsettings.thickness.thin' },
    { thickness: RoomThicknessType.Normal, labelKey: 'navigator.roomsettings.thickness.normal' },
    { thickness: RoomThicknessType.Thick, labelKey: 'navigator.roomsettings.thickness.thick' },
];

const FLOOD_SENSITIVITIES: { sensitivity: RoomChatFloodSensitivityType; labelKey: string }[] = [
    { sensitivity: RoomChatFloodSensitivityType.Extra, labelKey: 'navigator.roomsettings.chat.flood.strict' },
    { sensitivity: RoomChatFloodSensitivityType.Normal, labelKey: 'navigator.roomsettings.chat.flood.normal' },
    { sensitivity: RoomChatFloodSensitivityType.Minimal, labelKey: 'navigator.roomsettings.chat.flood.loose' },
];

/** `maxvisitors` - the steps the visitor cap may be set to, capped by what the room allows. */
const VISITOR_STEPS = [ 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100 ];

const MAX_NAME_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_TAGS = 2;

/** One labelled switch, the shape every checkbox row on these tabs takes. */
const SettingCheckBox = ({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) => (
    <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 18 }}>
        <CheckBox
            variant="0"
            selected={checked}
            onPointerTap={onToggle}
            layout={{ width: 18, height: 18 }}
        />
        <ThemeText
            text={label}
            textOptions={{ fill: '#000000' }}
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

/** One name with a single action beside it - the shape of every rights and ban row. */
const UserRow = ({ name, actionLabel, onAction }: { name: string; actionLabel: string; onAction: () => void }) => (
    <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 24 }}>
        <ThemeText
            text={name}
            textOptions={{ fill: '#000000' }}
            layout={{ flex: 1 }}
        />
        <Button
            variant="3"
            onPointerTap={onAction}
            layout={{ width: 96, height: 22 }}
        >
            {actionLabel}
        </Button>
    </Box>
);

const SettingHeading = ({ text }: { text: string }) => (
    <ThemeText
        text={text}
        textStyle="text-style-u-bold"
        textOptions={{ fill: '#000000' }}
        layout={{ marginTop: 4 }}
    />
);

/**
 * The room settings, on the `ros_room_settings` layout (five tabs). Everything here is what the
 * server sends in `RoomSettingsDataEventMessage` and takes back in `SaveRoomSettingsComposer` -
 * the chat mode, bubble and scroll settings moved to the account in this revision, so they are
 * not on the chat tab any more.
 *
 * The rights and banned-user lists on tabs three and five need their own round trips and are not
 * filled in yet; the rest of both tabs is.
 */
export const RoomSettingsView = ({
    settings, controllers, bannedUsers, friends, friendFilter, password, tab, error, saving,
    onChangeTab, onChange, onChangePassword, onChangeFriendFilter,
    onGiveRights, onTakeRights, onTakeAllRights, onUnban, onSave, onClose,
}: RoomSettingsViewProps) => {
    const t = useTranslation();

    const visitorSteps = VISITOR_STEPS.filter(step => step <= settings.maximumVisitorsLimit);

    let body: ReactNode = null;

    if (tab === TAB_BASIC) body = (
        <>
            <ThemeText
                text={t('navigator.roomsettings.name')}
                textOptions={{ fill: '#000000' }}
            />
            <TextInput
                value={settings.name}
                onChange={name => onChange({ name })}
                maxLength={MAX_NAME_LENGTH}
                layout={{ width: '100%', height: 22 }}
            />
            <ThemeText
                text={t('navigator.roomsettings.desc')}
                textOptions={{ fill: '#000000' }}
            />
            <TextInput
                value={settings.description}
                onChange={description => onChange({ description })}
                maxLength={MAX_DESCRIPTION_LENGTH}
                multiline
                layout={{ width: '100%', height: 50 }}
            />
            <ThemeText
                text={t('navigator.roomsettings.tags')}
                textOptions={{ fill: '#000000' }}
            />
            <Box layout={{ flexDirection: 'row', gap: 4 }}>
                {[ ...Array(MAX_TAGS).keys() ].map(index => (
                    <TextInput
                        key={index}
                        value={settings.tags[index] ?? ''}
                        onChange={(tag) => {
                            const tags = [ ...settings.tags ];

                            tags[index] = tag;
                            onChange({ tags });
                        }}
                        layout={{ flex: 1, height: 22 }}
                    />
                ))}
            </Box>
            <SettingHeading text={t('navigator.maxvisitors')} />
            <SettingRadioGroup
                options={visitorSteps.map(step => ({ value: step, label: String(step) }))}
                value={settings.maximumVisitors}
                onSelect={maximumVisitors => onChange({ maximumVisitors })}
            />
            <SettingHeading text={t('navigator.tradesettings')} />
            <SettingRadioGroup
                options={TRADE_MODES.map(x => ({ value: x.mode, label: t(x.labelKey) }))}
                value={settings.tradeMode}
                onSelect={tradeMode => onChange({ tradeMode })}
            />
        </>
    );

    if (tab === TAB_ACCESS) body = (
        <>
            <SettingHeading text={t('navigator.roomsettings.doormode')} />
            <SettingRadioGroup
                options={DOOR_MODES.map(x => ({ value: x.mode, label: t(x.labelKey) }))}
                value={settings.doorMode}
                onSelect={doorMode => onChange({ doorMode })}
            />
            {Number(settings.doorMode) === Number(RoomDoorModeEnum.Password) && (
                <>
                    <ThemeText
                        text={t('navigator.password')}
                        textOptions={{ fill: '#000000' }}
                    />
                    <TextInput
                        value={password}
                        onChange={onChangePassword}
                        password
                        layout={{ width: '100%', height: 22 }}
                    />
                </>
            )}
        </>
    );

    if (tab === TAB_RIGHTS) {
        // `friends_cont` filters the list as you type; a friend already holding rights drops out.
        const filter = friendFilter.trim().toLowerCase();
        const candidates = friends.filter(friend =>
            !controllers.some(controller => controller.userId === friend.playerId)
            && (!filter.length || friend.name.toLowerCase().includes(filter)));

        body = (
            <>
                <SettingHeading text={t('navigator.flatctrls.userswithrights', 'Users with rights')} />
                {controllers.length
                    ? controllers.map(controller => (
                            <UserRow
                                key={controller.userId}
                                name={controller.userName}
                                actionLabel={t('navigator.flatctrls.remove', 'Remove')}
                                onAction={() => onTakeRights(controller.userId)}
                            />
                        ))
                    : (
                            <ThemeText
                                text={t('navigator.flatctrls.none', 'Nobody has rights here.')}
                                textOptions={{ fill: '#777777' }}
                            />
                        )}
                {controllers.length > 1 && (
                    <Button
                        variant="3"
                        name="remove_all_flat_ctrls"
                        onPointerTap={onTakeAllRights}
                        layout={{ width: 200, height: 24, marginTop: 2 }}
                    >
                        {t('navigator.flatctrls.clear')}
                    </Button>
                )}
                <SettingHeading text={t('navigator.flatctrls.friends', 'Friends')} />
                <TextInput
                    value={friendFilter}
                    onChange={onChangeFriendFilter}
                    placeholder={t('generic.search')}
                    layout={{ width: '100%', height: 22 }}
                />
                {candidates.map(friend => (
                    <UserRow
                        key={friend.playerId}
                        name={friend.name}
                        actionLabel={t('navigator.flatctrls.add', 'Give rights')}
                        onAction={() => onGiveRights(friend.playerId)}
                    />
                ))}
            </>
        );
    }

    if (tab === TAB_BEHAVIOUR) body = (
        <>
            <SettingHeading text={t('navigator.roomsettings.chat_settings')} />
            <SettingRadioGroup
                options={FLOOD_SENSITIVITIES.map(x => ({ value: x.sensitivity, label: t(x.labelKey) }))}
                value={settings.chatFloodSensitivity}
                onSelect={chatFloodSensitivity => onChange({ chatFloodSensitivity })}
            />
            <SettingHeading text={t('navigator.roomsettings.roombehavior', 'Room behaviour')} />
            <SettingCheckBox
                label={t('navigator.roomsettings.allow_pets')}
                checked={settings.allowPets}
                onToggle={() => onChange({ allowPets: !settings.allowPets })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.allowfoodconsume')}
                checked={settings.allowFoodConsume}
                onToggle={() => onChange({ allowFoodConsume: !settings.allowFoodConsume })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.allow_walk_through')}
                checked={settings.allowWalkThrough}
                onToggle={() => onChange({ allowWalkThrough: !settings.allowWalkThrough })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.hide_walls')}
                checked={settings.hideWalls}
                onToggle={() => onChange({ hideWalls: !settings.hideWalls })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.mute_all_pets')}
                checked={settings.muteAllPets}
                onToggle={() => onChange({ muteAllPets: !settings.muteAllPets })}
            />
            {/* Flash's switch is worded the other way round: ticked means do NOT leave. */}
            <SettingCheckBox
                label={t('navigator.roomsettings.donotleaveondoortile', 'Do not leave on the door tile')}
                checked={!settings.leaveOnDoorTileEnabled}
                onToggle={() => onChange({ leaveOnDoorTileEnabled: !settings.leaveOnDoorTileEnabled })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.idlesleep', 'Let visitors fall asleep')}
                checked={settings.idleSleepEnabled}
                onToggle={() => onChange({ idleSleepEnabled: !settings.idleSleepEnabled })}
            />
            <SettingCheckBox
                label={t('navigator.roomsettings.idleautokick', 'Kick idle visitors')}
                checked={settings.idleAutokickEnabled}
                onToggle={() => onChange({ idleAutokickEnabled: !settings.idleAutokickEnabled })}
            />
            <SettingHeading text={t('navigator.roomsettings.wall_thickness')} />
            <SettingRadioGroup
                options={THICKNESSES.map(x => ({ value: x.thickness, label: t(x.labelKey) }))}
                value={settings.wallThickness}
                onSelect={wallThickness => onChange({ wallThickness })}
            />
            <SettingHeading text={t('navigator.roomsettings.floor_thickness')} />
            <SettingRadioGroup
                options={THICKNESSES.map(x => ({ value: x.thickness, label: t(x.labelKey) }))}
                value={settings.floorThickness}
                onSelect={floorThickness => onChange({ floorThickness })}
            />
        </>
    );

    if (tab === TAB_MODERATION) body = (
        <>
            <SettingHeading text={t('navigator.roomsettings.moderation.mute')} />
            <SettingRadioGroup
                options={MODERATION_LEVELS.map(x => ({ value: x.level, label: t(x.labelKey) }))}
                value={settings.moderation.whoCanMute}
                onSelect={whoCanMute => onChange({ moderation: { ...settings.moderation, whoCanMute } })}
            />
            <SettingHeading text={t('navigator.roomsettings.moderation.kick')} />
            <SettingRadioGroup
                options={MODERATION_LEVELS.map(x => ({ value: x.level, label: t(x.labelKey) }))}
                value={settings.moderation.whoCanKick}
                onSelect={whoCanKick => onChange({ moderation: { ...settings.moderation, whoCanKick } })}
            />
            <SettingHeading text={t('navigator.roomsettings.moderation.ban')} />
            <SettingRadioGroup
                options={MODERATION_LEVELS.map(x => ({ value: x.level, label: t(x.labelKey) }))}
                value={settings.moderation.whoCanBan}
                onSelect={whoCanBan => onChange({ moderation: { ...settings.moderation, whoCanBan } })}
            />
            <SettingHeading text={t('navigator.roomsettings.moderation.bannedusers')} />
            {bannedUsers.length
                ? bannedUsers.map(user => (
                        <UserRow
                            key={user.userId}
                            name={user.userName}
                            actionLabel={t('navigator.roomsettings.moderation.unban')}
                            onAction={() => onUnban(user.userId)}
                        />
                    ))
                : (
                        <ThemeText
                            text={t('navigator.roomsettings.moderation.nobannedusers', 'Nobody is banned from this room.')}
                            textOptions={{ fill: '#777777' }}
                        />
                    )}
        </>
    );

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
