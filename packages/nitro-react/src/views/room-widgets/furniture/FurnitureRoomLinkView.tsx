import { useTranslation } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

/**
 * Where a room-link teleport goes, asked before it takes you there:
 * `FurnitureRoomLinkHandler.onRoomInfo`, which raises `windowManager.confirm` with ok and cancel
 * (`0x10 | 0x20`). Flash filled the two names into its message with `%%room_name%%` and
 * `%%room_owner%%` - two per cent signs, not the client's usual one - so the substitution is done
 * here rather than through the translator.
 *
 * `ConfirmDialog` on `habbo-window-manager-com/habbo_window_confirm_xml`, centred: the title is the
 * frame's caption, the message `DESCRIPTION`'s text, set once the window is built so that its
 * growth past `height_min` reaches the frame (`reflect_vertical_resize_to_parent`);
 * `_alert_button_ok` confirms, and `_alert_button_cancel` and the header's close cancel.
 */
export interface FurnitureRoomLinkViewProps {
    roomName: string;
    ownerName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const FurnitureRoomLinkView = ({ roomName, ownerName, onConfirm, onCancel }: FurnitureRoomLinkViewProps) => {
    const t = useTranslation();

    const message = t('room.link.confirmation.message', '')
        .replace('%%room_name%%', roomName)
        .replace('%%room_owner%%', ownerName);

    return (
        <TemplateWindow
            id="habbo-window-manager-com/habbo_window_confirm_xml"
            frame={{ id: 'furniture-room-link', centered: true, rememberPosition: false, onClose: onCancel }}
            bindings={{
                '': { caption: t('room.link.confirmation.title') },
                '#DESCRIPTION': { caption: message, setCaptionAfterBuild: true },
                _alert_button_ok: { onPointerTap: onConfirm },
                _alert_button_cancel: { onPointerTap: onCancel },
            }}
        />
    );
};
