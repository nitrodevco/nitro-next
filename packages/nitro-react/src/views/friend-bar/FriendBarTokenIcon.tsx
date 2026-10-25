/**
 * A notification token's icon on a friend's tab - the window `Token.prepare` makes in code rather than
 * from a layout: a 25x25 region (`ICON_<type>`, `Token.ICON_RECTANGLE`) holding a static bitmap of the
 * token's art, which drops in when it is made (`DropBounce(icon, 600, 32)`). Pressing it is the tab's
 * own `onMouseClick`.
 */
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useTween } from '#base/hooks';
import { LayoutImage, Region, ThemeImage } from '#base/theme';

/** `Token.ICON_RECTANGLE`. */
export const TOKEN_ICON_SIZE = 25;
/** `Token.prepare`'s `DropBounce(_icon, 600, 32)`. */
const DROP_MS = 600;
const DROP_HEIGHT = 32;

/** `FriendNotification.TYPE_PLAYING_GAME`: the one token whose icon is the game's. */
export const GAME_TOKEN_TYPE = 3;

/** `DropBounce.getBounceOffset`: the classic bounce ease-out. */
const bounceOffset = (progress: number): number => {
    if (progress < 0.364) return 7.5625 * progress * progress;

    if (progress < 0.727) {
        const p = progress - 0.545;

        return (7.5625 * p * p) + 0.75;
    }

    if (progress < 0.909) {
        const p = progress - 0.9091;

        return (7.5625 * p * p) + 0.9375;
    }

    const p = progress - 0.955;

    return (7.5625 * p * p) + 0.984375;
};

const linear = (progress: number) => progress;

/**
 * The icons that have dropped in already, by friend, tag and message: Flash's icon is one window that
 * drops once when its token is made, while a tab here is drawn afresh as the bar repopulates, so an
 * icon only drops the first time it is drawn.
 */
const droppedIcons = new Set<string>();

interface FriendBarTokenIconProps {
    typeCode: number;
    dropKey: string;
    onPress: (event: FederatedPointerEvent) => void;
}

export const FriendBarTokenIcon = ({ typeCode, dropKey, onPress }: FriendBarTokenIconProps) => {
    const [ dropped ] = useState(() => droppedIcons.has(dropKey));
    const progress = useTween(1, DROP_MS, linear, dropped ? 1 : 0);

    useEffect(() => {
        droppedIcons.add(dropKey);
    }, [ dropKey ]);

    const src = (typeCode === GAME_TOKEN_TYPE)
        ? 'habbo-window-manager-com/game_center_snowball_notification_icon.png'
        : 'habbo-window-manager-com/friend_bar_event_notification_icon.png';

    return (
        <Region
            name={`ICON_${typeCode}`}
            cursor="pointer"
            onPointerTap={onPress}
            layout={{ position: 'relative', top: -DROP_HEIGHT + (bounceOffset(progress) * DROP_HEIGHT), width: TOKEN_ICON_SIZE, height: TOKEN_ICON_SIZE, flexShrink: 0 }}
        >
            <ThemeImage
                name={`BITMAP_${typeCode}`}
                src={LayoutImage(src)}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 0, top: 0, width: TOKEN_ICON_SIZE, height: TOKEN_ICON_SIZE }}
            />
        </Region>
    );
};
