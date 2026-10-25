import { TemplateWindow } from '#base/theme';

/**
 * Sealing a lock takes both people, so each is asked in turn, on the
 * `habbo-room-ui-com/lock_confirm_xml` layout (309x198) that
 * `FriendFurniConfirmWidget.createWindow` builds and centres.
 *
 * `FriendFurniConfirmWidget.open` sets `other_locked_container`'s height to 0 for a non-owner - the
 * `top_list` item list shrinks to its items and the frame with it; for the owner it keeps the
 * container and hides `message`. `otherConfirmed` puts `locked_image` in `lock` and shows the message.
 * The close button and `cancel_button` answer no, `confirm_button` yes (`windowProcedure`).
 */
export interface FurnitureLockConfirmViewProps {
    /** `FriendFurniStartConfirmationMessage.isOwner`: only the owner is shown the lock and the other's answer. */
    isOwner: boolean;
    /** Set once the other half has agreed and the lock is only waiting on you. */
    otherLocked: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const FurnitureLockConfirmView = ({ isOwner, otherLocked, onConfirm, onCancel }: FurnitureLockConfirmViewProps) => (
    <TemplateWindow
        id="habbo-room-ui-com/lock_confirm_xml"
        frame={{ id: 'lock_confirm', centered: true, rememberPosition: false, onClose: onCancel }}
        bindings={{
            lock: { asset: `\${image.library.url}furniextras/${otherLocked ? 'locked_image' : 'unlocked_image'}.png` },
            message: { visible: !isOwner || otherLocked },
            cancel_button: { onPointerTap: onCancel },
            confirm_button: { onPointerTap: onConfirm },
        }}
        arrange={({ find }) => {
            if (!isOwner) find('other_locked_container')?.setHeight(0);
        }}
    />
);
