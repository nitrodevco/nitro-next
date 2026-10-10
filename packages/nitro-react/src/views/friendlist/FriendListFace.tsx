import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { AVATAR_FACE_SIZE, AvatarFaceImage } from '#base/components';
import { useConfigValue } from '#base/context/system';
import { Box } from '#base/theme';
import { GroupBadgeImage } from '#base/views/shared/GroupBadgeImage';

/** The `face` bitmap's 20x20 slot (`focusUserFace(..., 20, 20)`). */
const FACE_SIZE = 20;

export interface FriendListFaceProps {
    figure: string;
    gender?: AvatarGenderType;
    /** A group chat's entry (`Friend.isGroupFriend`): its `figure` is the group's badge code. */
    groupBadge?: boolean;
}

/**
 * What `refreshFigure` copies into an entry's `face` bitmap. `HabboFriendList.getAvatarFaceBitmap`
 * is `HabboFaceFocuser.focusUserFace(image, "head", 2, scale, 20, 20)` of the `h` head at half size
 * with `zoom.enabled` (`sh` at full size without): the face box copied into a 20x20 bitmap at
 * `(0, (20 - box) / 2)`, cut to it. A group friend's is `getSmallGroupBadgeBitmap`, here the badge
 * at half size.
 */
export const FriendListFace = ({ figure, gender = AvatarGenderType.Unisex, groupBadge = false }: FriendListFaceProps) => {
    const zoom = useConfigValue<boolean>('zoom.enabled') === true;
    const scale = zoom ? 0.5 : 1;

    if (groupBadge) {
        return (
            <GroupBadgeImage
                badgeCode={figure}
                zoom={0.5}
                layout={{ position: 'absolute', left: 0, top: 0, width: FACE_SIZE, height: FACE_SIZE }}
            />
        );
    }

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: FACE_SIZE, height: FACE_SIZE, overflow: 'hidden' }}>
            <AvatarFaceImage
                figure={figure}
                gender={gender}
                direction={2}
                scale={scale}
                layout={{ position: 'absolute', left: 0, top: Math.trunc((FACE_SIZE - (AVATAR_FACE_SIZE * scale)) / 2) }}
            />
        </Box>
    );
};
