import { useTranslation } from '#base/context/system';
import { Button, ContainerButton, Frame, Icon, ReflectResize, Region, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

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
 * A rentable space, on the `rentablespace` layout: a style 3 frame tinted `0x67a3bf` (256x224,
 * margins 1, 30, 5, 0) that `RentableSpaceDisplayWidget.createWindow` centres. It says who holds
 * the space and for how much longer, and offers the one thing you can do about it: take it if it
 * is free, give it up if it is yours.
 *
 * `populateRentInfo` shows one of two item lists at (2, 4), each carrying
 * `reflect_vertical_resize_to_parent`, so the frame grows by whatever the shown list outgrows its
 * layout height by:
 *
 * - `rent_view` (10px spacing, never under 216): the instructions; the `rent_button`, a
 *   `container_button` sized to its row of `"<price> x"`, the credit icon (style 10) and
 *   `${rentablespace.widget.rent}`, and disabled unless the space may be rented and you can afford
 *   it; `cant_rent_error` when it may not (the server's code) or you cannot afford it (200); and
 *   the HC icon (style 15).
 * - `rented_view` (5px spacing): who rents it, `FriendlyTime` of what is left, and
 *   `cancel_rent_button` for the one who may cancel.
 *
 * Not here: `error_view`, which `showErrorView` raises for a failed rent - the handler answers a
 * failure by asking for the status again, so the widget never holds an error to show. Flash
 * offers the cancel button to the furni's owner and to moderators (`isOwnerOfFurniture ||
 * hasSecurity(MODERATOR)`); the widget passes whether you are the renter.
 */
export const FurnitureRentableSpaceView = ({
    rented, isOwnRent, canRent, canRentErrorCode, canAfford, renterName, timeRemaining, price, onRent, onCancelRent, onClose,
}: FurnitureRentableSpaceViewProps) => {
    const t = useTranslation();
    const errorCode = !canRent ? canRentErrorCode : (!canAfford ? NOT_ENOUGH_CREDITS : undefined);
    const errorKey = (errorCode === undefined) ? undefined : RENT_ERROR_MESSAGES[errorCode];

    return (
        <Frame
            variant="3"
            id="furniture-rentable-space"
            caption={t('rentablespace.widget.title')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 1, 30, 5, 0 ]}
            layout={{ position: 'absolute', width: 256, height: 224 }}
        >
            {!rented && (
                <ReflectResize
                    height={216}
                    layout={{ position: 'absolute', left: 2, top: 4, minWidth: 243, minHeight: 216, flexDirection: 'column', gap: 10 }}
                >
                    <Region layout={{ width: 241, marginLeft: 1, flexShrink: 0, paddingLeft: 5, paddingTop: 5, paddingRight: 5 }}>
                        <ThemeText
                            text={t('rentablespace.widget.instructions')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 227 }}
                            verticalAlign="top"
                        />
                    </Region>
                    <ContainerButton
                        variant="3"
                        disabled={errorCode !== undefined}
                        onPointerTap={onRent}
                        layout={{ height: 44, flexShrink: 0, alignSelf: 'flex-start' }}
                    >
                        <Region layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
                            <Region layout={{ marginTop: 11, flexShrink: 0, paddingLeft: 10 }}>
                                <ThemeText
                                    text={`${price} x`}
                                    textStyle="u_headline_medium"
                                    verticalAlign="top"
                                />
                            </Region>
                            <Icon
                                variant="10"
                                layout={{ width: 28, height: 24, marginTop: 10, flexShrink: 0 }}
                            />
                            <Region layout={{ marginTop: 11, flexShrink: 0, paddingRight: 10 }}>
                                <ThemeText
                                    text={t('rentablespace.widget.rent')}
                                    textStyle="u_headline_medium"
                                    verticalAlign="top"
                                />
                            </Region>
                        </Region>
                    </ContainerButton>
                    {errorKey && (
                        <Region layout={{ width: 245, height: 40, marginLeft: 1, flexShrink: 0, paddingLeft: 5, overflow: 'hidden' }}>
                            <ThemeText
                                text={t(errorKey, '')}
                                textStyle="u_bold"
                                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 236 }}
                                verticalAlign="top"
                            />
                        </Region>
                    )}
                    <Icon
                        variant="15"
                        layout={{ width: 37, height: 40, marginLeft: 209, flexShrink: 0 }}
                    />
                </ReflectResize>
            )}
            {rented && (
                <ReflectResize
                    height={97}
                    layout={{ position: 'absolute', left: 2, top: 4, flexDirection: 'column', gap: 5 }}
                >
                    <Region layout={{ flexShrink: 0, paddingLeft: 10, paddingTop: 10 }}>
                        <ThemeText
                            text={t('rentablespace.widget.rented_to_label')}
                            textStyle="u_headline_small"
                            verticalAlign="top"
                        />
                    </Region>
                    <Region layout={{ flexShrink: 0, paddingLeft: 10, paddingRight: 5 }}>
                        <ThemeText
                            text={renterName}
                            textStyle="u_italic"
                            verticalAlign="top"
                        />
                    </Region>
                    <Region layout={{ flexShrink: 0, paddingLeft: 10 }}>
                        <ThemeText
                            text={t('rentablespace.widget.expires_label')}
                            textStyle="u_headline_small"
                            verticalAlign="top"
                        />
                    </Region>
                    <Region layout={{ flexShrink: 0, paddingLeft: 10 }}>
                        <ThemeText
                            text={GetFriendlyTime(t, timeRemaining)}
                            textStyle="u_italic"
                            verticalAlign="top"
                        />
                    </Region>
                    {isOwnRent && (
                        <Button
                            variant="3"
                            onPointerTap={onCancelRent}
                            layout={{ width: 204, height: 30, marginLeft: 20, flexShrink: 0 }}
                        >
                            {t('rentablespace.widget.cancel_rent')}
                        </Button>
                    )}
                </ReflectResize>
            )}
        </Frame>
    );
};
