/**
 * `tabs/common/VariableTypePicker` on a tab's `type_picker_container` of `wired_menu_view_xml`: a
 * button per variable target, named `type_<target>_button` with the target's type as its `id`. The
 * selected button stays pressed (Flash keeps its `0x10` pressed state - not the `0x08` selected one -
 * set every frame), and a press on another picks its target (`maybeCancelEvent`'s `WME_UP`). The
 * overview tab's layout has all four targets, the inspection tab's the first three; a binding for
 * a button the layout lacks finds nothing.
 */
import { TemplateBindings } from '#base/theme';

/** `VariableTypePicker.SELECTION_TYPES`, each with its button's `id` in the layout. */
const TYPE_BUTTONS = [
    { type: 0, name: 'furni' },
    { type: 1, name: 'user' },
    { type: -10, name: 'global' },
    { type: -20, name: 'context' },
];

export const wiredMenuTypePickerBindings = (selected: number, onSelect: (type: number) => void, count = TYPE_BUTTONS.length): TemplateBindings => Object.fromEntries(
    TYPE_BUTTONS.slice(0, count).map(({ type, name }) => [
        `type_${name}_button`,
        {
            pressed: type === selected,
            onPointerTap: () => {
                if (type !== selected) onSelect(type);
            },
        },
    ]),
);
