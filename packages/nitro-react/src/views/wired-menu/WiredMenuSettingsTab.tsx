/**
 * The wired menu's settings tab - `WiredMenuSettingsTab` on `settings_container`: who may modify
 * and who may read the room's wired (two bit masks, owner or staff only), the room's timezone,
 * reloading or rolling back the room, and the account's wired preferences.
 *
 * The permission checkboxes show what a level implies, the way `updatePermissionsUI` does:
 * group rights (2) includes group admins (3), read for everyone (0) includes every level, and a
 * level that may modify may read. An implied box is ticked and disabled, but the mask that is
 * saved only holds what was ticked by hand.
 *
 * The section title's caption in the layout is `${wiredmenu.settings.room_settings)` - with a
 * parenthesis where the brace should be - so Flash shows it as it stands, and so does this.
 */
import { changeWiredMenuPreferences, reloadWiredRoom, rollbackWiredRoom, setWiredPermission, setWiredTimezone } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredIsRoomOwnerOrStaff, useWiredStore, WIRED_MODIFY_PERMISSION_LEVELS, WIRED_READ_PERMISSION_LEVELS } from '#base/context/wired';
import { Border, Box, Button, ThemeText } from '#base/theme';
import { snakeToTitle, WIRED_STYLE_DEFAULT, WIRED_STYLE_OPTIONS } from '#base/wired';

import { WiredMenuCheckOption } from './WiredMenuCheckOption';
import { WiredMenuDropmenu } from './WiredMenuDropmenu';

/** The broken caption of `room_settings_container`'s title, as the layout has it. */
const ROOM_SETTINGS_TITLE = '${wiredmenu.settings.room_settings)';

interface PermissionBox {
    selected: boolean;
    implied: boolean;
}

/** `updatePermissionsUI` - the boxes as shown, from the two masks. */
const permissionBoxes = (modifyMask: number, readMask: number) => {
    const modify: Record<number, PermissionBox> = {};
    const read: Record<number, PermissionBox> = {};

    for (const level of WIRED_MODIFY_PERMISSION_LEVELS) modify[level] = { selected: (modifyMask & (1 << level)) !== 0, implied: false };
    for (const level of WIRED_READ_PERMISSION_LEVELS) read[level] = { selected: (readMask & (1 << level)) !== 0, implied: false };

    if (modify[2].selected) modify[3] = { selected: true, implied: true };
    if (read[2].selected) read[3] = { selected: true, implied: true };

    if (read[0].selected) {
        for (const level of WIRED_READ_PERMISSION_LEVELS) if (level !== 0) read[level] = { selected: true, implied: true };
    }

    for (const level of WIRED_MODIFY_PERMISSION_LEVELS) if (modify[level].selected) read[level] = { selected: true, implied: true };

    return { modify, read };
};

const SectionTitle = ({ text }: { text: string }) => (
    <ThemeText
        text={text}
        textStyle="u_bold"
        textOptions={{ fill: '#000000' }}
        verticalAlign="top"
        layout={{ position: 'absolute', left: 0, top: 0, height: 19 }}
    />
);

