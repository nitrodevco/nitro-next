import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { useTranslation } from '#base/context/system';
import { LayoutImage, TemplateWindow, TemplateWindows, ThemeImage, useAvatarImageTexture } from '#base/theme';

/** What came out of the gift, drawn centred in `gift_image`: a bitmap asset or url, or a render. */
export interface FurniturePresentOpenedIcon {
    src?: string;
    texture?: Texture;
}

export interface FurniturePresentOpenedViewProps {
    senderName: string;
    senderFigure: string;
    trustedSender: boolean;
    /** `gift_message`'s text; the field is hidden without one. */
    message: string | undefined;
    icon: FurniturePresentOpenedIcon;
    showKeepInRoom: boolean;
    showPlaceInRoom: boolean;
    showPutInInventory: boolean;
    onKeepInRoom: () => void;
    onPlaceInRoom: () => void;
    onPutInInventory: () => void;
    onGiveGift: () => void;
    onClose: () => void;
}

/**
 * An opened gift - `PresentFurniWidget.showGiftOpenedInterface`, which builds `packagecard_new_opened`
 * and centres it:
 *
 * - the frame's caption `widget.furni.present.window.title_from` for a known sender;
 * - `image_bg` the `gift_icon_background` art, and `gift_image` the prize's picture centred in it
 *   at its own size (`showIcon`);
 * - `gift_message` the text, hidden when there is none;
 * - `give_gift_button` (`widget.furni.present.give_gift`) for a known sender, and the sender's head
 *   in `avatar_image`, centred across `avatar_image_container` and at a half (two thirds for a
 *   trusted sender) of its height (`updateAvatarImageContainer`).
 *
 * `updateRoomAndInventoryButtons` then shows whichever of `keep_in_room_button`,
 * `place_in_room_button` and `put_in_inventory_button` the widget offers, the `separator` only for an
 * unknown sender and `give_container` only for a known one, and fits the frame to its content
 * (`resizeToFitContent`) once the lists are arranged.
 *
 * The head does not open the sender's profile (`onSenderImageClick`): the port has no extended
 * profile to show.
 */
export const FurniturePresentOpenedView = ({ senderName, senderFigure, trustedSender, message, icon, showKeepInRoom, showPlaceInRoom, showPutInInventory, onKeepInRoom, onPlaceInRoom, onPutInInventory, onGiveGift, onClose }: FurniturePresentOpenedViewProps) => {
    const t = useTranslation();
    const knownSender = !!senderName.length;
    const head = useAvatarImageTexture((knownSender && senderFigure) ? senderFigure : undefined, AvatarGenderType.Male, { headOnly: true, direction: 2 });

    const arrange = ({ find, root }: TemplateWindows) => {
        const avatar = find('avatar_image');
        const container = find('avatar_image_container');

        if (avatar && container && head.texture) avatar.setRectangle(Math.trunc((container.width / 2) - (head.width / 2)), Math.trunc((container.height / (trustedSender ? 1.5 : 2)) - (head.height / 2)), head.width, head.height);

        root()?.resizeToFitContent();
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/packagecard_new_opened"
            frame={{ id: 'furniture-present-opened', centered: true, rememberPosition: false, onClose }}
            arrange={arrange}
            bindings={{
                '': knownSender ? { caption: t('widget.furni.present.window.title_from', senderName, { name: senderName }) } : {},
                image_bg: { asset: LayoutImage('habbo-room-ui-com/gift_icon_background.png') },
                gift_image: {
                    children: (icon.texture || icon.src) && (
                        <ThemeImage
                            src={icon.src}
                            texture={icon.texture}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                gift_message: (message !== undefined) ? { caption: message } : { visible: false },
                give_gift_button: knownSender ? { caption: t('widget.furni.present.give_gift', senderName, { name: senderName }), onPointerTap: onGiveGift } : { visible: false },
                avatar_image: {
                    children: head.texture && (
                        <ThemeImage
                            texture={head.texture}
                            width={head.width}
                            height={head.height}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    ),
                },
                keep_in_room_button: { visible: showKeepInRoom, onPointerTap: onKeepInRoom },
                place_in_room_button: { visible: showPlaceInRoom, onPointerTap: onPlaceInRoom },
                put_in_inventory_button: { visible: showPutInInventory, onPointerTap: onPutInInventory },
                separator: { visible: !knownSender },
                give_container: { visible: knownSender },
            }}
        />
    );
};
