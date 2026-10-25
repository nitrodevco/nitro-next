/**
 * `LinkDataframeSendPreset` (WIN63-202610201032) - "Number of rows" (0 to 12) over one
 * `LinkDataframeSendRowPreset` section per row in use ("Row N"): the key with the mode dropdown,
 * then either the value (a `ValueOrVariableSection` on the row's merged source - a number or a
 * variable, or for "Variable text" a variable or nothing) or the custom message (200 characters).
 * The three names are as wide as the widest (`createLabel`).
 */
import { setWiredMergedSourceType } from '#base/commands';
import {
    changeLinkDataframeSendRowMode, getMergedSourceOptions, getWiredRoomVariables, LINK_DATAFRAME_CUSTOM_MESSAGE, LINK_DATAFRAME_KEY_MAX_LENGTH, LINK_DATAFRAME_MAX_MESSAGE_BYTES, LINK_DATAFRAME_MAX_ROWS,
    LINK_DATAFRAME_SEND_MODE_OPTIONS, LINK_DATAFRAME_VARIABLE_TEXT, LinkDataframeSendRow, linkDataframeSendVariableFilter, sendLinkDataframeAction, SendLinkDataframeForm, WIRED_INT_MAX, WIRED_INT_MIN,
    WiredElementView,
} from '#base/wired';

import { useWiredCaption } from '../../kit/useWiredCaption';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';
import { measureWiredText, wiredTextFormat } from '../../kit/wiredTextFormat';
import { WiredTextInput } from '../../kit/WiredTextInput';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

const COUNT_OPTIONS = Array.from({ length: LINK_DATAFRAME_MAX_ROWS + 1 }, (_, id) => ({ id, label: String(id) }));

const KEY_LABEL = '${wiredfurni.params.link.key}';
const VALUE_LABEL = '${wiredfurni.params.link.value}';
const MESSAGE_LABEL = '${wiredfurni.params.link.message}';

export const SendLinkDataframeView: WiredElementView<SendLinkDataframeForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    const variables = getWiredRoomVariables(triggerable);
    const sourceTypeOptions = getMergedSourceOptions(sendLinkDataframeAction, form, 0, ctx);

    // `createLabel`: the three names, as wide as the widest.
    const labelFormat = wiredTextFormat(style.templates.text);
    const labelWidth = [ KEY_LABEL, VALUE_LABEL, MESSAGE_LABEL ].reduce((width, label) => Math.max(width, measureWiredText(caption(label), labelFormat) ?? 0), 0);

    const setRow = (index: number, update: (row: LinkDataframeSendRow) => LinkDataframeSendRow) =>
        setForm(current => ({ ...current, rows: current.rows.with(index, update(current.rows[index])) }));

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
                                onChange={key => setRow(index, current => ({ ...current, key }))}
                                maxCharacters={LINK_DATAFRAME_KEY_MAX_LENGTH}
                                showCharacterLimit={false}
                            />
                            <WiredDropdown
                                options={LINK_DATAFRAME_SEND_MODE_OPTIONS}
                                selected={row.modeOption}
                                onSelect={modeOption => setRow(index, current => changeLinkDataframeSendRowMode(current, modeOption))}
                            />
                        </WiredSimpleList>
                        {(row.modeOption !== LINK_DATAFRAME_CUSTOM_MESSAGE)
                            ? (
                                    <WiredSimpleList
                                        vertical={false}
                                        centerVertically
                                    >
                                        {label(VALUE_LABEL)}
                                        <WiredValueOrVariableSection
                                            title={null}
                                            mergedId={index}
                                            sourceTypeOptions={sourceTypeOptions}
                                            min={WIRED_INT_MIN}
                                            max={WIRED_INT_MAX}
                                            state={row.value}
                                            onChange={value => setRow(index, current => ({ ...current, value }))}
                                            onSourceTypeSelect={sourceType => setWiredMergedSourceType(index, sourceType)}
                                            variables={variables}
                                            roomId={ctx.roomId}
                                            variableFilter={linkDataframeSendVariableFilter(row)}
                                            variableOnlyOrEmpty={row.modeOption === LINK_DATAFRAME_VARIABLE_TEXT}
                                        />
                                    </WiredSimpleList>
                                )
                            : (
                                    <WiredSimpleList vertical={false}>
                                        {label(MESSAGE_LABEL)}
                                        <WiredTextInput
                                            value={row.message}
                                            onChange={message => setRow(index, current => ({ ...current, message }))}
                                            maxCharacters={LINK_DATAFRAME_MAX_MESSAGE_BYTES}
                                        />
                                    </WiredSimpleList>
                                )}
                    </WiredSimpleList>
                </WiredSection>
            ))}
        </WiredSimpleList>
    );
};
