import { TemplateBinding, TemplateWindow } from '#base/theme';

/** Which of the area's switches is being flipped. */
export type AreaHideOption = 'invisible' | 'wallItems' | 'inverted';

export interface FurnitureAreaHideViewProps {
    /** The tiles currently marked, so the dialog can say whether there is an area at all. */
    width: number;
    length: number;
    invisible: boolean;
    wallItems: boolean;
    inverted: boolean;
    /** While the area is hiding, its settings are fixed - only the off switch still does anything. */
    isOn: boolean;
    onToggleOption: (option: AreaHideOption, value: boolean) => void;
    onSelect: () => void;
    onClear: () => void;
    onApply: () => void;
    onToggle: () => void;
    onClose: () => void;
}

/** `AreaHideFurniWidget._textNames`: the texts `disableContents` fades with the checkboxes. */
const TEXT_NAMES = [ 'hidearea_info', 'areaselection_title', 'areaselection_info', 'options_title', 'invisibility_txt', 'invisibility_info', 'wallitems_txt', 'invert_txt', 'invert_info' ];

/**
 * The area-hide controls, on the `area_hide_ui` layout (292x334) that
 * `AreaHideFurniWidget.createWindow` builds and centres: mark an area on the floor, then say what
 * should happen inside it. Selecting happens in the room itself, not in here - `select_button` and
 * `clear_button` only start and clear it.
 *
 * `refreshUI` captions `on_off_button` by the state; while the area is on, `disableContents`
 * disables the buttons and checkboxes and fades the checkboxes and every text of `_textNames` to a
 * blend of 0.5. The checkboxes are `wallitems_checkbox`, `invert_checkbox` and
 * `invisiblity_checkbox` (sic).
 *
 * Flash hides `apply_button` (`AUTO_SAVE`) and sends every change as it is made; this port keeps
 * the button, because the widget sends its draft only on Apply.
 */
export const FurnitureAreaHideView = ({
    width, length, invisible, wallItems, inverted, isOn,
    onToggleOption, onSelect, onClear, onApply, onToggle, onClose,
}: FurnitureAreaHideViewProps) => {
    const hasArea = ((width > 0) && (length > 0));
    const blend = (isOn ? 0.5 : 1);

    const checkbox = (option: AreaHideOption, selected: boolean): TemplateBinding => ({
        selected,
        disabled: isOn,
        alpha: blend,
        onPointerTap: () => onToggleOption(option, !selected),
    });

    return (
        <TemplateWindow
            id="habbo-room-ui-com/area_hide_ui_xml"
            frame={{ id: 'areahide_ui', centered: true, rememberPosition: false, onClose }}
            bindings={{
                ...Object.fromEntries(TEXT_NAMES.map(name => [ name, { alpha: blend } ])),
                wallitems_checkbox: checkbox('wallItems', wallItems),
                invert_checkbox: checkbox('inverted', inverted),
                invisiblity_checkbox: checkbox('invisible', invisible),
                select_button: { disabled: isOn, onPointerTap: onSelect },
                clear_button: { disabled: isOn, onPointerTap: onClear },
                apply_button: { disabled: isOn || !hasArea, onPointerTap: onApply },
                on_off_button: { caption: isOn ? '${widget.areahide.button.off}' : '${widget.areahide.button.on}', onPointerTap: onToggle },
            }}
        />
    );
};
