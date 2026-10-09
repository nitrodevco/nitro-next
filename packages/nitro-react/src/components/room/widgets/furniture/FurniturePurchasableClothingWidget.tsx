import { AvatarGenderType, FurnitureSpecialType, IFurnitureData, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { redeemPurchasableClothing } from '#base/commands';
import { AvatarImage } from '#base/components';
import { avatarEditorStore } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useOwnUserId, useUserStore } from '#base/context/user';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureUseProductView } from '#base/views/room-widgets/furniture/FurnitureUseProductView';

/**
 * `PurchasableClothingConfirmationView.open`: a `figure_purchasable_set` furni's `customparams`
 * are its figure set ids, and the ones the user's gender can wear go on their own figure
 * (`getFigureStringWithFigureIds`) - the figure the dialog previews, and the one put on once the
 * server binds the furni. Any other category adds nothing.
 */
const figureWithFurniClothing = (furnitureData: IFurnitureData | undefined, figure: string, gender: AvatarGenderType) => {
    const setIds: number[] = [];

    if (furnitureData?.specialType === FurnitureSpecialType.FigurePurchasableSet) {
        for (const part of furnitureData.customParams.split(',')) {
            const setId = parseInt(part);

            if (GetAvatarRenderManager().isValidFigureSetForGender(setId, gender)) setIds.push(setId);
        }
    }

    return GetAvatarRenderManager().getFigureStringWithFigureIds(figure, gender, setIds);
};

/**
 * Binding a set of clothes to your figure - `PurchasableClothingConfirmationView`, opened for the
 * furni's owner only (`FurnitureContextMenuWidgetHandler` asks `isOwnerOfFurniture`). Clothing the
 * user has bound before is simply put on, with no dialog and the furni kept; otherwise the dialog
 * shows the user wearing it, and "Use & Bind Clothing" redeems the furni.
 */
export const FurniturePurchasableClothingWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG);
    const roomFurniture = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const ownUserId = useOwnUserId();
    const figure = useUserStore(x => x.figure);
    const sex = useUserStore(x => x.sex);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const furnitureData = roomFurniture?.furnitureData;
    const newFigure = furnitureData ? figureWithFurniClothing(furnitureData, figure, sex) : figure;
    const isOwner = !!roomFurniture && (roomFurniture.ownerId === ownUserId);
    const isBound = !!furnitureData && avatarEditorStore.getState().boundFurnitureNames.includes(furnitureData.className);

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG);

    useEffect(() => {
        if (!request || !roomFurniture) return;

        if (!isOwner) {
            onClose();

            return;
        }

        if (isBound) {
            send(new UpdateFigureDataComposer({ figure: newFigure, gender: sex }));
            onClose();
        }
        // Decided once per request, as `open` is.
    }, [ request?.objectId ]);

    if (!request || !furnitureData || !isOwner || isBound) return null;

    return (
        <FurnitureUseProductView
            frameTemplate="habbo-room-ui-com/use_product_widget_frame_plant_seed_xml"
            contentTemplate="habbo-room-ui-com/use_product_controller_purchasable_clothing_xml"
            previewSlot="avatar_preview"
            captionKey="useproduct.widget.title.bind_clothing"
            descriptionKey="useproduct.widget.text.bind_clothing"
            infoKey="useproduct.widget.info.bind_clothing"
            confirmKey="useproduct.widget.bind_clothing"
            // `AvatarImageWidget`: the full, uncropped large figure facing `southeast`, from the widget's corner.
            preview={(
                <AvatarImage
                    figure={newFigure}
                    gender={sex}
                    direction={2}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            )}
            onConfirm={() => {
                redeemPurchasableClothing(send, request.objectId, furnitureData.className, newFigure, sex);
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
