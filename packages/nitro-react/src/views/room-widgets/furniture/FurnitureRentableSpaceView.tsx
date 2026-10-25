import { useTranslation } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

/**
 * A rentable space - `RentableSpaceDisplayWidget`, which builds
 * `habbo-room-ui-com/rentablespace_xml` and centres it (`createWindow`). `populateRentInfo` shows
 * one of its two item lists:
 *
 * - `rent_view` while the space is free: `price_label` reads `"<price> x"`; `cant_rent_error` says
 *   why it may not be rented (the server's code) or that you cannot afford it (200), and otherwise
 *   hides while `rent_button` is enabled.
 * - `rented_view` while it is held: `renter_name`, `time_remaining_label` (`FriendlyTime` of what
 *   is left) and `cancel_rent_button` for the furni's owner and moderators
 *   (`isOwnerOfFurniture || hasSecurity(MODERATOR)`, worked out by the widget).
 *
 * `rent_button` rents and `cancel_rent_button` cancels (`windowProcedure`); the header close closes.
 * Not here: `error_view`, which `showErrorView` raises for a failed rent - the handler answers a
 * failure by asking for the status again, so the widget never holds an error to show.
 */
export interface FurnitureRentableSpaceViewProps {
    rented: boolean;
    /** Whether the rented view offers `cancel_rent_button`: the space's owner, or staff. */
    canCancelRent: boolean;
    canRent: boolean;
    /** Zero while it can be rented; otherwise the server's reason. */
    canRentErrorCode: number;
    /** `price <= getUsersCreditAmount()`. */
    canAfford: boolean;
    renterName: string;
    /** Seconds left on the rent. */
    timeRemaining: number;
    price: number;
    onRent: () => void;
    onCancelRent: () => void;
    onClose: () => void;
}

/** `RentableSpaceDisplayWidget.errorCodesToMessages`: the server's reason code -> its text. */
const RENT_ERROR_MESSAGES: Record<number, string> = {
    100: '${rentablespace.widget.error_reason_already_rented}',
    101: '${rentablespace.widget.error_reason_not_rented}',
    102: '${rentablespace.widget.error_reason_not_rented_by_you}',
    103: '${rentablespace.widget.error_reason_can_rent_only_one_space}',
    200: '${rentablespace.widget.error_reason_not_enough_credits}',
    201: '${rentablespace.widget.error_reason_not_enough_duckets}',
    202: '${rentablespace.widget.error_reason_no_permission}',
    203: '${rentablespace.widget.error_reason_no_habboclub}',
    300: '${rentablespace.widget.error_reason_disabled}',
    400: '${rentablespace.widget.error_reason_generic}',
};
/** `errorCodesToMessages[200]` - what a space you cannot afford says. */
const NOT_ENOUGH_CREDITS = 200;

export const FurnitureRentableSpaceView = ({
    rented, canCancelRent, canRent, canRentErrorCode, canAfford, renterName, timeRemaining, price, onRent, onCancelRent, onClose,
}: FurnitureRentableSpaceViewProps) => {
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'furniture-rentable-space', centered: true, rememberPosition: false, onClose });
    const errorCode = !canRent ? canRentErrorCode : (!canAfford ? NOT_ENOUGH_CREDITS : undefined);

    return (
        <TemplateWindow
            id="habbo-room-ui-com/rentablespace_xml"
            frame={frame}
            bindings={{
                rent_view: { visible: !rented },
                price_label: { caption: `${price} x` },
                cant_rent_error: { visible: errorCode !== undefined, caption: (errorCode === undefined) ? undefined : (RENT_ERROR_MESSAGES[errorCode] ?? '') },
                rent_button: { disabled: errorCode !== undefined, onPointerTap: (errorCode === undefined) ? onRent : undefined },
                rented_view: { visible: rented },
                renter_name: { caption: renterName },
                time_remaining_label: { caption: GetFriendlyTime(t, timeRemaining) },
                cancel_rent_button: { visible: canCancelRent, onPointerTap: onCancelRent },
            }}
        />
    );
};
