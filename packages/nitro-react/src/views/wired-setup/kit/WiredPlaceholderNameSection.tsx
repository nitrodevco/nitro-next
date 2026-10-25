/**
 * `uibuilder/presets/sections/applications/PlaceholderNameSection` - the name of a text
 * placeholder (the "placeholder" addons and the variable-to-text boxes): a 32 character input
 * that takes letters, digits, `_` and spaces and is rewritten to lower case with spaces as
 * underscores (`normalizeWiredVariableName`), over a preview of how the placeholder is written
 * in a text - `wiredfurni.params.texts.placeholder_preview` with `%placeholder%` =
 * `<prefix>(<name>)`, its `#ffffaa` swapped for the style's yellow, in an html text three lines of
 * the template font high.
 *
 * Controlled: `value` is the form's name, `onChange` gets it normalised (what `placeholderName`
 * returns).
 */
import { useTranslation } from '#base/context/system';
import { normalizeWiredVariableName, PLACEHOLDER_NAME_MAX_CHARACTERS, PLACEHOLDER_NAME_RESTRICT } from '#base/wired';

import { WiredHtml } from './WiredHtml';
import { WiredSection } from './WiredSection';
import { WiredSimpleList } from './WiredSimpleList';
import { WiredStaticHeight } from './WiredStaticHeight';
import { useWiredStyle } from './WiredStyleContext';
import { wiredTextFormat } from './wiredTextFormat';
import { WiredTextInput } from './WiredTextInput';

/** The colour the preview's localization is written in; Flash swaps it for the style's. */
const PREVIEW_COLOR = '#ffffaa';

export interface WiredPlaceholderNameSectionProps {
    /** The section title - a literal or `${key}`. */
    title: string;
    /** `createPlaceholderNameSection`'s second argument - what the placeholder is written with, e.g. `$`. */
    prefix: string;
    value: string;
    onChange: (name: string) => void;
}

export const WiredPlaceholderNameSection = ({ title, prefix, value, onChange }: WiredPlaceholderNameSectionProps) => {
    const t = useTranslation();
    const style = useWiredStyle();
    const yellow = style.yellowTextColor ?? '#000000';
    const preview = t('wiredfurni.params.texts.placeholder_preview', '', { placeholder: `${prefix}(${value.toLowerCase()})` }).replace(PREVIEW_COLOR, yellow);
    const previewHeight = wiredTextFormat(style.templates.html).fontSize * 3;

    return (
        <WiredSection title={title}>
            <WiredSimpleList>
                <WiredTextInput
                    value={value}
                    onChange={text => onChange(normalizeWiredVariableName(text))}
                    maxCharacters={PLACEHOLDER_NAME_MAX_CHARACTERS}
                    restrict={PLACEHOLDER_NAME_RESTRICT}
                />
                <WiredStaticHeight height={previewHeight}>
                    <WiredHtml text={preview} />
                </WiredStaticHeight>
            </WiredSimpleList>
        </WiredSection>
    );
};
