import { AvatarActionStateType, AvatarActionStateTypeUtilities, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { RefObject, useState } from 'react';

import { RoomPreviewerHandle } from '#base/components';
import { ROOM_PREVIEWER_OBJECT_ID } from '#base/hooks';

import { PREVIEW_ZOOM_IN, PREVIEW_ZOOM_NORMAL, ProductPreviewZoom } from './useProductPreviewZoom';

/** Its avatar actions, cycled by `toggle_preview_magic`. */
const PREVIEW_ACTION_STAND = 0;
const PREVIEW_ACTION_WALK = 1;
const PREVIEW_ACTION_DANCE = 2;
const PREVIEW_ACTION_SIT = 3;
const PREVIEW_ACTION_LAY = 4;
const PREVIEW_ACTION_WAVE = 5;
const PREVIEW_ACTION_COUNT = 6;

const PREVIEW_AVATAR_DEFAULT_BODY_DIRECTION = 2;
const PREVIEW_AVATAR_DEFAULT_HEAD_DIRECTION = 3;

/** `RoomPreviewer.PREVIEW_OBJECT_LOCATION` and the widget's sit and lay offsets. */
const PREVIEW_OBJECT_LOCATION = new Vector3d(2, 2, 0);
const PREVIEW_SIT_OFFSETS = new Vector3d(2, 2, 0.55);
const PREVIEW_LAY_OFFSETS = new Vector3d(1, 1, 0.8);

const normalizeAvatarDirection = (direction: number) => {
    const value = direction % 8;

    return (value < 0) ? (value + 8) : value;
};

const isDiagonalAvatarDirection = (direction: number) => ((normalizeAvatarDirection(direction) % 2) !== 0);

const isValidLayingDirection = (direction: number) => {
    const value = normalizeAvatarDirection(direction);

    return (value === 0) || (value === 2);
};

/** `isPreviewAvatarActionSkippedForDirection`. */
const isPreviewAvatarActionSkippedForDirection = (action: number, direction: number) => (((action === PREVIEW_ACTION_SIT) && isDiagonalAvatarDirection(direction)) || ((action === PREVIEW_ACTION_LAY) && !isValidLayingDirection(direction)));

/** `getPreviewAvatarLocation`. */
const getPreviewAvatarLocation = (action: number) => {
    switch (action) {
        case PREVIEW_ACTION_SIT: return PREVIEW_SIT_OFFSETS;
        case PREVIEW_ACTION_LAY: return PREVIEW_LAY_OFFSETS;
        default: return PREVIEW_OBJECT_LOCATION;
    }
};

/** The avatar preview's pose - `§_-ZO§`, `§_-t1p§`, `§_-s1W§` and `§_-1q§`. */
interface AvatarPose {
    direction: number;
    headDirection: number;
    action: number;
    zoom: number;
}

const DEFAULT_POSE: AvatarPose = { direction: PREVIEW_AVATAR_DEFAULT_BODY_DIRECTION, headDirection: PREVIEW_AVATAR_DEFAULT_HEAD_DIRECTION, action: PREVIEW_ACTION_STAND, zoom: PREVIEW_ZOOM_NORMAL };

/**
 * `ProductViewCatalogWidget`'s avatar preview pose: the direction and head direction the rotate
 * buttons turn (two steps into a diagonal while sitting, only 0 and 2 while laying), the action
 * `toggle_preview_magic` cycles and the zoom `toggle_preview_zoom` flips, applied to the room
 * previewer's avatar. The callers check that the preview is in its avatar mode.
 */
export const useProductPreviewAvatarPose = (previewerRef: RefObject<RoomPreviewerHandle | null>, zoom: ProductPreviewZoom) => {
    const [ pose, setPose ] = useState<AvatarPose>(DEFAULT_POSE);

    /** `applyPreviewAvatarDirection`. */
    const applyPreviewAvatarDirection = (next: AvatarPose) => {
        const room = previewerRef.current?.room;

        if (!room) return;

        const location = getPreviewAvatarLocation(next.action);

        room.updateRoomObjectUser(ROOM_PREVIEWER_OBJECT_ID, location, location, false, 0, new Vector3d(next.direction * 45), next.headDirection * 45);
    };

    /** `applyPreviewAvatarAction`. */
    const applyPreviewAvatarAction = (next: AvatarPose) => {
        const room = previewerRef.current?.room;

        if (!room) return;

        room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureDance, 0);
        room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureExpression, 0);

        switch (next.action) {
            case PREVIEW_ACTION_WALK:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'mv');
                break;
            case PREVIEW_ACTION_DANCE:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'std');
                room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureDance, 1);
                break;
            case PREVIEW_ACTION_SIT:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'sit');
                break;
            case PREVIEW_ACTION_LAY:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'lay');
                break;
            case PREVIEW_ACTION_WAVE:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'std');
                room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureExpression, AvatarActionStateTypeUtilities.getExpressionId(AvatarActionStateType.Wave));
                break;
            default:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'std');
        }

        applyPreviewAvatarDirection(next);
    };

    /** `setPreviewMode` leaving the avatar: its pose and zoom reset at once. */
    const leaveAvatarPreview = () => {
        setPose(DEFAULT_POSE);
        zoom.setZoom(0);
    };

    /** `setPreviewMode` entering the avatar: zoomed in at once. */
    const enterAvatarPreview = () => {
        setPose({ ...DEFAULT_POSE, zoom: PREVIEW_ZOOM_IN });
        zoom.setZoom(1);
    };

    /**
     * `addAvatarIntoRoom` then `applyPreviewAvatarDirection` / `applyPreviewAvatarAction` - with the
     * pose the mode leaves: the current one if the preview was already the avatar's, else a fresh one.
     */
    const applyAvatarPose = (wasAvatarPreview: boolean) => {
        const nextPose = wasAvatarPreview ? pose : { ...DEFAULT_POSE, zoom: PREVIEW_ZOOM_IN };

        applyPreviewAvatarDirection(nextPose);
        applyPreviewAvatarAction(nextPose);
    };

    /** `rotateCurrentPreview(delta)` for the avatar. */
    const rotatePreviewAvatar = (delta: number) => {
        let step = delta;

        if ((pose.action === PREVIEW_ACTION_SIT) && isDiagonalAvatarDirection(pose.direction + step)) step *= 2;
        else if ((pose.action === PREVIEW_ACTION_LAY) && !isValidLayingDirection(pose.direction + step)) step = (pose.direction === 0) ? 2 : -pose.direction;

        const direction = normalizeAvatarDirection(pose.direction + step);
        const next = { ...pose, direction, headDirection: direction };

        setPose(next);
        applyPreviewAvatarDirection(next);
    };

    /** `cyclePreviewAvatarAction`. */
    const cyclePreviewAvatarAction = () => {
        let action = pose.action;

        do {
            action = (action + 1) % PREVIEW_ACTION_COUNT;
        } while (isPreviewAvatarActionSkippedForDirection(action, pose.direction));

        const next = { ...pose, action };

        setPose(next);
        applyPreviewAvatarAction(next);
    };

    /** `togglePreviewZoom`. */
    const togglePreviewZoom = () => {
        const nextZoom = (pose.zoom === PREVIEW_ZOOM_NORMAL) ? PREVIEW_ZOOM_IN : PREVIEW_ZOOM_NORMAL;

        setPose({ ...pose, zoom: nextZoom });
        zoom.setZoomTarget((nextZoom === PREVIEW_ZOOM_IN) ? 1 : 0);
    };

    return { leaveAvatarPreview, enterAvatarPreview, applyAvatarPose, rotatePreviewAvatar, cyclePreviewAvatarAction, togglePreviewZoom };
};

export type ProductPreviewAvatarPose = ReturnType<typeof useProductPreviewAvatarPose>;
