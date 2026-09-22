import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { useTranslation } from '#base/context/system';
import { Button, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

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

/** `packagecard_new_opened`'s lists: `element_list`, `button_list` and `give_element_list` all space their items 10 apart. */
const LIST_SPACING = 10;
const BUTTON_HEIGHT = 28;
/** The buttons of `button_list` sit 64 in from its left edge. */
const BUTTON_LEFT = 64;
/** `avatar_image_container`: 45x45 at (290, 13) on `give_container`. */
const AVATAR_CONTAINER_SIZE = 45;

/**
 * An opened gift, on the `packagecard_new_opened` layout `PresentFurniWidget.showGiftOpenedInterface`
 * builds and centres, then `resizeToFitContent`s (`updateRoomAndInventoryButtons`): the frame is
 * the 336px `element_list` plus the margins (3, 36, 3, 3), as high as what its lists hold.
 *
 * - `message_element_list` (30, 0): `image_container` with the `gift_icon_background` under
 *   `gift_image`, where `showIcon` centres the prize's picture in the 81x80 bitmap, and
 *   `message_container` with `gift_message` at (0, 20), hidden when there is no text.
 * - `button_list`: `keep_in_room_button` / `place_in_room_button` / `put_in_inventory_button`,
 *   whichever `updateRoomAndInventoryButtons` leaves visible, and the 1px `separator` only for an
 *   unknown sender.
 * - `give_element_list`: `give_container` (a `0xff96a4a5` fill, 336x70), only for a known sender,
 *   with `give_gift_button` (`widget.furni.present.give_gift`, centred on its authored 246px box
 *   as it grows to its caption) and the sender's head, which `updateAvatarImageContainer` centres
 *   across its 45x45 container and puts at a half (two thirds for a trusted sender) of its height.
 *
 * The head does not open the sender's profile (`onSenderImageClick`): the port has no extended
 * profile to show.
 */
export const FurniturePresentOpenedView = ({ senderName, senderFigure, trustedSender, message, icon, showKeepInRoom, showPlaceInRoom, showPutInInventory, onKeepInRoom, onPlaceInRoom, onPutInInventory, onGiveGift, onClose }: FurniturePresentOpenedViewProps) => {
    const t = useTranslation();
    const knownSender = !!senderName.length;
    const head = useAvatarImageTexture((knownSender && senderFigure) ? senderFigure : undefined, AvatarGenderType.Male, { headOnly: true, direction: 2 });

    const caption = knownSender ? t('widget.furni.present.window.title_from', senderName, { name: senderName }) : t('widget.furni.present.window.title');

    return (
        <Frame
            variant="3"
            id="furniture-present-opened"
            caption={caption}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            fitContent
            layout={{ minWidth: 275, minHeight: 150 }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 336, flexDirection: 'column', gap: LIST_SPACING }}>
                <Region layout={{ height: 100, marginLeft: 30, flexShrink: 0, flexDirection: 'row', gap: LIST_SPACING }}>
                    <Region layout={{ width: 81, height: 81, marginTop: 9, flexShrink: 0 }}>
                        <ThemeImage
                            src={LayoutImage('room-ui/gift_icon_background.png')}
                            bitmap={{}}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 81, height: 80 }}
                        />
                        {(icon.texture || icon.src) && (
                            <ThemeImage
                                src={icon.src}
                                texture={icon.texture}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 81, height: 80 }}
                            />
                        )}
                    </Region>
                    <Region layout={{ width: 184, height: 81, marginTop: 9, flexShrink: 0, overflow: 'hidden' }}>
                        {(message !== undefined) && (
                            <ThemeText
                                text={message}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 180 }}
                                flashFormat={{ thickness: -15, sharpness: 80 }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 20, width: 184 }}
                            />
                        )}
                    </Region>
                </Region>
                <Region layout={{ width: 336, flexShrink: 0, flexDirection: 'column', gap: LIST_SPACING }}>
                    {showKeepInRoom && (
                        <ButtonThick
                            variant="3"
                            onPointerTap={onKeepInRoom}
                            layout={{ height: BUTTON_HEIGHT, marginLeft: BUTTON_LEFT, minWidth: 206, flexShrink: 0, alignSelf: 'flex-start' }}
                        >
                            {t('widget.furni.present.keep_in_room')}
                        </ButtonThick>
                    )}
                    {showPlaceInRoom && (
                        <ButtonThick
                            variant="3"
                            onPointerTap={onPlaceInRoom}
                            layout={{ height: BUTTON_HEIGHT, marginLeft: BUTTON_LEFT, minWidth: 206, flexShrink: 0, alignSelf: 'flex-start' }}
                        >
                            {t('widget.furni.present.place_in_room')}
                        </ButtonThick>
                    )}
                    {showPutInInventory && (
                        <Button
                            variant="3"
                            onPointerTap={onPutInInventory}
                            layout={{ height: BUTTON_HEIGHT, marginLeft: BUTTON_LEFT, minWidth: 206, flexShrink: 0, alignSelf: 'flex-start' }}
                        >
                            {t('widget.furni.present.put_in_inventory')}
                        </Button>
                    )}
                    {!knownSender && <Region layout={{ width: 336, height: 1, flexShrink: 0 }} />}
                </Region>
                <Region layout={{ width: 336, flexShrink: 0, flexDirection: 'column', gap: LIST_SPACING }}>
                    {knownSender && (
                        <Region
                            backgroundColor="#96a4a5"
                            layout={{ width: 336, height: 70, flexShrink: 0 }}
                        >
                            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 246, height: BUTTON_HEIGHT, flexDirection: 'row', justifyContent: 'center' }}>
                                <ButtonThick
                                    variant="5"
                                    tintColor="#00aa00"
                                    onPointerTap={onGiveGift}
                                    layout={{ height: BUTTON_HEIGHT, minWidth: 246, maxWidth: 330, flexShrink: 0 }}
                                >
                                    {t('widget.furni.present.give_gift', senderName, { name: senderName })}
                                </ButtonThick>
                            </Region>
                            <Region
                                tooltip={t('widget.furni.present.sender.profile_tooltip')}
                                tooltipDelay={100}
                                layout={{ position: 'absolute', left: 290, top: 13, width: AVATAR_CONTAINER_SIZE, height: AVATAR_CONTAINER_SIZE, overflow: 'hidden' }}
                            >
                                {head.texture && (
                                    <ThemeImage
                                        texture={head.texture}
                                        width={head.width}
                                        height={head.height}
                                        layout={{
                                            position: 'absolute',
                                            left: Math.trunc((AVATAR_CONTAINER_SIZE / 2) - (head.width / 2)),
                                            top: Math.trunc((AVATAR_CONTAINER_SIZE / (trustedSender ? 1.5 : 2)) - (head.height / 2)),
                                        }}
                                    />
                                )}
                            </Region>
                        </Region>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};
