/**
 * `addons/§_-I1D§.buildInputs` - the placeholder's name (`$` prefix) and its type (one furni or all
 * of them, the `furni` wording).
 */
import { FurniNamePlaceholderAddonForm, WiredElementView } from '#base/wired';

import { WiredPlaceholderNameSection } from '../../kit/WiredPlaceholderNameSection';
import { WiredPlaceholderTypeSection } from '../../kit/WiredPlaceholderTypeSection';

export const FurniNamePlaceholderView: WiredElementView<FurniNamePlaceholderAddonForm> = ({ form, setForm }) => (
    <>
        <WiredPlaceholderNameSection
            title="${wiredfurni.params.texts.placeholder_name}"
            prefix="$"
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredPlaceholderTypeSection
            variant="furni"
            showMultiple={form.showMultiple}
            delimiter={form.delimiter}
            onChange={(showMultiple, delimiter) => setForm({ showMultiple, delimiter })}
        />
    </>
);
