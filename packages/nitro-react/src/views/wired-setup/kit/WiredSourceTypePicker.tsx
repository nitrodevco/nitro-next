/**
 * `inputsources/SourceTypePicker` + `SourceTypeOption` - the flat source type strip of the
 * volter styles and ubuntu (`sourcetype_selector_view` without the `NEW` tag): one 13 x 15
 * coloured cell per source type between two 2px end caps, each end cap's inner line taking the
 * colour of the cell next to it.
 *
 * A cell is the idle grey unless it is the selected one or hovered, when it is the type's colour
 * (`sourceTypeOptionColor`). A press on another cell reports its type (`§_-c1v§.sourceType`);
 * a press on the selected one does nothing. Controlled: `selected` comes from the form - a value
 * that is not among `options` shows the first option, which is what Flash's `initialize` clicks
 * (`resolveSourceTypeSelection`).
 *
 * `WiredSourceTypeSelector` (`SourceTypeSelectorPreset`) renders this or
 * `WiredNewSourceTypePicker` by the style's template kind.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, LayoutImage, Region, ThemeImage } from '#base/theme';
import { getTypeNameForSource, resolveSourceTypeSelection, SOURCE_TYPE_IDLE_COLOR, sourceTypeOptionColor, uintToHexColor } from '#base/wired';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredStyle } from './WiredStyleContext';

/** `left_padding` / `right_padding` and the cell's `left_pad`. */
const CAP_WIDTH = 2;
const CELL_PAD = 2;
/** `type_icon_bitmap`'s height - the bitmap sits at its top left, unscaled. */
const ICON_HEIGHT = 11;

export interface WiredSourceTypePickerProps {
    /** `SourceTypeSelectorParam.ids` - source types (`WIRED_SOURCE_*`, `VariableExtraSourceTypes`). */
    options: readonly number[];
    selected: number;
    /** `§_-c1v§.sourceType` - only for a type other than the selected one. */
    onSelect: (sourceType: number) => void;
    /** `SourceTypePicker.disabled`. */
    disabled?: boolean;
}

export const WiredSourceTypePicker = ({ options, selected, onSelect, disabled: ownDisabled }: WiredSourceTypePickerProps) => {
    const t = useTranslation();
    const style = useWiredStyle();
    const disabled = useWiredDisabled(ownDisabled);
    const [ hovered, setHovered ] = useState<number | null>(null);
    const template = style.templates.sourceTypeSelector;

    if (template.kind !== 'flat') return null;

    const active = resolveSourceTypeSelection(options, selected);
    const blend = wiredDisabledAlpha(disabled);
    const cellColor = (sourceType: number): string => uintToHexColor(sourceTypeOptionColor(sourceType, sourceType === active, !disabled && (sourceType === hovered), disabled));
    const leftColor = (options.length > 0) ? cellColor(options[0]) : uintToHexColor(SOURCE_TYPE_IDLE_COLOR);
    const rightColor = (options.length > 0) ? cellColor(options[options.length - 1]) : uintToHexColor(SOURCE_TYPE_IDLE_COLOR);
    const listWidth = Math.max(0, (options.length * (template.optionWidth + 1)) - 1);
    const innerHeight = template.height - 2;

    return (
        <Box layout={{ flexDirection: 'row', height: template.height, flexShrink: 0 }}>
            <Box layout={{ width: CAP_WIDTH, height: template.height, flexShrink: 0 }}>
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 0, top: 2, width: 1, height: template.height - 4 }}
                />
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 1, top: 1, width: 1, height: innerHeight }}
                />
                <Region
                    backgroundColor={leftColor}
                    alpha={blend}
                    layout={{ position: 'absolute', left: 1, top: 2, width: 1, height: innerHeight - 2 }}
                />
            </Box>
            <Region
                backgroundColor={template.borderColor}
                layout={{ width: listWidth, height: template.height, flexShrink: 0 }}
            >
                <Region
                    backgroundColor={template.backgroundColor}
                    layout={{ position: 'absolute', left: 0, top: 1, width: listWidth, height: innerHeight, flexDirection: 'row', gap: 1 }}
                >
                    {options.map((sourceType) => {
                        const name = getTypeNameForSource(sourceType);

                        return (
                            <Region
                                key={sourceType}
                                tooltip={t(`wiredfurni.params.sourcetype.${name}`, `wiredfurni.params.sourcetype.${name}`)}
                                backgroundColor="#ffffff"
                                cursor={disabled ? 'default' : 'pointer'}
                                onPointerOver={() => setHovered(sourceType)}
                                onPointerOut={() => setHovered(current => (current === sourceType) ? null : current)}
                                onPointerTap={() => !disabled && (sourceType !== active) && onSelect(sourceType)}
                                layout={{ width: template.optionWidth, height: innerHeight, flexShrink: 0 }}
                            >
                                <Region
                                    backgroundColor={cellColor(sourceType)}
                                    alpha={blend}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: template.optionWidth, height: innerHeight }}
                                />
                                <ThemeImage
                                    src={LayoutImage(`wired/${template.assetPrefix}${name}.png`)}
                                    // `type_image` / `type_icon_bitmap`: unstretched, the window sized to its bitmap.
                                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                    tint={template.iconTint ?? undefined}
                                    alpha={blend}
                                    eventMode="none"
                                    layout={{ position: 'absolute', left: CELL_PAD, top: Math.trunc((innerHeight - ICON_HEIGHT) / 2) }}
                                />
                            </Region>
                        );
                    })}
                </Region>
            </Region>
            <Box layout={{ width: CAP_WIDTH, height: template.height, flexShrink: 0 }}>
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 0, top: 1, width: 1, height: innerHeight }}
                />
                <Region
                    backgroundColor={rightColor}
                    alpha={blend}
                    layout={{ position: 'absolute', left: 0, top: 2, width: 1, height: innerHeight - 2 }}
                />
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 1, top: 2, width: 1, height: template.height - 4 }}
                />
            </Box>
        </Box>
    );
};
