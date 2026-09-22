import { useTranslation } from '#base/context/system';
import { ButtonThick, Frame, ReflectResize, Region, ThemeText } from '#base/theme';

export interface FurnitureRoomLinkViewProps {
    roomName: string;
    ownerName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/** `_alert_description`'s layout rect: `height_min` 72, and `reflect_vertical_resize_to_parent`. */
const DESCRIPTION = { left: 16, top: 14, width: 253, height: 72 } as const;

/**
 * Where a room-link teleport goes, asked before it takes you there:
 * `FurnitureRoomLinkHandler.onRoomInfo`, which raises `windowManager.confirm` with ok and cancel
 * (`0x10 | 0x20`). Flash filled the two names into its message with `%%room_name%%` and
 * `%%room_owner%%` - two per cent signs, not the client's usual one - so the substitution is done
 * here rather than through the translator.
 *
 * `ConfirmDialog` on `habbo_window_confirm` (300x165), centred: a style 3 frame tinted `0x418db0`
 * (margins 6, 25, 6, 7), the `u_regular` description at (16, 14) - `auto_size` left, never under
 * its 72px `height_min`, and reflecting its growth on to the window - the underlined
 * `${generic.cancel}` link and the `${generic.ok}` `button_thick`, both anchored to the bottom.
 * The header's close button cancels, as `_alert_button_cancel` does.
 */
export const FurnitureRoomLinkView = ({ roomName, ownerName, onConfirm, onCancel }: FurnitureRoomLinkViewProps) => {
    const t = useTranslation();

    const message = t('room.link.confirmation.message', '')
        .replace('%%room_name%%', roomName)
        .replace('%%room_owner%%', ownerName);

    return (
        <Frame
            variant="3"
            id="furniture-room-link"
            caption={t('room.link.confirmation.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 300, height: 165 }}
        >
            <ReflectResize
                height={DESCRIPTION.height}
                layout={{ position: 'absolute', left: DESCRIPTION.left, top: DESCRIPTION.top, width: DESCRIPTION.width, minHeight: DESCRIPTION.height }}
            >
                <ThemeText
                    text={message}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: DESCRIPTION.width - 4 }}
                    verticalAlign="top"
                />
            </ReflectResize>
            <Region
                cursor="pointer"
                onPointerTap={onCancel}
                layout={{ position: 'absolute', left: 20, width: 100, bottom: 14, flexDirection: 'row', justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('generic.cancel')}
                    textStyle="u_regular"
                    flashFormat={{ underline: true }}
                    verticalAlign="top"
                />
            </Region>
            <ButtonThick
                variant="3"
                tintColor="#efefef"
                onPointerTap={onConfirm}
                layout={{ position: 'absolute', left: 196, bottom: 7, minWidth: 50, height: 28 }}
            >
                {t('generic.ok')}
            </ButtonThick>
        </Frame>
    );
};
