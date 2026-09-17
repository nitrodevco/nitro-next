import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CheckBox, Frame, ThemeText } from '#base/theme';

/** Which of the area's switches is being flipped. */
export type AreaHideOption = 'invisible' | 'wallItems' | 'inverted';

/** The three switches the area offers, in the order the layout stacks them. */
const OPTIONS: { key: AreaHideOption; labelKey: string }[] = [
    { key: 'invisible', labelKey: 'widget.areahide.options.invisibility' },
    { key: 'wallItems', labelKey: 'widget.areahide.options.wallitems' },
    { key: 'inverted', labelKey: 'widget.areahide.options.invert' },
];

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

/**
 * The area-hide controls, on the `area_hide_ui` layout (292x334): mark an area on the floor,
 * then say what should happen inside it. Selecting happens in the room itself, not in here - the
 * dialog only starts and clears it.
 */
export const FurnitureAreaHideView = ({
    width, length, invisible, wallItems, inverted, isOn,
    onToggleOption, onSelect, onClear, onApply, onToggle, onClose,
}: FurnitureAreaHideViewProps) => {
    const t = useTranslation();
    const hasArea = ((width > 0) && (length > 0));
    const values: Record<AreaHideOption, boolean> = { invisible, wallItems, inverted };

    return (
        <Frame
            variant="3"
            id="furniture-area-hide"
            caption={t('widget.areahide.title')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 100, y: 60 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 292, height: 334 }}
        >
            <Border
                variant="100"
                backgroundColor="#ffffff"
                layout={{ flex: 1, flexDirection: 'column', gap: 6, padding: 6 }}
            >
                <ThemeText
                    text={t('widget.areahide.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 268 }}
                    verticalAlign="top"
                    layout={{ width: 268, height: 40 }}
                />
                <ThemeText
                    text={t('widget.areahide.area_selection')}
                    textStyle="text-style-bold"
                />
                <ThemeText
                    text={t('widget.areahide.area_selection.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 268 }}
                    verticalAlign="top"
                    layout={{ width: 268, height: 32 }}
                />
                <Box layout={{ flexDirection: 'row', gap: 4 }}>
                    <Button
                        variant="0"
                        disabled={isOn}
                        onPointerTap={onSelect}
                        layout={{ flex: 1, height: 24 }}
                    >
                        {t('widget.areahide.button.select')}
                    </Button>
                    <Button
                        variant="0"
                        disabled={isOn}
                        onPointerTap={onClear}
                        layout={{ flex: 1, height: 24 }}
                    >
                        {t('widget.areahide.button.clear')}
                    </Button>
                </Box>
                {OPTIONS.map(option => (
                    <Box
                        key={option.key}
                        layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                    >
                        <CheckBox
                            variant="0"
                            disabled={isOn}
                            selected={values[option.key]}
                            onPointerTap={() => onToggleOption(option.key, !values[option.key])}
                            layout={{ width: 18, height: 18 }}
                        />
                        <ThemeText
                            text={t(option.labelKey)}
                            textOptions={{ fill: '#000000' }}
                        />
                    </Box>
                ))}
                <ThemeText
                    text={t('widget.areahide.options.invert.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 268 }}
                    verticalAlign="top"
                    layout={{ width: 268, height: 32 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', gap: 4, marginTop: 3 }}>
                <Button
                    variant="0"
                    disabled={isOn || !hasArea}
                    onPointerTap={onApply}
                    layout={{ width: 165, height: 24 }}
                >
                    {t('widget.areahide.button.apply')}
                </Button>
                <Button
                    variant="0"
                    onPointerTap={onToggle}
                    layout={{ flex: 1, height: 24 }}
                >
                    {t(isOn ? 'widget.areahide.button.off' : 'widget.areahide.button.on')}
                </Button>
            </Box>
        </Frame>
    );
};
