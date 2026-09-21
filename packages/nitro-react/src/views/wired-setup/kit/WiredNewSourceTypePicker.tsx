/**
 * `inputsources/newpicker/NewSourceTypePicker` + `NewSourceTypeOption` - illumina's segmented
 * source type selector (`sourcetype_selector_view` tagged `NEW`): a left, middle and right
 * container button per source type (the first option takes the left one, the last the right one,
 * the rest the middle one), a 1px splitter between two of them.
 *
 * An idle segment is untinted; the selected or hovered one is tinted in its type's colour,
 * lightened (`newSourceTypeOptionColor`), and a splitter takes the colour of the segment next to
 * it that is selected or hovered (`newSourceTypeSplitterColor`). The icon is centred vertically
 * the way `NewSourceTypeOption` places it: `int((height + 1) / 2 - (iconHeight + 1) / 2)`.
 *
 * Controlled like `WiredSourceTypePicker`: `selected` comes from the form, a value that is not
 * among `options` shows the first one (`resolveSourceTypeSelection`), and `onSelect` fires only
 * for a type other than the selected one. Flash's picker has no disabled state; the kit's
 * `disabled` context still greys it out and stops it taking input.
 *
 * Each button template is `dynamic_style="button"` around its `#icon` type image, so the icon is
 * etched, brightens on hover and sinks a pixel when pressed.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, ContainerButton, LayoutImage, Region, ThemeImage } from '#base/theme';
import { getTypeNameForSource, newSourceTypeOptionColor, newSourceTypeSplitterColor, resolveSourceTypeSelection, uintToHexColor } from '#base/wired';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredStyle } from './WiredStyleContext';

/** The heights of `wired_styles_illumina_icon_source_*` - Flash reads the loaded bitmap's height. */
const ICON_HEIGHTS: Readonly<Record<string, number>> = { furni: 11, users: 10, context: 10, global: 7 };

export interface WiredNewSourceTypePickerProps {
    /** `SourceTypeSelectorParam.ids`. */
    options: readonly number[];
    selected: number;
    /** `§_-c1v§.sourceType` - only for a type other than the selected one. */
    onSelect: (sourceType: number) => void;
    disabled?: boolean;
}

export const WiredNewSourceTypePicker = ({ options, selected, onSelect, disabled: ownDisabled }: WiredNewSourceTypePickerProps) => {
    const t = useTranslation();
    const style = useWiredStyle();
    const disabled = useWiredDisabled(ownDisabled);
    const [ hovered, setHovered ] = useState<number | null>(null);
    const template = style.templates.sourceTypeSelector;

    if (template.kind !== 'segmented') return null;

    const active = resolveSourceTypeSelection(options, selected);
    const segments = options.map(sourceType => ({ sourceType, active: sourceType === active, hovered: !disabled && (sourceType === hovered) }));
    const splitterBase = Number.parseInt(template.splitterColor.slice(1), 16);

    return (
        <Box
            alpha={wiredDisabledAlpha(disabled)}
            layout={{ flexDirection: 'row', height: template.height, flexShrink: 0 }}
        >
            {segments.map((segment, index) => {
                const name = getTypeNameForSource(segment.sourceType);
                const isFirst = (index === 0);
                const isLast = !isFirst && (index === (segments.length - 1));
                const variant = isFirst ? template.leftVariant : (isLast ? template.rightVariant : template.middleVariant);
                const width = isFirst ? template.leftWidth : (isLast ? template.rightWidth : template.middleWidth);
                const iconX = isFirst ? template.leftIconX : (isLast ? template.rightIconX : template.middleIconX);
                const iconY = Math.trunc(((template.height + 1) / 2) - (((ICON_HEIGHTS[name] ?? template.height) + 1) / 2));
                const next = segments[index + 1];

                return [
                    <ContainerButton
                        key={segment.sourceType}
                        variant={variant}
                        tooltip={t(`wiredfurni.params.sourcetype.${name}`, `wiredfurni.params.sourcetype.${name}`)}
                        tintColor={uintToHexColor(newSourceTypeOptionColor(segment.sourceType, segment.active, segment.hovered))}
                        selected={segment.active}
                        dynamicStyle={template.dynamicStyle}
                        disabled={disabled}
                        onPointerOver={() => setHovered(segment.sourceType)}
                        onPointerOut={() => setHovered(current => (current === segment.sourceType) ? null : current)}
                        onPointerTap={() => !disabled && !segment.active && onSelect(segment.sourceType)}
                        layout={{ width, height: template.height, flexShrink: 0 }}
                    >
                        <ThemeImage
                            src={LayoutImage(`wired/${template.assetPrefix}${name}.png`)}
                            dynamicRole="icon"
                            eventMode="none"
                            layout={{ position: 'absolute', left: iconX, top: iconY }}
                        />
                    </ContainerButton>,
                    next && (
                        <Box
                            key={`splitter:${segment.sourceType}`}
                            layout={{ width: 1, height: template.height, flexShrink: 0 }}
                        >
                            <Region
                                backgroundColor={uintToHexColor(newSourceTypeSplitterColor(splitterBase, segment, next))}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 1, height: template.height - 1 }}
                            />
                            <Region
                                backgroundColor={template.splitterShadowColor}
                                layout={{ position: 'absolute', left: 0, top: template.height - 1, width: 1, height: 1 }}
                            />
                        </Box>
                    ),
                ];
            })}
        </Box>
    );
};
