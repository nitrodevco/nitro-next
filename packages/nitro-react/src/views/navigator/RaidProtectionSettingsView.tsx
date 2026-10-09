/**
 * The raid protection window - `RaidProtectionSettingsView` over `habbo-navigator-com/raid_protection_settings_xml`
 * (`getXmlWindow("raid_protection_settings")`, `center()`ed when it is built).
 *
 * `update` puts the controls back to the settings it is given: the two checkboxes, the five drop
 * menus (their entries `populate`d in `ensureWindow`) and the incident line - `incident_active_text`
 * while a raid is on, otherwise `incident_inactive_text`, which names the last raid when there was
 * one (`status.inactive.last` with the time `toLocaleString()`). `refreshState` greys what does not
 * apply (`WindowUtils.disableSection`): the protection controls while protection is off, the ban
 * length while the action is a kick, the guard's controls while the guard is off, and the save
 * button while a save or its confirmation is out. Save collects the controls (`collectDraft`) and
 * hands them to the controller; cancel and the frame's close close it.
 */
import { closeRaidProtection, RAID_PROTECTION_ACTION_KICK, RAID_PROTECTION_ACTION_VALUES, RAID_PROTECTION_BAN_DURATION_VALUES, RAID_PROTECTION_GUARD_DURATION_VALUES, RAID_PROTECTION_SENSITIVITY_VALUES, requestRaidProtectionSave } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { RaidProtectionDraft, raidProtectionStore, useRaidProtectionStore } from '#base/context/raid-protection';
import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-navigator-com/raid_protection_settings_xml';

/** `disableSection`'s blend for what it greys. */
const DISABLED_ALPHA = 0.5;

const SENSITIVITY_TEXTS = [ '${raid.protection.settings.sensitivity.low}', '${raid.protection.settings.sensitivity.medium}', '${raid.protection.settings.sensitivity.high}' ];
const ACTION_TEXTS = [ '${raid.protection.settings.action.kick}', '${raid.protection.settings.action.temporary_ban}' ];

/** `durationLabels`. */
const durationTexts = (values: number[]) => values.map(seconds => `\${raid.protection.settings.duration.${seconds}}`);

/** A label and a drop menu greyed together (`disableSection` on their container). */
const section = (disabled: boolean) => ({ disabled, alpha: disabled ? DISABLED_ALPHA : 1 });

export const RaidProtectionSettingsView = () => {
    const view = useRaidProtectionStore(x => x.view);
    const saveOutstanding = useRaidProtectionStore(x => x.saveOutstanding);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'raid_protection_settings', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: closeRaidProtection });

    if (!view) return null;

    const { settings, draft } = view;
    const change = (changes: Partial<RaidProtectionDraft>) => raidProtectionStore.getState().setDraft(changes);
    // `refreshState`.
    const protectionOff = !draft.enabled;
    const banOff = protectionOff || (draft.actionType === RAID_PROTECTION_ACTION_KICK);
    const guardOff = protectionOff || !draft.guardEnabled;

    /** A drop menu over one of the value lists: the entry of the draft's value, and the value of the entry picked. */
    const dropmenu = (options: string[], values: number[], value: number, disabled: boolean, onValue: (value: number) => void) => ({
        options,
        selection: values.indexOf(value),
        onSelect: (index: number) => onValue(values[index]),
        ...section(disabled),
    });

    const bindings: TemplateBindings = {
        enabled_checkbox: { selected: draft.enabled, onPointerTap: () => change({ enabled: !draft.enabled }) },
        detection_label: section(protectionOff),
        detection_sensitivity_dropdown: dropmenu(SENSITIVITY_TEXTS, RAID_PROTECTION_SENSITIVITY_VALUES, draft.detectionSensitivity, protectionOff, detectionSensitivity => change({ detectionSensitivity })),
        action_label: section(protectionOff),
        action_type_dropdown: dropmenu(ACTION_TEXTS, RAID_PROTECTION_ACTION_VALUES, draft.actionType, protectionOff, actionType => change({ actionType })),
        ban_duration_label: section(banOff),
        ban_duration_dropdown: dropmenu(durationTexts(RAID_PROTECTION_BAN_DURATION_VALUES), RAID_PROTECTION_BAN_DURATION_VALUES, draft.banDurationSeconds, banOff, banDurationSeconds => change({ banDurationSeconds })),

        guard_enabled_checkbox: { selected: draft.guardEnabled, onPointerTap: () => change({ guardEnabled: !draft.guardEnabled }) },
        guard_duration_label: section(guardOff),
        guard_duration_dropdown: dropmenu(durationTexts(RAID_PROTECTION_GUARD_DURATION_VALUES), RAID_PROTECTION_GUARD_DURATION_VALUES, draft.guardDurationSeconds, guardOff, guardDurationSeconds => change({ guardDurationSeconds })),
        guard_sensitivity_label: section(guardOff),
        guard_sensitivity_dropdown: dropmenu(SENSITIVITY_TEXTS, RAID_PROTECTION_SENSITIVITY_VALUES, draft.guardSensitivity, guardOff, guardSensitivity => change({ guardSensitivity })),

        incident_active_text: { visible: settings.incidentActive },
        incident_inactive_text: {
            visible: !settings.incidentActive,
            caption: (settings.lastRaidAtEpochSeconds > 0)
                ? t('raid.protection.settings.status.inactive.last', '', { timestamp: new Date(settings.lastRaidAtEpochSeconds * 1000).toLocaleString() })
                : '${raid.protection.settings.status.inactive}',
        },

        cancel_button: { onPointerTap: closeRaidProtection },
        save_button: { disabled: saveOutstanding, onPointerTap: saveOutstanding ? undefined : () => requestRaidProtectionSave(send) },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
