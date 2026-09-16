import { useTranslation } from '#base/context';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureRentableSpaceViewProps {
    rented: boolean;
    /** Whether the space is yours, which is what turns renting into cancelling. */
    isOwnRent: boolean;
    canRent: boolean;
    /** Zero while it can be rented; otherwise the server's reason. */
    canRentErrorCode: number;
    renterName: string;
    /** Seconds left on the rent. */
    timeRemaining: number;
    price: number;
    onRent: () => void;
    onCancelRent: () => void;
    onClose: () => void;
}

/**
 * A rentable space, on the `rentablespace` layout (256x224). It says who holds the space and
 * for how much longer, and offers the one thing you can do about it: take it if it is free,
 * give it up if it is yours.
 */
export const FurnitureRentableSpaceView = ({
    rented, isOwnRent, canRent, canRentErrorCode, renterName, timeRemaining, price, onRent, onCancelRent, onClose,
}: FurnitureRentableSpaceViewProps) => {
    const t = useTranslation();
    const hours = Math.max(0, Math.floor(timeRemaining / 3600));
    const minutes = Math.max(0, Math.floor((timeRemaining % 3600) / 60));

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
                {!rented && !canRent && (
                    <ThemeText
                        text={t(`rentablespace.widget.error.${canRentErrorCode}`, '')}
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
                                disabled={rented || !canRent}
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
