/**
 * The furni page's `furni_preview_widget` - Flash `FurniView.updateItemView`'s room previewer half:
 * the selected group's furni shown in a showcase room painted like the room the user is standing
 * in, so a chair is seen against the floor it would be placed on.
 *
 * - The showcase takes the active room's `room_floor_type`, `room_wall_type` and
 *   `room_landscape_type`, falling back to the same defaults Flash uses when the room has none.
 * - A room layout paper (wallpaper 2, floor 3, landscape 4) draws walls *and* floor with its own
 *   pattern over whichever of the three it is, and a landscape adds a `window_double_default` wall
 *   item so there is a window for the landscape to show through.
 * - A wall item draws with walls and floor; a floor item with the floor only, so nothing stands
 *   behind it.
 *
 * Not ported: `nextItemButton` / `viewItemButton`, which page through an external image wall item's
 * pictures, and the limited-edition and rarity overlays the widget draws over the preview.
 */
import { IObjectData, RoomId, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { InventoryFurniGroup, isInventoryFurniGroupWallItem, peekInventoryFurni } from '#base/context/inventory';
import { getRoom } from '#base/context/room';
import { BoxLayout } from '#base/theme';

/** `FurniView.updateItemView`'s fallbacks when the room the user is in has no pattern of its own. */
const DEFAULT_WALL_TYPE = '101';
const DEFAULT_FLOOR_TYPE = '101';
const DEFAULT_LANDSCAPE_TYPE = '1.1';

/** The `FurnitureItem` categories of the three room layout papers. */
const CATEGORY_WALLPAPER = 2;
const CATEGORY_FLOOR = 3;
const CATEGORY_LANDSCAPE = 4;

/** `addWallItemIntoRoom` / `addFurnitureIntoRoom` both place at 90 degrees. */
const PREVIEW_DIRECTION = new Vector3d(90, 0, 0);

interface InventoryFurniPreviewProps {
    group: InventoryFurniGroup;
    layout?: BoxLayout;
}

/** What the preview should show for the selected group - worked out once per selection. */
type PreviewRequest = {
    /**
     * The room's own patterns, which the showcase takes whatever is being previewed
     * (`updateObjectRoom` runs before the branch, not inside the room-layout arm): a chair is seen
     * against the floor it would stand on.
     */
    floorType: string;
    wallType: string;
    landscapeType: string;
} & (
    | { kind: 'room_layout'; withWindow: boolean }
    | { kind: 'wall'; typeId: number; objectData: string }
    | { kind: 'floor'; typeId: number; stuffData: IObjectData; extra: number }
);

const getPreviewRequest = (group: InventoryFurniGroup): PreviewRequest | undefined => {
    const item = peekInventoryFurni(group);

    if (!item) return undefined;

    const activeRoom = getRoom();
    const wallType = activeRoom?.getRoomValue<string>(RoomObjectVariableEnum.RoomWallType) || DEFAULT_WALL_TYPE;
    const floorType = activeRoom?.getRoomValue<string>(RoomObjectVariableEnum.RoomFloorType) || DEFAULT_FLOOR_TYPE;
    const landscapeType = activeRoom?.getRoomValue<string>(RoomObjectVariableEnum.RoomLandscapeType) || DEFAULT_LANDSCAPE_TYPE;

    if ((item.category === CATEGORY_WALLPAPER) || (item.category === CATEGORY_FLOOR) || (item.category === CATEGORY_LANDSCAPE)) {
        const pattern = group.stuffData.getLegacyString();

        // The paper being previewed replaces whichever of the three it is.
        return {
            kind: 'room_layout',
            floorType: (item.category === CATEGORY_FLOOR) ? pattern : floorType,
            wallType: (item.category === CATEGORY_WALLPAPER) ? pattern : wallType,
            landscapeType: (item.category === CATEGORY_LANDSCAPE) ? pattern : landscapeType,
            withWindow: item.category === CATEGORY_LANDSCAPE,
        };
    }

    if (isInventoryFurniGroupWallItem(group)) return { kind: 'wall', floorType, wallType, landscapeType, typeId: group.typeId, objectData: item.stuffData.getLegacyString() };

    return { kind: 'floor', floorType, wallType, landscapeType, typeId: group.typeId, stuffData: group.stuffData, extra: group.extra };
};

export const InventoryFurniPreview = ({ group, layout }: InventoryFurniPreviewProps) => {
    const [ previewer, setPreviewer ] = useState<RoomPreviewerHandle | null>(null);

    // The room's patterns are read when the selection changes, not during render: they live on the
    // engine's room object rather than in a store, and a group's identity only changes when the
    // group does (the furni slice copies a group when it edits it).
    useEffect(() => {
        const room = previewer?.room;
        const request = previewer ? getPreviewRequest(group) : undefined;

        if (!previewer || !room || !request) return;

        // `updateObjectRoom` before the branch: the showcase is painted like the room the user is
        // standing in whatever kind of thing is being previewed. A paper then overrides its own.
        room.updateRoomPlaneType(request.floorType, request.wallType, request.landscapeType);

        switch (request.kind) {
            case 'room_layout':
                room.updateRoomPlaneVisibilities(true, true);

                if (request.withWindow) {
                    // `getFurnitureDataByName('window_double_default', 'i')`: something for the landscape to show through.
                    const typeId = GetRoomContentLoader().getFurnitureWallTypeIdForName('window_double_default');

                    if (typeId > -1) previewer.addWallItem(typeId, PREVIEW_DIRECTION, '');
                }
                break;
            case 'wall':
                room.updateRoomPlaneVisibilities(true, true);
                previewer.addWallItem(request.typeId, PREVIEW_DIRECTION, request.objectData);
                break;
            case 'floor':
                room.updateRoomPlaneVisibilities(false, true);
                previewer.addFloorItem(request.typeId, PREVIEW_DIRECTION, request.stuffData, request.extra);
                break;
        }
    }, [ previewer, group ]);

    return (
        <RoomPreviewer
            roomId={RoomId.TEMP_ROOM_INVENTORY}
            showWalls
            showFloor
            onReady={setPreviewer}
            layout={layout}
        />
    );
};
