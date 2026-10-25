import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow } from '#base/theme';
import { FURNITURE_LABEL_COLORS } from '#base/utils';

/** `FurnitureLabelSettingsView`'s layout, from the room UI library's `furniture_label_settings_xml`. */
const TEMPLATE = 'habbo-room-ui-com/furniture_label_settings_xml';

/** The colour menu's entries (`colorDropdown.populate`), with their English fallbacks. */
const COLOR_NAMES: readonly [ string, string ][] = [
    [ 'blue', 'Blue' ], [ 'teal', 'Teal' ], [ 'green', 'Green' ], [ 'gold', 'Gold' ],
    [ 'orange', 'Orange' ], [ 'red', 'Red' ], [ 'purple', 'Purple' ], [ 'charcoal', 'Charcoal' ],
];

export interface FurnitureLabelSettingsViewProps {
    /** The colour menu's selection: an index into `FURNITURE_LABEL_COLORS`. */
    colorIndex: number;
    /** 0 everyone, 1 users with wired inspection rights. */
    visibility: number;
    alwaysOpen: boolean;
    onColor: (index: number) => void;
    onVisibility: (visibility: number) => void;
    onAlwaysOpen: (alwaysOpen: boolean) => void;
    onSave: () => void;
    onClose: () => void;
}

/**
 * The label settings window (WIN63-202610121624 `FurnitureLabelSettingsView`, layout
 * `furniture_label_settings`, 320x220): the label colour menu with its preview bubble, who can
 * see the label, and "Keep this label always open", disabled unless everyone can
 * (`updateAlwaysOpenAvailability`). Cancel and the close button close it; Save saves and closes.
 */
export const FurnitureLabelSettingsView = ({ colorIndex, visibility, alwaysOpen, onColor, onVisibility, onAlwaysOpen, onSave, onClose }: FurnitureLabelSettingsViewProps) => {
    const t = useTranslation();
    const color = FURNITURE_LABEL_COLORS[((colorIndex < 0) || (colorIndex >= FURNITURE_LABEL_COLORS.length)) ? 0 : colorIndex];

    const bindings: TemplateBindings = {
        color_dropdown: {
            options: COLOR_NAMES.map(([ key, fallback ]) => t(`widget.furniture_label.settings.color.${key}`, fallback)),
            selection: colorIndex,
            onSelect: onColor,
        },
        color_preview: { color: (0xff000000 | color) >>> 0 },
        visibility_dropdown: {
            options: [ t('widget.furniture_label.settings.visibility.everyone', 'Everyone'), t('widget.furniture_label.settings.visibility.wired', 'Users with Wired inspection rights') ],
            selection: (visibility === 0) ? 0 : 1,
            onSelect: index => onVisibility((index === 0) ? 0 : 1),
        },
        always_open_section: { disableSection: visibility !== 0 },
        always_open_checkbox: { selected: alwaysOpen, onPointerTap: () => onAlwaysOpen(!alwaysOpen) },
        cancel_button: { onPointerTap: onClose },
        save_button: { onPointerTap: onSave },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={{ id: 'furniture_label_settings', centered: true, rememberPosition: false, onClose }}
            bindings={bindings}
        />
    );
};
