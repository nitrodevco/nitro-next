import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { LayoutImage, TemplateWindow, TemplateWindows, ThemeImage, useAvatarImageTexture } from '#base/theme';

/**
 * A wrapped gift - `PresentFurniWidget.showInterface`, which builds
 * `habbo-room-ui-com/packagecard_new` and centres it:
 *
 * - the frame's caption `widget.furni.present.window.title_from` for a known sender;
 * - an untrusted sender's `warning`: `warning_foreground_border` coloured 0xB1004C, `warning_icon`
 *   the alert icon at (22, 12) 26x26, and `warning_text` `gift.untrusted.banner.text`;
 * - `gift_card` the staff card for a trusted sender;
 * - the head in `avatar_image` (`updateAvatarImageContainer`): the sender's, or `gift_incognito` for
 *   an unknown one, centred across `avatar_image_container` and at a half (untrusted) or two thirds
 *   (trusted) of its height. A trusted gift from no one shows no head, and `staff_image` centred
 *   instead; an untrusted one drops `staff_image`;
 * - `message_text` the note and `message_from` the sender, hidden for an unknown one;
 * - in `button_list`, `open_gift_button` and `give_gift_button` (`widget.furni.present.give_gift`),
 *   each only when the widget offers it.
 *
 * Then `element_list` goes `spacing` in, the frame fits its content (`resizeToFitContent`) and the
 * list's container is made as high as the list's bottom. The opened gift is its own card,
 * `FurniturePresentOpenedView`.
 *
 * Left out: the sender's name and head opening their profile (`onSenderNameClick` /
 * `onSenderImageClick`) - the port has no extended profile to show - and the hotel's own gift card
 * art (`catalog.gift_wrapping_new.gift_card`).
 */
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

/** `element_list`'s `spacing`, which `showInterface` also moves it in by. */
const LIST_SPACING = 10;
/** `showInterface`: the banner's colour and icon for a sender who is not trusted. */
const UNTRUSTED_BANNER_COLOR = 0xb1004c;
const UNTRUSTED_ICON = { x: 22, y: 12, width: 26, height: 26 };
/** `gift_incognito`'s size: `updateUnknownSenderAvatarImage` puts it where the head goes. */
const INCOGNITO_SIZE = { width: 37, height: 48 };

export const FurniturePresentView = ({ message, purchaserName, purchaserFigure, trustedSender, canOpen, canGiveGift, onOpen, onGiveGift, onClose }: FurniturePresentViewProps) => {
    const t = useTranslation();
    const knownSender = !!purchaserName.length;
    const head = useAvatarImageTexture((knownSender && purchaserFigure) ? purchaserFigure : undefined, AvatarGenderType.Male, { headOnly: true, direction: 2 });

    // `updateAvatarImageContainer`: what `avatar_image` shows and its size.
    const showsHead = !(trustedSender && !knownSender);
    const image = !showsHead
        ? undefined
        : knownSender
            ? (head.texture ? { width: head.width, height: head.height } : undefined)
            : INCOGNITO_SIZE;

    const arrange = ({ find, root }: TemplateWindows) => {
        const avatar = find('avatar_image');
        const container = find('avatar_image_container');

        if (avatar && container) {
            if (!showsHead) find('staff_image')?.setY(Math.trunc((container.height / 2) - (avatar.height / 2)));
            else if (image) avatar.setRectangle(Math.trunc((container.width / 2) - (image.width / 2)), Math.trunc((container.height / (trustedSender ? 1.5 : 2)) - (image.height / 2)), image.width, image.height);
        }

        if (!trustedSender) {
            const icon = find('warning_icon');

            icon?.setRectangle(UNTRUSTED_ICON.x, UNTRUSTED_ICON.y, UNTRUSTED_ICON.width, UNTRUSTED_ICON.height);
        }

        const list = find('element_list');

        if (!list) return;

        list.setX(LIST_SPACING);
        root()?.resizeToFitContent();
        list.parent?.setHeight(list.x + list.height);
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/packagecard_new"
            frame={{ id: 'furniture-present', centered: true, rememberPosition: false, onClose }}
            arrange={arrange}
            bindings={{
                '': knownSender ? { caption: t('widget.furni.present.window.title_from', purchaserName, { name: purchaserName }) } : {},
                warning_foreground_border: trustedSender ? {} : { color: UNTRUSTED_BANNER_COLOR },
                warning_icon: trustedSender ? {} : { asset: LayoutImage('habbo-window-manager-com/catalogue_icon_alert_s.png') },
                warning_text: trustedSender ? {} : { caption: t('gift.untrusted.banner.text', purchaserName, { name: 'not trusted gift sender' }) },
                gift_card: trustedSender ? { asset: LayoutImage('habbo-window-manager-com/catalogue_giftcard_staff.png') } : {},
                staff_image: { visible: trustedSender },
                avatar_image: knownSender
                    ? {
                            children: showsHead && head.texture && (
                                <ThemeImage
                                    texture={head.texture}
                                    width={head.width}
                                    height={head.height}
                                    layout={{ position: 'absolute', left: 0, top: 0 }}
                                />
                            ),
                        }
                    : (showsHead ? { asset: LayoutImage('habbo-room-ui-com/gift_incognito.png') } : { visible: false }),
                message_text: { caption: message },
                message_from: knownSender ? { caption: t('widget.furni.present.message_from', purchaserName, { name: purchaserName }) } : { visible: false },
                open_gift_button: canOpen ? { onPointerTap: onOpen } : { visible: false },
                give_gift_button: canGiveGift ? { caption: t('widget.furni.present.give_gift', purchaserName, { name: purchaserName }), onPointerTap: onGiveGift } : { visible: false },
            }}
        />
    );
};
