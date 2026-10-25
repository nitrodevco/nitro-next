import { FurnitureLabelData, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { SetFurnitureLabelSettingsComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useWiredHasWritePermission } from '#base/context/wired';
import { FURNITURE_LABEL_COLORS, FURNITURE_LABEL_SETTINGS_WIDGET } from '#base/utils';
import { FurnitureLabelSettingsView } from '#base/views/room-widgets/furniture/FurnitureLabelSettingsView';

/**
 * The WIRED label settings window (`FurnitureLabelWidget.onSettingsOpen` + `FurnitureLabelSettingsView`),
 * opened by the infostand's `label_settings` button: only with the room's wired modify permission
 * and on a furni with a label (type 0). `open` reads the label's colour (the first one when it is
 * none of the menu's), visibility and always open; Save sends `SetFurnitureLabelSettings` with
 * always open only for a label everyone sees, and closes. Losing the permission closes it
 * (`permissionsChanged`).
 */
export const FurnitureLabelSettingsWidget = () => {
    const request = useRoomWidget(FURNITURE_LABEL_SETTINGS_WIDGET);
    const room = useRoom();
    const canModify = useWiredHasWritePermission();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const objectId = request?.objectId ?? -1;
    const label = room?.getRoomObject(objectId, RoomObjectCategoryEnum.Floor)?.model.getValue<FurnitureLabelData | undefined>(RoomObjectVariableEnum.FurnitureLabelData);
    // What the window shows, picked afresh each time it opens.
    const [ edit, setEdit ] = useState<{ sequence: number; colorIndex: number; visibility: number; alwaysOpen: boolean } | undefined>(undefined);

    const close = () => closeRoomWidget(FURNITURE_LABEL_SETTINGS_WIDGET);

    if (!request || !canModify || !label || (label.type !== FurnitureLabelData.TYPE_LABEL)) return null;

    const current = (edit?.sequence === request.sequence)
        ? edit
        : {
                sequence: request.sequence,
                colorIndex: Math.max(0, FURNITURE_LABEL_COLORS.indexOf(label.bubbleColor)),
                visibility: (label.visibility === FurnitureLabelData.VISIBILITY_EVERYONE) ? 0 : 1,
                alwaysOpen: label.alwaysOpen,
            };

    return (
        <FurnitureLabelSettingsView
            colorIndex={current.colorIndex}
            visibility={current.visibility}
            alwaysOpen={current.alwaysOpen}
            onColor={colorIndex => setEdit({ ...current, colorIndex })}
            onVisibility={visibility => setEdit({ ...current, visibility })}
            onAlwaysOpen={alwaysOpen => setEdit({ ...current, alwaysOpen })}
            onSave={() => {
                send(new SetFurnitureLabelSettingsComposer({
                    furnitureId: objectId,
                    bubbleColor: FURNITURE_LABEL_COLORS[current.colorIndex] ?? FURNITURE_LABEL_COLORS[0],
                    visibility: current.visibility,
                    alwaysOpen: (current.visibility === 0) && current.alwaysOpen,
                }));
                close();
            }}
            onClose={close}
        />
    );
};
