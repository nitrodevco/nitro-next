/**
 * `uibuilder/presets/sections/applications/PlaceholderTypeSection` - whether a placeholder shows
 * one entry or all of them joined (`texts.placeholder_type[.<variant>].1` / `.2`); the second
 * option carries the delimiter, a 5 character, 55px named input (`texts.select_delimiter`).
 * `variant` is `createPlaceholderTypeSection`'s argument (`user`, `furni`, or none).
 *
 * Controlled: `showMultiple` is `isShowMultiple` (radio 1) and `delimiter` the input's text; the
 * delimiter is kept while the single option is selected and only dropped when the box reads it
 * (`placeholderDelimiter`). `multipleDisabled` is `get(1).disabled` - the variable placeholder sets
 * it for a global or context variable and clears `showMultiple` in the same update.
 */
import { WiredNamedTextInput } from './WiredNamedTextInput';
import { WiredRadioGroup } from './WiredRadioGroup';
import { WiredSection } from './WiredSection';

/** `TextInputParam("", 5, null, 55)`. */
const DELIMITER_MAX_CHARACTERS = 5;
const DELIMITER_WIDTH = 55;

export interface WiredPlaceholderTypeSectionProps {
    /** `param4` - `user`, `furni`, or none for the plain captions. */
    variant?: string | null;
    showMultiple: boolean;
    delimiter: string;
    onChange: (showMultiple: boolean, delimiter: string) => void;
    /** `get(1).disabled`. */
    multipleDisabled?: boolean;
}

export const WiredPlaceholderTypeSection = ({ variant = null, showMultiple, delimiter, onChange, multipleDisabled = false }: WiredPlaceholderTypeSectionProps) => {
    const keyPart = variant ? `${variant}.` : '';

    return (
        <WiredSection title="${wiredfurni.params.texts.placeholder_type}">
            <WiredRadioGroup
                selected={showMultiple ? 1 : 0}
                onSelect={id => onChange(id === 1, delimiter)}
                options={[
                    { id: 0, label: `\${wiredfurni.params.texts.placeholder_type.${keyPart}1}` },
                    {
                        id: 1,
                        label: `\${wiredfurni.params.texts.placeholder_type.${keyPart}2}`,
                        disabled: multipleDisabled,
                        extra: (
                            <WiredNamedTextInput
                                name="${wiredfurni.params.texts.select_delimiter}"
                                value={delimiter}
                                onChange={text => onChange(showMultiple, text)}
                                maxCharacters={DELIMITER_MAX_CHARACTERS}
                                width={DELIMITER_WIDTH}
                            />
                        ),
                    },
                ]}
            />
        </WiredSection>
    );
};
