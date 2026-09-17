import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { CustomizeAvatarWithFurniComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useUserStore } from '#base/context/user';
import { ThemeImage, useAvatarImageTexture } from '#base/theme';
import { FurnitureUseProductView } from '#base/views/room-widgets/furniture/FurnitureUseProductView';

/**
 * Binding a set of clothes to your figure. The furni is consumed, so it asks first; the preview
 * is simply you as you are now, since what the clothes look like on you is the server's answer
 * to the redeem rather than something the client can show up front.
 */
export const FurniturePurchasableClothingWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG);
    const figure = useUserStore(x => x.figure);
    const sex = useUserStore(x => x.sex);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const { texture, width, height } = useAvatarImageTexture(figure, sex, { direction: 4 });

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG);

    if (!request) return null;

    return (
        <FurnitureUseProductView
            captionKey="useproduct.widget.title"
            descriptionKey="useproduct.widget.text.bind_clothing"
            infoKey="useproduct.widget.info.bind_clothing"
            confirmKey="useproduct.widget.bind_clothing"
            preview={texture && (
                <ThemeImage
                    texture={texture}
                    width={width}
                    height={height}
                />
            )}
            onConfirm={() => {
                send(new CustomizeAvatarWithFurniComposer({ itemId: request.objectId }));
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
