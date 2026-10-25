/**
 * `addons/GlobalPlaceholderAddon.buildInputs` - the placeholder's name (`$` prefix), then the
 * `choose_type` radio: a typed value (a 100 character input under it) or a placeholder another
 * room shares (the room and placeholder drop-downs under it).
 */
import { GLOBAL_PLACEHOLDER_FROM_ANOTHER_ROOM, GLOBAL_PLACEHOLDER_FROM_VALUE, GLOBAL_PLACEHOLDER_VALUE_MAX_LENGTH, GlobalPlaceholderAddonForm, selectGlobalPlaceholder, selectGlobalPlaceholderRoom, WiredElementView } from '#base/wired';

import { WiredNamedDropdown } from '../../kit/WiredNamedDropdown';
import { WiredPlaceholderNameSection } from '../../kit/WiredPlaceholderNameSection';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredTextInput } from '../../kit/WiredTextInput';

export const GlobalPlaceholderAddonView: WiredElementView<GlobalPlaceholderAddonForm> = ({ form, setForm, triggerable }) => {
    const list = triggerable.wiredContext.referencePlaceholderList;

    return (
        <>
            <WiredPlaceholderNameSection
                title="${wiredfurni.params.texts.placeholder_name}"
                prefix="$"
                value={form.name}
                onChange={name => setForm({ name })}
            />
            <WiredSection title="${wiredfurni.params.choose_type}">
                <WiredRadioGroup
                    options={[
                        {
                            id: GLOBAL_PLACEHOLDER_FROM_VALUE,
                            label: '${wiredfurni.params.from_value}',
                            disabled: form.valueOptionDisabled,
                            extraUnder: (
                                <WiredTextInput
                                    value={form.value}
                                    onChange={value => setForm({ value })}
                                    maxCharacters={GLOBAL_PLACEHOLDER_VALUE_MAX_LENGTH}
                                />
                            ),
                        },
                        {
                            id: GLOBAL_PLACEHOLDER_FROM_ANOTHER_ROOM,
                            label: '${wiredfurni.params.from_another_room}',
                            disabled: form.anotherRoomOptionDisabled,
                            extraUnder: (
                                <WiredSimpleList>
                                    <WiredNamedDropdown
                                        name="${wiredfurni.params.room_selection}"
                                        caption="${wiredfurni.params.room_selection.tooltip}"
                                        options={form.roomOptions}
                                        selected={form.roomId}
                                        onSelect={roomId => setForm(current => selectGlobalPlaceholderRoom(current, list, roomId))}
                                    />
                                    <WiredNamedDropdown
                                        name="${wiredfurni.params.placeholder_selection}"
                                        caption="${wiredfurni.params.placeholder_selection.tooltip}"
                                        options={form.placeholderOptions}
                                        selected={form.placeholderId}
                                        onSelect={placeholderId => setForm(current => selectGlobalPlaceholder(current, placeholderId))}
                                    />
                                </WiredSimpleList>
                            ),
                        },
                    ]}
                    selected={form.mode}
                    onSelect={mode => setForm({ mode })}
                />
            </WiredSection>
        </>
    );
};
