/**
 * `tabs/common/VariableTypePicker` on the `type_picker_container` of `wired_menu_view_xml`: a bold
 * title over a bordered row of 37px buttons, one per variable target, each with its large icon.
 * The selected button stays pressed (Flash keeps its `0x10` state set every frame). The overview
 * tab offers all four targets (188 wide), the inspection tab the first three (141 wide).
 */
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, LayoutImage, ThemeImage, ThemeText } from '#base/theme';

/** `VariableTypePicker.SELECTION_TYPES` with each button's `id` and tooltip. */
const TYPE_BUTTONS = [
    { type: 0, name: 'furni', tooltip: 'wiredfurni.params.sourcetype.furni' },
    { type: 1, name: 'user', tooltip: 'wiredfurni.params.sourcetype.users' },
    { type: -10, name: 'global', tooltip: 'wiredfurni.params.sourcetype.global' },
    { type: -20, name: 'context', tooltip: 'wiredfurni.params.sourcetype.context' },
];

const BUTTON_SIZE = 37;
const BUTTON_SPACING = 10;

export interface WiredMenuTypePickerProps {
    titleKey: string;
    /** How many of the four buttons the layout has. */
    count: number;
    selected: number;
    onSelect: (type: number) => void;
}

export const WiredMenuTypePicker = ({ titleKey, count, selected, onSelect }: WiredMenuTypePickerProps) => {
    const t = useTranslation();
    const buttons = TYPE_BUTTONS.slice(0, count);
    // `type_options` is the row plus 5 on the left and the right edge.
    const width = 5 + (count * BUTTON_SIZE) + ((count - 1) * BUTTON_SPACING) + 5;

    return (
        <Box layout={{ width: width + 9, height: 70, flexShrink: 0 }}>
            <ThemeText
                text={t(titleKey, titleKey)}
                textStyle="u_bold"
                textOptions={{ fill: '#000000' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, top: 0, height: 19 }}
            />
            <Border
                variant="3"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, top: 20, width, height: 47 }}
            >
                <Box layout={{ position: 'absolute', left: 5, top: 5, flexDirection: 'row', gap: BUTTON_SPACING }}>
                    {buttons.map(button => (
                        <Box
                            key={button.type}
                            layout={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
                        >
                            <Button
                                variant="3"
                                selected={button.type === selected}
                                tooltip={t(button.tooltip, button.tooltip)}
                                onPointerTap={() => onSelect(button.type)}
                                layout={{ position: 'absolute', left: 0, top: 0, width: BUTTON_SIZE, height: 36 }}
                            />
                            {/* `pivot_point="center"`, not stretched. */}
                            <Box
                                eventMode="none"
                                layout={{ position: 'absolute', left: 0, top: 0, width: BUTTON_SIZE, height: BUTTON_SIZE, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeImage
                                    src={LayoutImage(`wired/icon_wired_variable_${button.name}_large.png`)}
                                    eventMode="none"
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Border>
        </Box>
    );
};
