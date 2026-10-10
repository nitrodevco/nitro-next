/**
 * The banner a group's base room shows - `GroupRoomInfoCtrl`: `group_room_info`. Flash docks it in
 * the toolbar's extension column before the quest timer, the quest tracker and the event card
 * (`attachExtension("room_group_info", ..., -1, ["next_quest_timer", "quest_tracker",
 * "event_info_window"])` inserts it at the first of those); here it is a child of that same column.
 *
 * `refresh`: expanded, the card's background, the group's name and badge, the info region and the
 * join, request or manage button the group allows; collapsed, the title bar alone. The window is as
 * tall as the background it shows. A click on the title toggles it; on the info region, the group's
 * details; join disables its button until the next details answer re-enables it.
 */
import { IHabboGroupDetails, isGuildJoiningAllowed, isGuildMembershipRequestAllowed } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useConfigValue } from '#base/context/system';
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

export interface GroupRoomInfoViewProps {
    details: IHabboGroupDetails;
    /** `_expanded`: the whole card, or the title bar alone. */
    expanded: boolean;
    onToggle: () => void;
    onInfo: () => void;
    onJoin: () => void;
    onManage: () => void;
}

export const GroupRoomInfoView = ({ details, expanded, onToggle, onInfo, onJoin, onManage }: GroupRoomInfoViewProps) => {
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';

    // `onJoin` disables the button and every `refresh` enables it, so a new details answer brings it back.
    const [ joinSentFor, setJoinSentFor ] = useState<IHabboGroupDetails | undefined>(undefined);

    if (joinSentFor && (joinSentFor !== details)) setJoinSentFor(undefined);

    /** `_window.height`: the shown background's. */
    const arrange = ({ find, root }: TemplateWindows) => {
        const background = find(expanded ? 'bg_expanded' : 'bg_contracted');

        if (background) root()?.setHeight(background.height);
    };

    return (
        // 2 below what is over it, `extension_grid`'s spacing.
        <Box layout={{ marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-groups-com/group_room_info"
                arrange={arrange}
                bindings={{
                    bg_expanded: { visible: expanded },
                    bg_contracted: { visible: !expanded },
                    title_region: { onPointerTap: onToggle },
                    info_region: { visible: expanded, onPointerTap: onInfo },
                    group_name_txt: { visible: expanded, caption: details.groupName },
                    group_logo: { visible: expanded, asset: details.badgeCode ? groupBadgeUrl.replace('%badgedata%', details.badgeCode) : undefined },
                    join_button: {
                        visible: expanded && isGuildJoiningAllowed(details),
                        disabled: joinSentFor === details,
                        onPointerTap: () => {
                            setJoinSentFor(details);
                            onJoin();
                        },
                    },
                    request_membership_button: { visible: expanded && isGuildMembershipRequestAllowed(details), onPointerTap: onJoin },
                    manage_button: { visible: expanded && details.isOwner, onPointerTap: onManage },
                }}
            />
        </Box>
    );
};
