/**
 * `LinkDataframeReceivePreset` (WIN63-202610201032) - "Number of rows" (0 to 12) over one
 * `LinkDataframeReceiveRowPreset` section per row in use ("Row N"): the key with the destination
 * dropdown, then the text placeholder's name or the context variable to capture into (a picker
 * limited to user-created context variables the box may create and write). The three names are as
 * wide as the widest (`createLabel`).
 */
import {
    getWiredRoomVariables, LINK_DATAFRAME_KEY_MAX_LENGTH, LINK_DATAFRAME_MAX_ROWS, LINK_DATAFRAME_PLACEHOLDER_DESTINATION, LINK_DATAFRAME_RECEIVE_KIND_OPTIONS, LinkDataframeReceiveRow,
    linkDataframeReceiveVariableFilter, ReceiveLinkDataframeForm, WiredElementView,
} from '#base/wired';

import { useWiredCaption } from '../../kit/useWiredCaption';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';
import { measureWiredText, wiredTextFormat } from '../../kit/wiredTextFormat';
import { WiredTextInput } from '../../kit/WiredTextInput';
import { WiredVariablePicker } from '../../kit/WiredVariablePicker';

const COUNT_OPTIONS = Array.from({ length: LINK_DATAFRAME_MAX_ROWS + 1 }, (_, id) => ({ id, label: String(id) }));

const KEY_LABEL = '${wiredfurni.params.link.key}';
const PLACEHOLDER_LABEL = '${wiredfurni.params.link.placeholder}';
const VARIABLE_LABEL = '${wiredfurni.params.link.capture_variable}';

export const ReceiveLinkDataframeView: WiredElementView<ReceiveLinkDataframeForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    const variables = getWiredRoomVariables(triggerable);

    // `createLabel`: the three names, as wide as the widest.
    const labelFormat = wiredTextFormat(style.templates.text);
    const labelWidth = [ KEY_LABEL, PLACEHOLDER_LABEL, VARIABLE_LABEL ].reduce((width, label) => Math.max(width, measureWiredText(caption(label), labelFormat) ?? 0), 0);

    const setRow = (index: number, patch: Partial<LinkDataframeReceiveRow>) =>
        setForm(current => ({ ...current, rows: current.rows.with(index, { ...current.rows[index], ...patch }) }));

    const label = (text: string) => (
        <WiredText
            text={text}
            mode="stretch"
            width={labelWidth}
            layout={{ marginTop: style.namedInputOffset }}
        />
    );

    return (
        <WiredSimpleList>
            <WiredSection title="${wiredfurni.params.link.row_count}">
                <WiredDropdown
                    options={COUNT_OPTIONS}
                    selected={form.count}
                    onSelect={count => setForm({ count })}
                />
            </WiredSection>
            {form.rows.slice(0, form.count).map((row, index) => (
                <WiredSection
                    key={index}
                    title={ctx.localize('wiredfurni.params.link.row', { number: String(index + 1) })}
                >
                    <WiredSimpleList>
                        <WiredSimpleList vertical={false}>
                            {label(KEY_LABEL)}
                            <WiredTextInput
                                value={row.key}
                                onChange={key => setRow(index, { key })}
                                maxCharacters={LINK_DATAFRAME_KEY_MAX_LENGTH}
                                showCharacterLimit={false}
                            />
                            <WiredDropdown
                                options={LINK_DATAFRAME_RECEIVE_KIND_OPTIONS}
                                selected={row.kind}
                                onSelect={kind => setRow(index, { kind })}
                            />
                        </WiredSimpleList>
                        {(row.kind === LINK_DATAFRAME_PLACEHOLDER_DESTINATION)
                            ? (
                                    <WiredSimpleList vertical={false}>
                                        {label(PLACEHOLDER_LABEL)}
                                        <WiredTextInput
                                            value={row.placeholder}
                                            onChange={placeholder => setRow(index, { placeholder })}
                                            maxCharacters={LINK_DATAFRAME_KEY_MAX_LENGTH}
                                            showCharacterLimit={false}
                                        />
                                    </WiredSimpleList>
                                )
                            : (
                                    <WiredSimpleList vertical={false}>
                                        {label(VARIABLE_LABEL)}
                                        <WiredVariablePicker
                                            variables={variables}
                                            state={row.picker}
                                            onChange={picker => setRow(index, { picker })}
                                            filter={linkDataframeReceiveVariableFilter}
                                            roomId={ctx.roomId}
                                        />
                                    </WiredSimpleList>
                                )}
                    </WiredSimpleList>
                </WiredSection>
            ))}
        </WiredSimpleList>
    );
};
