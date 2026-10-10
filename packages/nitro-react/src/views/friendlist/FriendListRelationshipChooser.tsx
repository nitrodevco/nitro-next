import { MessengerFriendRelationType } from '@nitrodevco/nitro-packets';

import { setRelationship } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { FloatingPopup, TemplateBindings, TemplateWindow } from '#base/theme';

/** `RelationshipStatusSelector.onWindowEvent`: the status each item sets. */
const ITEMS = {
    item_none: MessengerFriendRelationType.Zero,
    item_heart: MessengerFriendRelationType.One,
    item_smile: MessengerFriendRelationType.Two,
    item_bobba: MessengerFriendRelationType.Three,
} as const;

export interface FriendListRelationshipChooserProps {
    friendId: number;
    /** The relationship region's global position (`appearAt`). */
    x: number;
    y: number;
    onClose: () => void;
}

/**
 * `RelationshipStatusSelector` - the `relationship_chooser` window built on the desktop at the
 * friend's relationship region (`appearAt`). An item sets the friend's status
 * (`HabboFriendList.setRelationshipStatus`) and closes it; losing the focus closes it too.
 */
export const FriendListRelationshipChooser = ({ friendId, x, y, onClose }: FriendListRelationshipChooserProps) => {
    const { send } = useWebSocketContext();

    const bindings: TemplateBindings = Object.fromEntries(Object.entries(ITEMS).map(([ name, status ]) => [ name, {
        onPointerTap: () => {
            setRelationship(send, friendId, status);
            onClose();
        },
    } ]));

    return (
        <FloatingPopup
            x={x}
            y={y}
            onOutsideClick={onClose}
        >
            <TemplateWindow
                id="habbo-friend-list-com/relationship_chooser_xml"
                bindings={bindings}
            />
        </FloatingPopup>
    );
};
