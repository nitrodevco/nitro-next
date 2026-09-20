import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { LayoutImage, ThemeImage } from '#base/theme';
import { FurnitureUseProductView } from '#base/views/room-widgets/furniture/FurnitureUseProductView';

/**
 * Planting a monsterplant seed. The seed is spent on a plant that grows where it stood, so the
 * dialog asks first - and then it is a plain use, which is all `RoomSession.plantSeed` ever was.
 */
export const FurnitureMonsterplantSeedWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG);

    if (!request) return null;

    return (
        <FurnitureUseProductView
            captionKey="useproduct.widget.title.plant_seed"
            descriptionKey="useproduct.widget.text.plant_seed"
            infoKey="useproduct.widget.info.plant_seed"
            confirmKey="useproduct.widget.plant_seed"
            preview={(
                <>
                    <ThemeImage
                        src={LayoutImage('room-ui/plant_seed_preview_bg.png')}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 122, height: 130 }}
                    />
                    <ThemeImage
                        src={LayoutImage('room-ui/plant_seed_preview.png')}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 122, height: 130 }}
                    />
                </>
            )}
            onConfirm={() => {
                send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }));
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
