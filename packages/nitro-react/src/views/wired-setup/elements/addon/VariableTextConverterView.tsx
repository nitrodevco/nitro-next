/**
 * `addons/§_-D1f§.buildInputs` - the text lines (`TextAreaParam(100, -1, 30, -1, 1000, "",
 * connect_text.caption)`: 100 high, at most 30 lines and 1000 characters) in the
 * `variables.connect_text.title` section.
 */
import { VARIABLE_TEXT_CONVERTER_HEIGHT, VARIABLE_TEXT_CONVERTER_MAX_LENGTH, VARIABLE_TEXT_CONVERTER_MAX_LINES, VariableTextConverterAddonForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextArea } from '../../kit/WiredTextArea';

export const VariableTextConverterView: WiredElementView<VariableTextConverterAddonForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.variables.connect_text.title}">
        <WiredTextArea
            value={form.text}
            onChange={text => setForm({ text })}
            height={VARIABLE_TEXT_CONVERTER_HEIGHT}
            maxLines={VARIABLE_TEXT_CONVERTER_MAX_LINES}
            maxCharacters={VARIABLE_TEXT_CONVERTER_MAX_LENGTH}
            placeholder="${wiredfurni.params.variables.connect_text.caption}"
        />
    </WiredSection>
);
