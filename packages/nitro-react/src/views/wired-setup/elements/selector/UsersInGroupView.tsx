/**
 * `selectors/UsersInGroup.buildInputs` - the `groupselection` section: the room's group
 * (`grouptype.0`) or a group of the editing user's (`grouptype.1`, with the group dropdown under
 * the option, `wiredfurni.tooltip.group` as its caption).
 *
 * `onEditStart`'s `maybeGetGuildMemberships` is the effect below (`requestWiredGuildMemberships`):
 * on every edit it asks for the user's groups, unless the element did less than `REQUEST_TIMEOUT`
 * seconds ago. The answer lands in the wired store (`registerWiredSetupHandlers`) and reaches the
 * dropdown as `ctx.guildMemberships` - Flash's `onGuildMemberships` -> `initGuilds`.
 */
import { useEffect } from 'react';

import { requestWiredGuildMemberships } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWiredStore } from '#base/context/wired';
import { USERS_IN_GROUP_REQUEST_TIMEOUT, usersInGroupSelector, UsersInGroupSelectorForm, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const UsersInGroupView: WiredElementView<UsersInGroupSelectorForm> = ({ form, setForm, ctx }) => {
    const { send } = useWebSocketContext();
    const editId = useWiredStore(x => x.setup?.editId);

    useEffect(() => requestWiredGuildMemberships(send, usersInGroupSelector, USERS_IN_GROUP_REQUEST_TIMEOUT), [ editId, send ]);

    return (
        <WiredSection title="${wiredfurni.params.groupselection}">
            <WiredRadioGroup
                options={[
                    { id: 0, label: '${wiredfurni.params.grouptype.0}' },
                    {
                        id: 1,
                        label: '${wiredfurni.params.grouptype.1}',
                        extraUnder: (
                            <WiredDropdown
                                options={ctx.guildMemberships.map(guild => ({ id: guild.groupId, label: guild.groupName }))}
                                selected={form.groupId}
                                onSelect={groupId => setForm({ groupId })}
                                caption="${wiredfurni.tooltip.group}"
                            />
                        ),
                    },
                ]}
                selected={form.groupType}
                onSelect={groupType => setForm({ groupType })}
            />
        </WiredSection>
    );
};
