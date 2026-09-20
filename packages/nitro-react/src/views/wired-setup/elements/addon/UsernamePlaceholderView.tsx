/**
 * `addons/§_-gh§.buildInputs` - the placeholder's name (`$` prefix) and its type (one user or all
 * of them, the `user` wording).
 */
import { UsernamePlaceholderAddonForm, WiredElementView } from '#base/wired';

import { WiredPlaceholderNameSection } from '../../kit/WiredPlaceholderNameSection';
import { WiredPlaceholderTypeSection } from '../../kit/WiredPlaceholderTypeSection';

export const UsernamePlaceholderView: WiredElementView<UsernamePlaceholderAddonForm> = ({ form, setForm }) => (
    <>
        <WiredPlaceholderNameSection
            title="${wiredfurni.params.texts.placeholder_name}"
            prefix="$"
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredPlaceholderTypeSection
            variant="user"
            showMultiple={form.showMultiple}
            delimiter={form.delimiter}
            onChange={(showMultiple, delimiter) => setForm({ showMultiple, delimiter })}
        />
    </>
);
