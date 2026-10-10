/**
 * The wired menu's settings tab - `WiredMenuSettingsTab` on `settings_container` of
 * `wired_menu_view_xml`: who may modify and who may read the room's wired (two bit masks, owner or
 * staff only), the room's timezone, reloading or rolling back the room, and the account's wired
 * preferences.
 *
 * `updatePermissionsUI`: the three room setting sections are `Util.disableSection`ed for anyone but
 * the owner or staff, and each box shows what a level implies - group rights (2) includes group
 * admins (3), read for everyone (0) includes every level, and a level that may modify may read. An
 * implied box is ticked and disabled, but the mask that is saved only holds what was ticked by hand.
 * `updateButtonsUI`: reload needs write permission, roll back the owner or staff.
 *
 * The section title's caption in the layout is `${wiredmenu.settings.room_settings)` - with a
 * parenthesis where the brace should be - so Flash shows it as it stands, and so does this.
 */
import { changeWiredMenuPreferences, reloadWiredRoom, rollbackWiredRoom, setWiredPermission, setWiredTimezone } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredIsRoomOwnerOrStaff, useWiredStore, WIRED_MODIFY_PERMISSION_LEVELS, WIRED_READ_PERMISSION_LEVELS } from '#base/context/wired';
import { TemplateBindings, TemplateWindow } from '#base/theme';
import { snakeToTitle, WIRED_STYLE_DEFAULT, WIRED_STYLE_OPTIONS } from '#base/wired';

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

    /** A permission box: selected as the masks say, disabled where implied, a click flipping its bit (`onPermissionsChanged`). */
    const permissionBox = (mask: 'modify' | 'read', level: number, box: PermissionBox): TemplateBindings => ({
        [`${mask}_${level}_checkbox`]: {
            selected: box.selected,
            disableSection: box.implied,
            onPointerTap: () => setWiredPermission(send, mask, level, !box.selected),
        },
    });

    const preferenceBox = (name: string, selected: boolean, change: (selected: boolean) => void): TemplateBindings => ({
        [name]: { selected, onPointerTap: () => change(!selected) },
    });

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_menu_view_xml"
            part="settings_container"
            bindings={{
                '': { visible: true },
                modify_settings_container: { disableSection: !isRoomOwnerOrStaff },
                read_settings_container: { disableSection: !isRoomOwnerOrStaff },
                timezone_container: { disableSection: !isRoomOwnerOrStaff },
                ...Object.assign({}, ...WIRED_MODIFY_PERMISSION_LEVELS.map(level => permissionBox('modify', level, modify[level]))) as TemplateBindings,
                ...Object.assign({}, ...WIRED_READ_PERMISSION_LEVELS.map(level => permissionBox('read', level, read[level]))) as TemplateBindings,
                timezone_picker: {
                    options: timezones,
                    selection: 0,
                    disableSection: timezones.length < 2,
                    onSelect: index => setWiredTimezone(send, timezones[index] ?? ''),
                },
                reload_room_btn: { disableSection: !hasWritePermission, onPointerTap: () => reloadWiredRoom(send) },
                roll_back_btn: { disableSection: !isRoomOwnerOrStaff, onPointerTap: () => rollbackWiredRoom(send) },
                ...preferenceBox('preference_toolbar_checkbox', wiredMenuButton, selected => changeWiredMenuPreferences(send, { wiredMenuButton: selected })),
                ...preferenceBox('preference_inspect_button_checkbox', wiredInspectButton, selected => changeWiredMenuPreferences(send, { wiredInspectButton: selected })),
                ...preferenceBox('preference_playtest_checkbox', playTestMode, selected => changeWiredMenuPreferences(send, { playTestMode: selected })),
                ...preferenceBox('preference_all_notifications_checkbox', showAllNotifications, selected => changeWiredMenuPreferences(send, { showAllNotifications: selected })),
                wired_style_border: { visible: uiPickerEnabled },
                wired_style_picker: {
                    options: styleItems,
                    selection: Math.max(0, styleSelection),
                    onSelect: index => changeWiredMenuPreferences(send, { wiredUiStyle: (index <= 0) ? '' : WIRED_STYLE_OPTIONS[index - 1] }),
                },
            }}
        />
    );
};
