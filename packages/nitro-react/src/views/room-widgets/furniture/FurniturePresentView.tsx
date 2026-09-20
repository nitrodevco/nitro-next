import { useTranslation } from '#base/context/system';
import { Border, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

export interface FurniturePresentViewProps {
    message: string;
    purchaserName: string;
    /** A gift from staff: green banner and the staff card. Anyone else gets the red warning. */
    trustedSender: boolean;
    /** The product's name once the server has said what was inside; closed until then. */
    openedProduct: string | undefined;
    canOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

/**
 * A wrapped gift, before and after, on the `packagecard_new` layout: a gift card carrying the
 * sender's note, and the button that opens it. When the server says what was inside, the same
 * window shows the reveal, which is how the Flash client paired `packagecard_new` with
 * `packagecard_new_opened`.
 *
 * The banner above the card is `packagecard_new`'s `warning` row, which `PresentFurniWidget`
 * recolours for an untrusted sender. Its text is `id_regular` forced bold in the layout; the
 * theme has no 11px bold style without an underline, so it uses the 10px `id_heading_3`.
 */
export const FurniturePresentView = ({ message, purchaserName, trustedSender, openedProduct, canOpen, onOpen, onClose }: FurniturePresentViewProps) => {
    const t = useTranslation();
    const isOpened = openedProduct !== undefined;

    return (
        <Frame
            variant="3"
            id="furniture-present"
            caption={t('widget.furni.present.window.title')}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 60 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 334, height: isOpened ? 250 : 316 }}
        >
            <Region layout={{ flexDirection: 'column', gap: 10, alignItems: 'center', paddingTop: 10 }}>
                {!isOpened && (
                    <Border
                        variant="3"
                        tintColor="#000000"
                        layout={{ width: 306, height: 56, flexShrink: 0, padding: 3 }}
                    >
                        <Border
                            variant="3"
                            tintColor={trustedSender ? '#186e09' : '#b1004c'}
                            layout={{ width: 300, height: 50 }}
                        >
                            <ThemeImage
                                src={LayoutImage(trustedSender ? 'room-ui/catalogue_ui2_checkmark_m.png' : 'room-ui/catalogue_icon_alert_s.png')}
                                layout={trustedSender
                                    ? { position: 'absolute', left: 20, top: 13, width: 30, height: 24 }
                                    : { position: 'absolute', left: 22, top: 12, width: 26, height: 26 }}
                            />
                            <ThemeText
                                text={trustedSender ? t('gift.trusted.banner.text') : t('gift.untrusted.banner.text', '', { name: purchaserName })}
                                textStyle="text-style-id-heading-3"
                                textOptions={{ wordWrap: true, wordWrapWidth: 235 }}
                                layout={{ position: 'absolute', left: 65, top: 10, width: 235, height: 30 }}
                            />
                        </Border>
                    </Border>
                )}
                <Region layout={{ width: 306, height: 149, flexShrink: 0 }}>
                    <ThemeImage
                        src={LayoutImage((trustedSender && !isOpened) ? 'room-ui/catalogue_giftcard_staff.png' : 'shared/catalogue_giftcard_blank.png')}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 306, height: 149 }}
                    />
                    <ThemeText
                        text={isOpened ? t('widget.furni.present.message_opened', '', { product: openedProduct }) : message}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 95, top: 31, width: 190, height: 100 }}
                    />
                    {!isOpened && !!purchaserName && (
                        <ThemeText
                            text={t('widget.furni.present.message_from', '', { name: purchaserName })}
                            textStyle="text-style-u-italic"
                            textOptions={{ align: 'right' }}
                            layout={{ position: 'absolute', left: 95, top: 118, width: 190, height: 12 }}
                        />
                    )}
                    {isOpened && (
                        <ThemeText
                            text={t('widget.furni.present.instructions')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                            layout={{ position: 'absolute', left: 95, top: 118, width: 190, height: 24 }}
                        />
                    )}
                </Region>
                {!isOpened && canOpen && (
                    <ButtonThick
                        variant="5"
                        tintColor="#00aa00"
                        onPointerTap={onOpen}
                        layout={{ width: 206, height: 28, flexShrink: 0 }}
                    >
                        {t('widget.furni.present.open_gift')}
                    </ButtonThick>
                )}
                {isOpened && (
                    <ButtonThick
                        variant="5"
                        onPointerTap={onClose}
                        layout={{ width: 206, height: 28, flexShrink: 0 }}
                    >
                        {t('widget.furni.present.close')}
                    </ButtonThick>
                )}
            </Region>
        </Frame>
    );
};
