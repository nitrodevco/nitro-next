/**
 * The style's `input_template` around a text field - what `WiredStyle.createTextInputView`
 * clones for `TextInputPreset`, `NumberInputPreset` and `TextAreaPreset`: illumina's and
 * ubuntu's input border with the field inset inside it, the volters' bare field with a one
 * pixel outline (the field's `border_color`) around the template's fill - white for the light
 * volters, none for the dark one, where the panel shows through the field as it does in Flash.
 *
 * `fieldWidth` is the params' `width`: the field's own width, to which the template adds what
 * it puts around the field (Flash's `extraWidth = template.width - field.width`). Without it
 * the frame fills. `invalid` recolours the template with the style's
 * `invalidInputBackgroundColor` (`NumberInputPreset.updateInvalidState`). Internal to the kit.
 *
 * The volters' outline is the field's own `border` var: `TextField` strokes it on the field's
 * edge, inside its box, and the text keeps its 2px gutter from that same edge - so the field is
 * not inset by the outline's pixel.
 */
import { ReactNode } from 'react';

import { Border, Box, BoxLayout, Region } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { useWiredStyle } from './WiredStyleContext';

/** The four 1px edges of the volters' field outline. */
const OUTLINE_EDGES: BoxLayout[] = [
    { left: 0, top: 0, right: 0, height: 1 },
    { left: 0, bottom: 0, right: 0, height: 1 },
    { left: 0, top: 0, bottom: 0, width: 1 },
    { right: 0, top: 0, bottom: 0, width: 1 },
];

export interface WiredInputFrameProps {
    /** The field's width; absent (or negative, as Flash's -1) the frame fills. */
    fieldWidth?: number;
    /** The template's height, replaced by a text area's. */
    height?: number;
    invalid?: boolean;
    alpha?: number;
    /** Already resolved. */
    tooltip?: string;
    /** Drawn over the frame without taking room - the character limit bubble. */
    overlay?: ReactNode;
    children?: ReactNode;
}

export const WiredInputFrame = ({ fieldWidth, height, invalid = false, alpha, tooltip, overlay, children }: WiredInputFrameProps) => {
    const style = useWiredStyle();
    const template = style.templates.input;
    const isStatic = (fieldWidth !== undefined) && (fieldWidth >= 0);
    const fillLayout = useWiredFillLayout(isStatic ? (fieldWidth + template.fieldLeft + template.fieldRight) : undefined);
    const frameHeight = height ?? template.height;
    const fieldLayout = { position: 'absolute', left: template.fieldLeft, top: template.fieldTop, right: template.fieldRight, bottom: template.fieldBottom, flexDirection: 'row' } as const;

    return (
        <Region
            tooltip={tooltip}
            layout={{ position: 'relative', height: frameHeight, flexShrink: 0, ...fillLayout }}
        >
            <Box
                alpha={alpha}
                layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
            >
                {template.borderVariant !== null && (
                    <Border
                        variant={template.borderVariant}
                        tintColor={invalid ? style.invalidInputBackgroundColor : undefined}
                        layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
                    />
                )}
                {(template.fieldBorderColor !== null) && (template.backgroundColor !== null) && (
                    <Region
                        backgroundColor={template.backgroundColor}
                        layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
                    />
                )}
                {(template.fieldBorderColor !== null) && OUTLINE_EDGES.map((edge, index) => (
                    <Region
                        key={index}
                        backgroundColor={template.fieldBorderColor ?? undefined}
                        layout={{ position: 'absolute', ...edge }}
                    />
                ))}
                <Box layout={fieldLayout}>
                    {children}
                </Box>
            </Box>
            {overlay}
        </Region>
    );
};
