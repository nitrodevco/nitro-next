import { RoomObjectCategoryEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureUseProductView } from '#base/views/room-widgets/furniture/FurnitureUseProductView';

/**
 * Planting a monsterplant seed - `MonsterPlantSeedConfirmationView`: the
 * `use_product_widget_frame_plant_seed` frame with the `use_product_controller_plant_seed`
 * controller, whose two preview bitmaps are its own, and the seed's name in the title and the text.
 * The seed is spent on a plant that grows where it stood, so it asks first; planting is then a plain
 * use (`RWUPM_MONSTERPLANT_SEED`).
 */
export const FurnitureMonsterplantSeedWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG);
    const furniture = useRoomFurnitureData(request?.objectId ?? -1, RoomObjectCategoryEnum.Floor);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG);

    if (!request) return null;

    const name = furniture?.furnitureData?.localizedName ?? '';

    return (
        <FurnitureUseProductView
            frameTemplate="habbo-room-ui-com/use_product_widget_frame_plant_seed_xml"
            controllerTemplate="habbo-room-ui-com/use_product_controller_plant_seed_xml"
            parameters={{
                'useproduct.widget.title.plant_seed': { name },
                'useproduct.widget.text.plant_seed': { productName: name },
            }}
            onConfirm={() => {
                send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }));
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
