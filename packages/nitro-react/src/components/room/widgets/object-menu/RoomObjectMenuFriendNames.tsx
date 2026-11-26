/**
 * The green name tags over friends - `AvatarInfoWidget.showUserName` and its `_avatarNameBubbles`.
 *
 * A user who is on the friend list when they come into the room - or is there already when you do
 * (`onRoomObjectAdded`, and `AvatarInfoWidgetHandler`'s `rsudue_user_data_updated`) - gets a
 * `UserNameView` over the head: the name bubble in `UserNameView.DEFAULT_BG_COLOR`, with the
 * friend's relationship icon, up for `DEFAULT_FADE_DELAY_MS` before it fades. It is shown once for
 * each time they come in: somebody befriended while both are in the room gets none, as Flash only
 * asks when the unit is added. It goes when the friend leaves (`onRoomObjectRemoved`) and when their
 * menu opens (`updateUserView`).
 *
 * `showGamePlayerName`, the same view over a game's players, is not ported.
 */
import { IRoomUserData, RoomObjectCategoryEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoomStore } from '#base/context/room';
import { useUserStore } from '#base/context/user';
import { InfoBubbleNameView } from '#base/views/room-widgets/object-menu/InfoBubbleNameView';
import { RELATIONSHIP_ICONS } from '#base/views/room-widgets/object-menu/useAvatarMenu';

import { RoomObjectMenuBubble } from './RoomObjectMenuBubble';

/** `UserNameView.DEFAULT_BG_COLOR` (4288528218). */
const FRIEND_NAME_COLOR = 0xFF9DBF5A;
/** `UserNameView.DEFAULT_FADE_DELAY_MS`. */
const FRIEND_NAME_FADE_DELAY_MS = 8000;

type RoomObjectMenuFriendNamesProps = {
    /** The other user whose menu is being set up (`AvatarMenuView`): their tag is taken down. */
    menuObjectId?: number;
};

/** The tags after this render's units: the same object while nothing changed. */
const reconcileTags = (tagged: Record<number, boolean>, users: Record<number, IRoomUserData>, friends: Record<number, unknown>, menuObjectId: number | undefined) => {
    const next = { ...tagged };
    let changed = false;

    for (const user of Object.values(users)) {
        if (user.objectId in tagged) continue;

        next[user.objectId] = (user.userType === RoomObjectUserType.User) && !!friends[user.webID];
        changed = true;
    }

    for (const key of Object.keys(tagged)) {
        const objectId = Number(key);

        if (!users[objectId]) {
            delete next[objectId];
            changed = true;
        } else if (tagged[objectId] && (objectId === menuObjectId)) {
            next[objectId] = false;
            changed = true;
        }
    }

    return changed ? next : tagged;
};

export const RoomObjectMenuFriendNames = ({ menuObjectId = undefined }: RoomObjectMenuFriendNamesProps) => {
    const users = useRoomStore(x => x.usersByRoomObjectId);
    const friends = useUserStore(x => x.friends);
    // Every unit seen so far, by room object id: whether it still wears its tag.
    const [ tagged, setTagged ] = useState<Record<number, boolean>>({});

    // Adjusted while rendering: a unit new to the room is asked about once, one gone is forgotten.
    const next = reconcileTags(tagged, users, friends, menuObjectId);

    if (next !== tagged) setTagged(next);

    return (
        <>
            {Object.values(users).map((user) => {
                if (!next[user.objectId]) return null;

                return (
                    <RoomObjectMenuBubble
                        key={user.objectId}
                        objectData={{ objectId: user.objectId, category: RoomObjectCategoryEnum.Unit }}
                        userType={RoomObjectUserType.User}
                        fades={true}
                        fadeDelay={FRIEND_NAME_FADE_DELAY_MS}
                        keepOnScreen={false}
                        onClose={() => setTagged(x => (x[user.objectId] ? { ...x, [user.objectId]: false } : x))}
                    >
                        <InfoBubbleNameView
                            nameData={{ id: user.webID, objectId: user.objectId, category: RoomObjectCategoryEnum.Unit, name: user.name, userType: user.userType }}
                            color={FRIEND_NAME_COLOR}
                            relationshipIcon={RELATIONSHIP_ICONS[Number(friends[user.webID]?.relationshipType ?? 0)]}
                        />
                    </RoomObjectMenuBubble>
                );
            })}
        </>
    );
};
