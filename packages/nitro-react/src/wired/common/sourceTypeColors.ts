/**
 * The colouring rules of the two source type pickers a section header shows
 * (`inputsources/SourceTypePicker` + `SourceTypeOption`, the volters' and ubuntu's flat strip, and
 * `inputsources/newpicker/NewSourceTypePicker` + `NewSourceTypeOption`, illumina's segmented
 * buttons), and what both do when they are initialised with a selection they do not offer.
 *
 * Colours are `0xRRGGBB` ints, as Flash computes them; the kit turns them into CSS strings.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER } from '../WiredElement';
import { lightenColor } from './WiredUtil';

/** `SourceTypeOption.backgroundColor` of an option that is neither selected nor hovered; also the strip's end caps before the first colouring. */
export const SOURCE_TYPE_IDLE_COLOR = 0x222222;

/** `NewSourceTypeOption.updateVisuals` - an idle segment is left untinted. */
export const NEW_SOURCE_TYPE_IDLE_COLOR = 0xFFFFFF;

/** The colour each source type is drawn in when selected - shared by both pickers. */
export const sourceTypeBaseColor = (sourceType: number): number => {
    if (sourceType === WIRED_SOURCE_USER) return 0x268E29;

    if (sourceType === WIRED_SOURCE_FURNI) return 0xBA9816;

    if (sourceType === Number(VariableExtraSourceTypes.CONTEXT_SOURCE)) return 0xB05E1E;

    return 0x1D838D;
};

/**
 * `SourceTypeOption.backgroundColor` - idle grey, otherwise the type's colour, darkened to 86%
 * while hovered (selected or not) and to half while disabled; Flash scales each channel and
 * truncates it (`uint` shifts of `Number`s).
 */
export const sourceTypeOptionColor = (sourceType: number, active: boolean, hovered: boolean, disabled: boolean): number => {
    if (!active && !hovered) return SOURCE_TYPE_IDLE_COLOR;

    const color = sourceTypeBaseColor(sourceType);
    const factor = disabled ? 0.5 : (hovered ? 0.86 : 1);

    if (factor === 1) return color;

    const red = Math.trunc(((color >> 16) & 0xFF) * factor);
    const green = Math.trunc(((color >> 8) & 0xFF) * factor);
    const blue = Math.trunc((color & 0xFF) * factor);

    return (red << 16) + (green << 8) + blue;
};

/** `NewSourceTypeOption.updateVisuals` - the segment's tint: the type's colour lightened, more so while only hovered. */
export const newSourceTypeOptionColor = (sourceType: number, active: boolean, hovered: boolean): number => {
    if (!active && !hovered) return NEW_SOURCE_TYPE_IDLE_COLOR;

    return lightenColor(sourceTypeBaseColor(sourceType), (hovered && !active) ? 1.55 : 1.26);
};

/** `NewSourceTypePicker.multiplyColors` - channel by channel, `a * b / 255`, truncated. */
const multiplyColors = (a: number, b: number): number => {
    const red = Math.trunc((((a >> 16) & 0xFF) * ((b >> 16) & 0xFF)) / 255);
    const green = Math.trunc((((a >> 8) & 0xFF) * ((b >> 8) & 0xFF)) / 255);
    const blue = Math.trunc(((a & 0xFF) * (b & 0xFF)) / 255);

    return (red << 16) | (green << 8) | blue;
};

/** The state of one segment, as `updateColorings` reads it. */
export interface NewSourceTypeSegmentState {
    sourceType: number;
    active: boolean;
    hovered: boolean;
}

/**
 * `NewSourceTypePicker.updateColorings` for the splitter between two segments: it takes the
 * colour of the selected segment next to it (or the hovered one, the left winning a tie) over
 * the splitter's own `baseColor`.
 */
export const newSourceTypeSplitterColor = (baseColor: number, left: NewSourceTypeSegmentState, right: NewSourceTypeSegmentState): number => {
    let color = NEW_SOURCE_TYPE_IDLE_COLOR;

    if (left.active || (!right.active && left.hovered)) color = newSourceTypeOptionColor(left.sourceType, left.active, left.hovered);
    else if (right.active || right.hovered) color = newSourceTypeOptionColor(right.sourceType, right.active, right.hovered);

    return multiplyColors(baseColor, color);
};

/**
 * `ISourceTypePicker.initialize(ids, selection)` - a selection the picker does not offer makes it
 * click its first option, which reports that option to the listener. A form therefore stores
 * this value when it is created (`createForm`), and a picker handed anything else shows it.
 */
export const resolveSourceTypeSelection = (options: readonly number[], selected: number): number => {
    if (options.includes(selected) || (options.length === 0)) return selected;

    return options[0];
};
