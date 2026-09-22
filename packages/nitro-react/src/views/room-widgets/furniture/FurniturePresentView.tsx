import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { Border, Button, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

export interface FurniturePresentViewProps {
    message: string;
    purchaserName: string;
    /** The sender's figure, whose head the card shows beside the note. */
    purchaserFigure: string;
    /** A gift from staff: green banner and the staff card. Anyone else gets the red warning. */
    trustedSender: boolean;
    /** `open_gift_button`: the gift is the viewer's own (`controller`). */
    canOpen: boolean;
    /** `give_gift_button`: the viewer's own gift, from a known sender. */
    canGiveGift: boolean;
    onOpen: () => void;
    onGiveGift: () => void;
    onClose: () => void;
}

/** `packagecard_new`'s `element_list`: its items, 10px apart, from 10px into the content. */
const LIST_SPACING = 10;
const WARNING_HEIGHT = 56;
const GIFT_CARD_HEIGHT = 149;
const BUTTON_HEIGHT = 28;
const SEPARATOR_HEIGHT = 1;
/** `avatar_image_container`, 60x140 at (6, 2) on the card. */
const AVATAR_CONTAINER_WIDTH = 60;
const AVATAR_CONTAINER_HEIGHT = 140;
/** `staff_image` is 54 high; `updateAvatarImageContainer` centres it when there is no sender to draw. */
const STAFF_IMAGE_HEIGHT = 54;
/** `gift_incognito`, 37x48. */
const INCOGNITO_WIDTH = 37;
const INCOGNITO_HEIGHT = 48;

/**
 * A wrapped gift, on the `packagecard_new` layout that `PresentFurniWidget.showInterface` builds
 * and centres: the `warning` banner, the gift card with the sender's head and note, and the open
 * button, stacked by `element_list` 10px apart from (10, 10), with the 1px `separator` last. The
 * window then `resizeToFitContent`s: the content is `10 + list` high and the 326px `width_min` of
 * its container wide, so the frame (margins 3, 36, 3, 3) is 332 wide and `list + 49` high.
 *
 * `showInterface` recolours the banner (0xB1004C) and swaps its checkmark for the alert icon for an
 * untrusted sender, and gives a trusted one the staff card. `updateAvatarImageContainer` puts the
 * sender's head centred across the 60x140 container and at a half (untrusted) or two thirds
 * (trusted) of its height, and drops `staff_image` for an untrusted sender. The title is
 * `widget.furni.present.window.title_from` for a known sender.
 *
 * `button_list` stacks, 10 apart and centred, `open_gift_button` and `give_gift_button` (a plain
 * style 3 button, `widget.furni.present.give_gift` with the sender's name), each only when the
 * widget offers it. An unknown sender's head is `gift_incognito` (`updateUnknownSenderAvatarImage`).
 * The opened gift is its own card, `FurniturePresentOpenedView`.
 *
 * Left out: the sender's name and head opening their profile (`onSenderNameClick` /
 * `onSenderImageClick`) - the port has no extended profile to show.
 */
export const FurniturePresentView = ({ message, purchaserName, purchaserFigure, trustedSender, canOpen, canGiveGift, onOpen, onGiveGift, onClose }: FurniturePresentViewProps) => {
    const t = useTranslation();
    const knownSender = !!purchaserName.length;
    const head = useAvatarImageTexture((knownSender && purchaserFigure) ? purchaserFigure : undefined, AvatarGenderType.Male, { headOnly: true, direction: 2 });

    const caption = knownSender ? t('widget.furni.present.window.title_from', purchaserName, { name: purchaserName }) : t('widget.furni.present.window.title');

    const buttonCount = (canOpen ? 1 : 0) + (canGiveGift ? 1 : 0);
    const buttonListHeight = buttonCount ? ((buttonCount * BUTTON_HEIGHT) + ((buttonCount - 1) * LIST_SPACING)) : 0;
    const listHeight = WARNING_HEIGHT + LIST_SPACING + GIFT_CARD_HEIGHT + LIST_SPACING + buttonListHeight + LIST_SPACING + SEPARATOR_HEIGHT;
    const showStaffImage = trustedSender;
    const showHead = !(trustedSender && !knownSender) && !!head.texture;
    // `updateUnknownSenderAvatarImage`: an unknown sender gets `gift_incognito` where the head goes,
    // except on a trusted gift, whose staff card shows alone.
    const showIncognito = !knownSender && !trustedSender;

    return (
        <Frame
            variant="3"
            id="furniture-present"
            caption={caption}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            layout={{ width: 332, height: LIST_SPACING + listHeight + 39 }}
        >
            <Region layout={{ position: 'absolute', left: LIST_SPACING, top: LIST_SPACING, width: 306, height: listHeight, flexDirection: 'column', gap: LIST_SPACING }}>
                <Border
                    variant="3"
                    tintColor="#000000"
                    layout={{ width: 306, height: WARNING_HEIGHT, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor={trustedSender ? '#186e09' : '#b1004c'}
                        layout={{ position: 'absolute', left: 3, top: 3, width: 300, height: 50 }}
                    >
                        <ThemeText
                            text={trustedSender ? t('gift.trusted.banner.text') : t('gift.untrusted.banner.text', purchaserName, { name: 'not trusted gift sender' })}
                            textStyle="id_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 231 }}
                            flashFormat={{ bold: true, etchingPosition: 'left' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 65, top: 10, width: 235, minHeight: 30, maxHeight: 80 }}
                        />
                        <ThemeImage
                            src={LayoutImage(trustedSender ? 'room-ui/catalogue_ui2_checkmark_m.png' : 'room-ui/catalogue_icon_alert_s.png')}
                            layout={trustedSender
                                ? { position: 'absolute', left: 20, top: 13, width: 30, height: 24 }
                                : { position: 'absolute', left: 22, top: 12, width: 26, height: 26 }}
                        />
                    </Border>
                </Border>
                <Region layout={{ width: 306, height: GIFT_CARD_HEIGHT, flexShrink: 0 }}>
                    <ThemeImage
                        src={LayoutImage(trustedSender ? 'room-ui/catalogue_giftcard_staff.png' : 'shared/catalogue_giftcard_blank.png')}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 306, height: GIFT_CARD_HEIGHT }}
                    />
                    <Region
                        tooltip={t('widget.furni.present.sender.profile_tooltip')}
                        tooltipDelay={100}
                        layout={{ position: 'absolute', left: 6, top: 2, width: AVATAR_CONTAINER_WIDTH, height: AVATAR_CONTAINER_HEIGHT }}
                    >
                        {showStaffImage && (
                            <Region layout={{ position: 'absolute', left: 3, top: knownSender ? 20 : ((AVATAR_CONTAINER_HEIGHT / 2) - (STAFF_IMAGE_HEIGHT / 2)), width: 54, height: STAFF_IMAGE_HEIGHT }}>
                                <ThemeImage
                                    src={LayoutImage('room-ui/catalogue_giftcard_icon_bgstar.png')}
                                    bitmap={{ fitSizeToContents: true }}
                                    layout={{ position: 'absolute', left: 0, top: 0 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/catalogue_giftcard_staff_icon.png')}
                                    layout={{ position: 'absolute', left: 10, top: 10, width: 34, height: 34 }}
                                />
                            </Region>
                        )}
                        {showIncognito && (
                            <ThemeImage
                                src={LayoutImage('room-ui/gift_incognito.png')}
                                bitmap={{ fitSizeToContents: true }}
                                layout={{
                                    position: 'absolute',
                                    left: Math.trunc((AVATAR_CONTAINER_WIDTH / 2) - (INCOGNITO_WIDTH / 2)),
                                    top: Math.trunc((AVATAR_CONTAINER_HEIGHT / 2) - (INCOGNITO_HEIGHT / 2)),
                                }}
                            />
                        )}
                        {showHead && head.texture && (
                            <ThemeImage
                                texture={head.texture}
                                width={head.width}
                                height={head.height}
                                layout={{
                                    position: 'absolute',
                                    left: Math.trunc((AVATAR_CONTAINER_WIDTH / 2) - (head.width / 2)),
                                    top: Math.trunc((AVATAR_CONTAINER_HEIGHT / (trustedSender ? 1.5 : 2)) - (head.height / 2)),
                                }}
                            />
                        )}
                    </Region>
                    <ThemeText
                        text={message}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                        flashFormat={{ leading: 4 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 95, top: 31, width: 190, height: 100 }}
                    />
                    {knownSender && (
                        <ThemeText
                            text={t('widget.furni.present.message_from', purchaserName, { name: purchaserName })}
                            textStyle="u_italic"
                            tooltip={t('widget.furni.present.sender.profile_tooltip')}
                            verticalAlign="top"
                            layout={{ position: 'absolute', right: 21, top: 120 }}
                        />
                    )}
                </Region>
                <Region layout={{ width: 306, height: buttonListHeight, flexShrink: 0, flexDirection: 'column', alignItems: 'center', gap: LIST_SPACING }}>
                    {canOpen && (
                        <ButtonThick
                            variant="5"
                            tintColor="#00aa00"
                            onPointerTap={onOpen}
                            layout={{ height: BUTTON_HEIGHT, minWidth: 206, maxWidth: 328, flexShrink: 0 }}
                        >
                            {t('widget.furni.present.open_gift')}
                        </ButtonThick>
                    )}
                    {canGiveGift && (
                        <Button
                            variant="3"
                            onPointerTap={onGiveGift}
                            layout={{ height: BUTTON_HEIGHT, minWidth: 206, maxWidth: 330, flexShrink: 0 }}
                        >
                            {t('widget.furni.present.give_gift', purchaserName, { name: purchaserName })}
                        </Button>
                    )}
                </Region>
                <Region layout={{ width: 306, height: SEPARATOR_HEIGHT, flexShrink: 0 }} />
            </Region>
        </Frame>
    );
};
