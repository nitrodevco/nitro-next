/**
 * `addons/VariablesWebApiAddon.buildInputs` - the usage warning, the read key and the write key
 * (generate / clear / copy), and the permissions section with the bulk delete checkbox and its
 * info text, which needs a write key.
 *
 * Turning bulk delete on asks first (`bulk_delete.warning`). Flash ticks the box at once and
 * unticks it unless the confirmation is accepted (its title bar tinted red); the client's confirm
 * dialog reports only an accept and has no title bar tint, so here the box is ticked when the
 * accept comes. The generate buttons send the request; the key comes back by packet into the
 * form (`registerWiredWebApiKeyHandlers`).
 */
import { generateWiredWebApiKey } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInterpolate, useWindowActions } from '#base/context/system';
import { isWiredWebApiBulkDeleteDisabled, VariablesWebApiAddonForm, WiredElementView } from '#base/wired';

import { WiredApiKeySection } from '../../kit/WiredApiKeySection';
import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';
import { WiredUsageWarningSection } from '../../kit/WiredUsageWarningSection';

/** `MASS_DELETION_CHECKBOX_ID`. */
const BULK_DELETE_ID = 0;

export const VariablesWebApiAddonView: WiredElementView<VariablesWebApiAddonForm> = ({ form, setForm }) => {
    const { send } = useWebSocketContext();
    const { showConfirm } = useWindowActions();
    const interpolate = useInterpolate();
    const style = useWiredStyle();

    // `onChangeCheckbox`.
    const onToggle = (id: number, selected: boolean) => {
        if (!selected || (id !== BULK_DELETE_ID)) {
            setForm({ bulkDelete: selected });

            return;
        }

        showConfirm(
            interpolate('${wiredfurni.params.web_api.permissions.bulk_delete.warning.title}'),
            interpolate('${wiredfurni.params.web_api.permissions.bulk_delete.warning.desc}'),
            () => setForm({ bulkDelete: true }),
        );
    };

    return (
        <>
            <WiredUsageWarningSection text="${wiredfurni.params.web_api.usage_info}" />
            <WiredApiKeySection
                write={false}
                value={form.readKey}
                onChange={readKey => setForm({ readKey })}
                onGenerate={() => generateWiredWebApiKey(send, true)}
            />
            <WiredApiKeySection
                write
                value={form.writeKey}
                onChange={writeKey => setForm({ writeKey })}
                onGenerate={() => generateWiredWebApiKey(send, false)}
            />
            <WiredSection title="${wiredfurni.params.web_api.permissions}">
                <WiredCheckboxGroup
                    options={[ {
                        id: BULK_DELETE_ID,
                        label: '${wiredfurni.params.web_api.permissions.bulk_delete}',
                        selected: form.bulkDelete,
                        disabled: isWiredWebApiBulkDeleteDisabled(form),
                        extraUnder: (
                            <WiredText
                                text="${wiredfurni.params.web_api.permissions.bulk_delete.info}"
                                color={style.softTextColor}
                            />
                        ),
                    } ]}
                    onToggle={onToggle}
                />
            </WiredSection>
        </>
    );
};
