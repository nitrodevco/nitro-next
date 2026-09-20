/**
 * `uibuilder/presets/sections/VariablePlaceholderModeSection` - how a variable placeholder is
 * written into a text: its number (`texts.variable_display_type.1`) or its connected text
 * (`.2`), the second with an explanation under it at half blend that stays readable while the
 * option is not selected (`halfBlend().noDisable()`).
 *
 * Controlled: `textMode` is the form's `isTextMode` (radio 1), `onChange` gets the new one.
 * `textModeDisabled` is `get(1).disabled`: the boxes set it while the chosen variable has no text
 * connector, and clear `textMode` in the same form update, as Flash does.
 */
import { WiredNoDisable } from './WiredNoDisable';
import { WiredRadioGroup } from './WiredRadioGroup';
import { WiredSection } from './WiredSection';
import { WiredText } from './WiredText';

export interface WiredVariablePlaceholderModeSectionProps {
    /** The section title - a literal or `${key}`. */
    title: string;
    textMode: boolean;
    onChange: (textMode: boolean) => void;
    /** `get(1).disabled`. */
    textModeDisabled?: boolean;
}

export const WiredVariablePlaceholderModeSection = ({ title, textMode, onChange, textModeDisabled = false }: WiredVariablePlaceholderModeSectionProps) => (
    <WiredSection title={title}>
        <WiredRadioGroup
            selected={textMode ? 1 : 0}
            onSelect={id => onChange(id === 1)}
            options={[
                { id: 0, label: '${wiredfurni.params.texts.variable_display_type.1}' },
                {
                    id: 1,
                    label: '${wiredfurni.params.texts.variable_display_type.2}',
                    disabled: textModeDisabled,
                    extraUnder: (
                        <WiredNoDisable>
                            <WiredText
                                text="${wiredfurni.params.texts.variable_display_type.2.info}"
                                halfBlend={true}
                            />
                        </WiredNoDisable>
                    ),
                },
            ]}
        />
    </WiredSection>
);