export const WiredMenuSettingsTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const modifyMask = useWiredStore(x => x.settingsModifyMask);
    const readMask = useWiredStore(x => x.settingsReadMask);
    const timezone = useWiredStore(x => x.settingsTimezone);
    const wiredMenuButton = useWiredStore(x => x.wiredMenuButton);
    const wiredInspectButton = useWiredStore(x => x.wiredInspectButton);
    const playTestMode = useWiredStore(x => x.playTestMode);
    const showAllNotifications = useWiredStore(x => x.showAllNotifications);
    const wiredUiStyle = useWiredStore(x => x.wiredUiStyle);
    const isRoomOwnerOrStaff = useWiredIsRoomOwnerOrStaff();
    const hasWritePermission = useWiredHasWritePermission();
    const timezonesConfig = useConfigValue<string>('wired.timezones');
    const uiPickerEnabled = useConfigValue<boolean>('wired.ui_picker_enabled') === true;

    const { modify, read } = permissionBoxes(Math.max(0, modifyMask), Math.max(0, readMask));

    // `updateTimezoneUI`: the room's timezone first, then the hotel's list without it.
    const configured = (!timezonesConfig || !timezonesConfig.length) ? [ 'UTC' ] : timezonesConfig.split(',');
    const timezones = [ ...((timezone !== null) && (timezone !== '') ? [ timezone ] : []), ...configured.filter(zone => zone !== timezone) ];

    // `updateUiStyleUI` / `pickedWiredStyleName`.
    const styleItems = [ t('wiredmenu.settings.preferences.wired_style.default', '', { name: snakeToTitle(WIRED_STYLE_DEFAULT) }), ...WIRED_STYLE_OPTIONS.map(style => snakeToTitle(style)) ];
    const styleSelection = (wiredUiStyle === '') ? 0 : (WIRED_STYLE_OPTIONS.indexOf(wiredUiStyle as typeof WIRED_STYLE_OPTIONS[number]) + 1);

    const permissionOption = (mask: 'modify' | 'read', level: number, box: PermissionBox) => (
        <WiredMenuCheckOption
            key={`${mask}${level}`}
            label={t(`wiredmenu.settings.permission_level.${level}`, `wiredmenu.settings.permission_level.${level}`)}
            selected={box.selected}
            disabled={box.implied}
            rowDisabled={!isRoomOwnerOrStaff}
            size={20}
            onToggle={selected => setWiredPermission(send, mask, level, selected)}
        />
    );

    const preferenceOption = (label: string, selected: boolean, onToggle: (selected: boolean) => void) => (
        <WiredMenuCheckOption
            label={t(label, label)}
            selected={selected}
            size={18}
            width={213}
            onToggle={onToggle}
        />
    );

    return (
        <>
            <Box layout={{ position: 'absolute', left: 14, top: 18, width: 472, height: 220 }}>
                <SectionTitle text={ROOM_SETTINGS_TITLE} />
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 0, top: 20, width: 227, height: 111 }}
                >
                    <Box layout={{ position: 'absolute', left: 10, top: 8, width: 212, height: 102, flexDirection: 'column', gap: -1 }}>
                        <ThemeText
                            text={t('wiredmenu.settings.room_settings.modify_rights', 'wiredmenu.settings.room_settings.modify_rights')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#000000' }}
                            flashFormat={{ bold: true }}
                            alpha={isRoomOwnerOrStaff ? 1 : 0.5}
                            verticalAlign="top"
                            layout={{ height: 20, flexShrink: 0 }}
                        />
                        {WIRED_MODIFY_PERMISSION_LEVELS.map(level => permissionOption('modify', level, modify[level]))}
                    </Box>
                </Border>
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 245, top: 20, width: 227, height: 111 }}
                >
                    <Box layout={{ position: 'absolute', left: 10, top: 8, width: 212, height: 102, flexDirection: 'column', gap: -1 }}>
                        <ThemeText
                            text={t('wiredmenu.settings.room_settings.read_rights', 'wiredmenu.settings.room_settings.read_rights')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#000000' }}
                            flashFormat={{ bold: true }}
                            alpha={isRoomOwnerOrStaff ? 1 : 0.5}
                            verticalAlign="top"
                            layout={{ height: 20, flexShrink: 0 }}
                        />
                        {WIRED_READ_PERMISSION_LEVELS.map(level => permissionOption('read', level, read[level]))}
                    </Box>
                </Border>
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 0, top: 143, width: 227, height: 64 }}
                >
                    <Box layout={{ position: 'absolute', left: 10, top: 8, width: 212, height: 50 }}>
                        <ThemeText
                            text={t('wiredmenu.settings.room_settings.timezone', 'wiredmenu.settings.room_settings.timezone')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#000000' }}
                            flashFormat={{ bold: true }}
                            alpha={isRoomOwnerOrStaff ? 1 : 0.5}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 0, height: 20 }}
                        />
                        <WiredMenuDropmenu
                            items={timezones}
                            selected={0}
                            disabled={(timezones.length < 2) || !isRoomOwnerOrStaff}
                            onSelect={index => setWiredTimezone(send, timezones[index] ?? '')}
                            layout={{ position: 'absolute', left: 0, top: 21, width: 206, height: 25 }}
                        />
                    </Box>
                </Border>
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 245, top: 143, width: 227, height: 64 }}
                >
                    <Box layout={{ position: 'absolute', left: 10, top: 8, width: 212, height: 50 }}>
                        <ThemeText
                            text={t('wiredmenu.settings.room_settings.room_state', 'wiredmenu.settings.room_settings.room_state')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#000000' }}
                            flashFormat={{ bold: true }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 0, height: 20 }}
                        />
                        <Box
                            alpha={hasWritePermission ? 1 : 0.5}
                            layout={{ position: 'absolute', left: 0, top: 21, width: 98, height: 28 }}
                        >
                            <Button
                                variant="3"
                                disabled={!hasWritePermission}
                                onPointerTap={() => reloadWiredRoom(send)}
                                layout={{ width: 98, height: 28 }}
                            >
                                {t('wiredmenu.settings.room_state.reload', 'wiredmenu.settings.room_state.reload')}
                            </Button>
                        </Box>
                        <Box
                            alpha={isRoomOwnerOrStaff ? 1 : 0.5}
                            layout={{ position: 'absolute', left: 109, top: 21, width: 98, height: 28 }}
                        >
                            <Button
                                variant="5"
                                tintColor="#e33934"
                                disabled={!isRoomOwnerOrStaff}
                                onPointerTap={() => rollbackWiredRoom(send)}
                                layout={{ width: 98, height: 28 }}
                            >
                                {t('wiredmenu.settings.room_state.roll_back', 'wiredmenu.settings.room_state.roll_back')}
                            </Button>
                        </Box>
                    </Box>
                </Border>
            </Box>
            <Box layout={{ position: 'absolute', left: 14, top: 237, width: 472, height: 131 }}>
                <SectionTitle text={t('wiredmenu.settings.preferences', 'wiredmenu.settings.preferences')} />
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 0, top: 20, width: 227, height: 111 }}
                >
                    <Box layout={{ position: 'absolute', left: 10, top: 8, width: 213, height: 101, flexDirection: 'column', gap: -1, overflow: 'hidden' }}>
                        <ThemeText
                            text={t('wiredmenu.settings.preferences.general', 'wiredmenu.settings.preferences.general')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#000000' }}
                            flashFormat={{ bold: true }}
                            verticalAlign="top"
                            layout={{ height: 20, flexShrink: 0 }}
                        />
                        {preferenceOption('wiredmenu.settings.preferences.toolbar', wiredMenuButton, selected => changeWiredMenuPreferences(send, { wiredMenuButton: selected }))}
                        {preferenceOption('wiredmenu.settings.preferences.inspect_button', wiredInspectButton, selected => changeWiredMenuPreferences(send, { wiredInspectButton: selected }))}
                        {preferenceOption('wiredmenu.settings.preferences.playtest', playTestMode, selected => changeWiredMenuPreferences(send, { playTestMode: selected }))}
                        {preferenceOption('wiredmenu.settings.preferences.show_all_errors', showAllNotifications, selected => changeWiredMenuPreferences(send, { showAllNotifications: selected }))}
                    </Box>
                </Border>
                {uiPickerEnabled && (
                    <Border
                        variant="3"
                        tintColor="#dadada"
                        layout={{ position: 'absolute', left: 245, top: 20, width: 227, height: 64 }}
                    >
                        <Box layout={{ position: 'absolute', left: 10, top: 8, width: 212, height: 50 }}>
                            <ThemeText
                                text={t('wiredmenu.settings.preferences.wired_style', 'wiredmenu.settings.preferences.wired_style')}
                                textStyle="u_regular"
                                textOptions={{ fill: '#000000' }}
                                flashFormat={{ bold: true }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 20 }}
                            />
                            <WiredMenuDropmenu
                                items={styleItems}
                                selected={Math.max(0, styleSelection)}
                                onSelect={index => changeWiredMenuPreferences(send, { wiredUiStyle: (index <= 0) ? '' : WIRED_STYLE_OPTIONS[index - 1] })}
                                layout={{ position: 'absolute', left: 0, top: 21, width: 206, height: 25 }}
                            />
                        </Box>
                    </Border>
                )}
            </Box>
        </>
    );
};
