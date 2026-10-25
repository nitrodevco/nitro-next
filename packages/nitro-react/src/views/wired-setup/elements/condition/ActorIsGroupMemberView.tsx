/**
 * `conditions/ActorIsGroupMember.buildInputs` and the identical `selectors/UsersInGroup.buildInputs` -
 * the `groupselection` section: the room's group
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
import { ACTOR_IS_GROUP_MEMBER_PICKED_GROUP, ACTOR_IS_GROUP_MEMBER_REQUEST_TIMEOUT, ACTOR_IS_GROUP_MEMBER_ROOM_GROUP, actorIsGroupMemberCondition, ActorIsGroupMemberConditionForm, USERS_IN_GROUP_REQUEST_TIMEOUT, usersInGroupSelector, WiredElementView, WiredElementViewProps, WiredHolderKey } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

interface GroupSelectionProps extends WiredElementViewProps<ActorIsGroupMemberConditionForm> {
    /** The element being edited - each keeps its own request timer. */
    definition: { holder: WiredHolderKey; code: number };
    requestTimeout: number;
}

const GroupSelection = ({ form, setForm, ctx, definition, requestTimeout }: GroupSelectionProps) => {
    const { send } = useWebSocketContext();
    const editId = useWiredStore(x => x.setup?.editId);

    useEffect(() => requestWiredGuildMemberships(send, definition, requestTimeout), [ editId, send ]);

    return (
        <WiredSection title="${wiredfurni.params.groupselection}">
            <WiredRadioGroup
                options={[
                    { id: ACTOR_IS_GROUP_MEMBER_ROOM_GROUP, label: '${wiredfurni.params.grouptype.0}' },
                    {
                        id: ACTOR_IS_GROUP_MEMBER_PICKED_GROUP,
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

export const ActorIsGroupMemberView: WiredElementView<ActorIsGroupMemberConditionForm> = props => (
    <GroupSelection
        {...props}
        definition={actorIsGroupMemberCondition}
        requestTimeout={ACTOR_IS_GROUP_MEMBER_REQUEST_TIMEOUT}
    />
);

export const UsersInGroupView: WiredElementView<ActorIsGroupMemberConditionForm> = props => (
    <GroupSelection
        {...props}
        definition={usersInGroupSelector}
        requestTimeout={USERS_IN_GROUP_REQUEST_TIMEOUT}
    />
);
