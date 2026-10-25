import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { OpenMysteryTrophyComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { FurnitureBannerDialogView } from '#base/views/room-widgets/furniture/FurnitureBannerDialogView';

/**
 * A mystery trophy, engraved as it is opened - `MysteryTrophyOpenDialogView` on the `mysterytrophy`
 * layout, whose `input` takes the inscription (its `max_chars` 500). Whatever is typed here is what
 * the trophy will say for good - there is no second dialog, which is why the box asks so plainly.
 */
export const FurnitureMysteryTrophyWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ inscription, setInscription ] = useState<string>('');

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG);

    if (!request) return null;

    return (
        <FurnitureBannerDialogView
            layout="mysterytrophy"
            input={{ value: inscription, onChange: setInscription }}
            onConfirm={() => {
                send(new OpenMysteryTrophyComposer({ objectId: request.objectId, inscription }));
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
