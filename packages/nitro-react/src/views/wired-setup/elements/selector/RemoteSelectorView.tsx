/**
 * `selectors/§_-01b§.buildInputs` - the `remote_selection.type` radio, then the
 * `remote_selection.filter` radio whose second option carries the number to filter by
 * (`NumberInputParam(0, 0, 2147483647, 40, 0, false)`, disabled while not chosen).
 */
import { REMOTE_SELECTOR_FILTER_MAX, REMOTE_SELECTOR_FILTER_WIDTH, RemoteSelectorForm, WiredElementView } from '#base/wired';

import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const RemoteSelectorView: WiredElementView<RemoteSelectorForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.remote_selection.type}">
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.remote_selection.type.0}' }, { id: 1, label: '${wiredfurni.params.remote_selection.type.1}' } ]}
                selected={form.type}
                onSelect={type => setForm({ type })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.remote_selection.filter}">
            <WiredRadioGroup
                options={[
                    { id: 0, label: '${wiredfurni.params.remote_selection.filter.0}' },
                    {
                        id: 1,
                        label: '${wiredfurni.params.remote_selection.filter.1}',
                        extra: (
                            <WiredNumberInput
                                value={form.filterValue}
                                onChange={filterValue => setForm({ filterValue })}
                                min={0}
                                max={REMOTE_SELECTOR_FILTER_MAX}
                                width={REMOTE_SELECTOR_FILTER_WIDTH}
                            />
                        ),
                    },
                ]}
                selected={form.filterMode}
                onSelect={filterMode => setForm({ filterMode })}
            />
        </WiredSection>
    </>
);
