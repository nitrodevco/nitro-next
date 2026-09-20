import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureRentableSpaceViewProps {
    rented: boolean;
    /** Whether the space is yours, which is what turns renting into cancelling. */
    isOwnRent: boolean;
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
    100: 'rentablespace.widget.error_reason_already_rented',
    101: 'rentablespace.widget.error_reason_not_rented',
    102: 'rentablespace.widget.error_reason_not_rented_by_you',
    103: 'rentablespace.widget.error_reason_can_rent_only_one_space',
    200: 'rentablespace.widget.error_reason_not_enough_credits',
    201: 'rentablespace.widget.error_reason_not_enough_duckets',
    202: 'rentablespace.widget.error_reason_no_permission',
    203: 'rentablespace.widget.error_reason_no_habboclub',
    300: 'rentablespace.widget.error_reason_disabled',
    400: 'rentablespace.widget.error_reason_generic',
};
/** `errorCodesToMessages[200]` - what a space you cannot afford says. */
const NOT_ENOUGH_CREDITS = 200;

/**
 * A rentable space, on the `rentablespace` layout (256x224). It says who holds the space and
 * for how much longer, and offers the one thing you can do about it: take it if it is free,
 * give it up if it is yours.
 *
 * `RentableSpaceDisplayWidget.populateView`: a space that may not be rented says why
 * (`cant_rent_error`, the server's code); one that may but costs more than your credits says
 * "not enough credits"; only otherwise is the rent button enabled.
 */
export const FurnitureRentableSpaceView = ({
    rented, isOwnRent, canRent, canRentErrorCode, canAfford, renterName, timeRemaining, price, onRent, onCancelRent, onClose,
}: FurnitureRentableSpaceViewProps) => {
    const t = useTranslation();
    const hours = Math.max(0, Math.floor(timeRemaining / 3600));
    const minutes = Math.max(0, Math.floor((timeRemaining % 3600) / 60));
    const errorCode = !canRent ? canRentErrorCode : (!canAfford ? NOT_ENOUGH_CREDITS : undefined);
    const errorKey = (errorCode === undefined) ? undefined : RENT_ERROR_MESSAGES[errorCode];

    return (
        <Frame
            variant="0"
            id="furniture-rentable-space"
            caption={t('rentablespace.widget.title')}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 100 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 256, height: 224 }}
        >
            <Border layout={{ flex: 1, flexDirection: 'column', gap: 6, padding: 6 }}>
                {rented
                    ? (
                            <>
                                <ThemeText
                                    text={t('rentablespace.widget.rented_to_label')}
                                    textStyle="text-style-bold"
                                />
                                <ThemeText text={renterName} />
                                <ThemeText
                                    text={t('rentablespace.widget.expires_label')}
                                    textStyle="text-style-bold"
                                />
                                <ThemeText text={`${hours}h ${minutes}m`} />
                            </>
                        )
                    : (
                            <ThemeText
                                text={t('rentablespace.widget.instructions')}
                                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 241 }}
                                verticalAlign="top"
                                layout={{ flex: 1 }}
                            />
                        )}
                {!rented && errorKey && (
                    <ThemeText
                        text={t(errorKey, '')}
                        textOptions={{ fill: '#aa0000', wordWrap: true, wordWrapWidth: 241 }}
                        verticalAlign="top"
                    />
                )}
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3 }}>
                {isOwnRent
                    ? (
                            <Button
                                onPointerTap={onCancelRent}
                                layout={{ width: 204, height: 30 }}
                            >
                                {t('rentablespace.widget.cancel_rent')}
                            </Button>
                        )
                    : (
                            <Button
                                disabled={rented || (errorCode !== undefined)}
                                onPointerTap={onRent}
                                layout={{ width: 204, height: 30 }}
                            >
                                {`${t('rentablespace.widget.rent')} ${price}`}
                            </Button>
                        )}
            </Box>
        </Frame>
    );
};
