/**
 * `wired_setup.uibuilder.presets.SourceTypeSelectorPreset` with `params.SourceTypeSelectorParam` -
 * the source type picker a section carries in its header (`SectionParam.sourceTypeSelectorParam`)
 * or an element places itself. The style's `sourcetype_selector_view` decides the face, as the
 * preset's `tags.indexOf("NEW")` test does: illumina's segmented `NewSourceTypePicker`
 * (`WiredNewSourceTypePicker`), or the flat `SourceTypePicker` strip (`WiredSourceTypePicker`) of
 * the volters and ubuntu. Static width: the picker's.
 *
 * The flat template sits at `y = -2` in its style, which a header list keeps: the strip reaches
 * two pixels above the row it is in.
 *
 * Controlled: `selected` is the form's source type and `onSelect` the param's listener
 * (`§_-c1v§.sourceType`). A `selected` that is not among `options` shows the first option -
 * Flash's `initialize` clicks it, and so writes it back; an element's `createForm` does that
 * write itself.
 */
import { Box } from '#base/theme';

import { WiredNewSourceTypePicker } from './WiredNewSourceTypePicker';
import { WiredSourceTypePicker } from './WiredSourceTypePicker';
import { useWiredStyle } from './WiredStyleContext';

/** The flat template's own `y` in the volter and ubuntu styles. */
const FLAT_TEMPLATE_Y = -2;

export interface WiredSourceTypeSelectorProps {
    /** `SourceTypeSelectorParam.ids` - `WIRED_SOURCE_*` and `VariableExtraSourceTypes` values, in order. */
    options: readonly number[];
    /** `currentSelection`. */
    selected: number;
    /** `listener.sourceType = ...` - only for a type other than the selected one. */
    onSelect: (sourceType: number) => void;
    disabled?: boolean;
}

export const WiredSourceTypeSelector = ({ options, selected, onSelect, disabled = false }: WiredSourceTypeSelectorProps) => {
    const style = useWiredStyle();

    if (style.templates.sourceTypeSelector.kind === 'segmented') {
        return (
            <WiredNewSourceTypePicker
                options={options}
                selected={selected}
                onSelect={onSelect}
                disabled={disabled}
            />
        );
    }

    return (
        <Box layout={{ flexShrink: 0, marginTop: FLAT_TEMPLATE_Y }}>
            <WiredSourceTypePicker
                options={options}
                selected={selected}
                onSelect={onSelect}
                disabled={disabled}
            />
        </Box>
    );
};
