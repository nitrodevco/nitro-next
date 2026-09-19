import { FurnitureUsagePolicyEnum, IObjectData, IRoom, IRoomObjectController, IRoomPreviewerData, IVector3D, LegacyDataType, RoomEngineObjectEvent, RoomGeometryScaleType, RoomId, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeName, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, GetRenderer, GetRoomEngine, GetTicker, GetTickerTime } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, PointData } from 'pixi.js';
import { RefObject, useEffect, useRef } from 'react';

import { useRoomMapping } from './useRoomMapping';

const PREVIEW_OBJECT_ID: number = 1;
const PREVIEW_OBJECT_LOCATION_X: number = 2;
const PREVIEW_OBJECT_LOCATION_Y: number = 2;
const ALLOWED_IMAGE_CUT: number = 0.5;
const AUTOMATIC_STATE_CHANGE_INTERVAL: number = 2500;
const AVATAR_DIRECTIONS: number = 8;
const AVATAR_DEFAULT_DIRECTION: number = 4;

export interface RoomPreviewerOptions {
    /** Drop the canvas's opaque black backdrop so the preview composites over the UI beneath it. */
    transparent?: boolean;
    /** A fixed canvas scale (`room.canvas.setScale`). Unset, the preview picks 1 or 0.5 itself to keep the object in frame. */
    scale?: number;
    /** Walls/floor are hidden by default so only the previewed object shows. */
    showWalls?: boolean;
    showFloor?: boolean;
}

/** The last object a consumer asked the preview to show - replayed into a room that arrives or is recreated later. */
type PreviewRequest
    = | { kind: 'avatar'; figure: string; gender?: string; effect: number }
        | { kind: 'floor'; classId: number; direction: IVector3D; objectData?: IObjectData; extra: number }
        | { kind: 'wall'; classId: number; direction: IVector3D; objectData: string };

/** What `useRoomPreviewer` returns - also the `RoomPreviewer` component's ref handle. */
export interface RoomPreviewerApi {
    room: IRoom | undefined;
    /** Places (or replaces) the avatar and returns its object id, -1 when the room isn't ready. */
    addAvatar: (figure: string, effect?: number, gender?: string) => number;
    /**
     * Re-dresses the placed avatar in place (no re-add) - falls back to `addAvatar` if none is
     * placed yet, waits for the room if it doesn't exist yet, and for the figure's libraries so
     * the placeholder avatar never shows.
     */
    updateAvatar: (figure: string, gender?: string) => void;
    /** Turns the placed avatar one step (45deg) clockwise, or counter-clockwise with `forward = false`. */
    rotateAvatar: (forward?: boolean) => void;
    addFloorItem: (classId: number, direction: IVector3D, objectData?: IObjectData, extra?: number) => number;
    addWallItem: (classId: number, direction: IVector3D, objectData: string) => number;
    /** Furniture controls: turn the floor item to its next allowed direction / advance its state. */
    changeObjectDirection: () => void;
    changeObjectState: () => void;
}

/**
 * Where the preview draws: a Pixi container (the room's master canvas is parented into it and
 * its Yoga-computed size drives the room canvas) or a DOM `<canvas>` (the room is rendered
 * off-screen and blitted into it every frame, sized by its parent element).
 */
export type RoomPreviewerTarget = PixiContainer | HTMLCanvasElement;

/**
 * The engine room a previewer draws into, created and given its small showcase floor on first
 * use. `createRoom` hands back the existing room for an id, and the floor is only laid while the
 * room is uninitialized, so reading this during render is idempotent - the room outlives any one
 * previewer, which is why there is nothing to hold in state.
 */
const getPreviewerRoom = (roomId: number, createMapForSize: ReturnType<typeof useRoomMapping>['createMapForSize']): IRoom => {
    const room = GetRoomEngine().createRoom(RoomId.makeRoomPreviewerId(roomId));

    if (!room.isInitialized) {
        const map = createMapForSize(7);

        if (map.wallGeometry) room.setLegacyGeometry(map.wallGeometry);

        if (map.mapData) room.applyRoomMap(map.mapData);

        room.updateRoomPlaneType('110', '99999', undefined);

        // Flash `RoomPreviewer.applyInvisibleLayerState`: a showcase never draws the layers tagged
        // `invisible`. Set on the room, every furni previewed in it starts with the flag.
        room.setInvisibleFurni(true);
    }

    return room;
};

/**
 * A temp room used as an object showcase (catalog products, the avatar editor's figure): one
 * preview object at a fixed tile, auto-centred by nudging the canvas offset, auto-cycling its
 * state, scaled to fit. The same logic serves both render targets - only how the frame reaches
 * the screen differs, see `RoomPreviewerTarget`.
 */
export const useRoomPreviewer = (roomId: number, targetRef: RefObject<RoomPreviewerTarget | null>, { transparent = false, scale, showWalls = false, showFloor = false }: RoomPreviewerOptions = {}): RoomPreviewerApi => {
    const { createMapForSize } = useRoomMapping();
    const room: IRoom | undefined = getPreviewerRoom(roomId, createMapForSize);
    const mountedMasterRef = useRef<PixiContainer | undefined>(undefined);
    const avatarDirection = useRef(AVATAR_DEFAULT_DIRECTION);
    // The object the consumer last asked for. A room can be recreated empty on a `roomId` change,
    // and a request can land before the room's effects have run - either way, this is what gets
    // (re)placed once the room is set up.
    const requested = useRef<PreviewRequest | null>(null);
    // Bumped per `updateAvatar` so a slow library download can't apply a figure since replaced.
    const avatarRequest = useRef(0);
    // The first object to get a bounding box is centred in one jump; every move after that
    // (a re-dressed avatar, the next catalog offer) glides at `maxDrag` per frame.
    const snapToFirstObject = useRef(true);
    const previewData = useRef<IRoomPreviewerData>({
        objectType: 0,
        objectCategory: RoomObjectCategoryEnum.Minimum,
        objectData: '',
        previewRectangle: undefined,
        previewWidth: 0,
        previewHeight: 0,
        previewScale: 1,
        previewOffset: { x: 0, y: 0 },
        autoStateChange: false,
        autoStateChangeTime: -1,
    });

    const getValidRoomObjectDirection = (roomObject: IRoomObjectController, forward: boolean) => {
        if (!roomObject?.model) return 0;

        const allowedDirections: number[] = roomObject.type === RoomObjectUserTypeName.MonsterPlant
            ? roomObject.model.getValue<number[]>(RoomObjectVariableEnum.PetAllowedDirections)
            : roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

        const direction = roomObject.getDirection().x;

        if (!allowedDirections?.length) return direction;

        let dirIndex = allowedDirections.indexOf(direction);

        if (dirIndex < 0) {
            const insertAt = allowedDirections.findIndex(d => direction <= d);
            dirIndex = insertAt < 0 ? 0 : insertAt;
        }

        dirIndex = forward
            ? (dirIndex + 1) % allowedDirections.length
            : (dirIndex - 1 + allowedDirections.length) % allowedDirections.length;

        return allowedDirections[dirIndex];
    };

    const changeObjectDirection = () => {
        if (!room) return;

        const { objectCategory } = previewData.current;

        const roomObject = room.getRoomObject(PREVIEW_OBJECT_ID, objectCategory);

        if (!roomObject) return;

        const direction = getValidRoomObjectDirection(roomObject, true);

        switch (objectCategory) {
            case RoomObjectCategoryEnum.Floor: {
                const loc = new Vector3d(PREVIEW_OBJECT_LOCATION_X, PREVIEW_OBJECT_LOCATION_Y);
                const dir = new Vector3d(direction, direction, direction);

                room.updateRoomObjectFloor(PREVIEW_OBJECT_ID, loc, dir, 0);
                return;
            }
        }

        updateRoomPreview();
    };

    const changeObjectState = () => {
        if (!room) return;

        const { objectCategory } = previewData.current;

        previewData.current.autoStateChange = false;

        if (objectCategory !== RoomObjectCategoryEnum.Unit) room.updateRoomObjectState(PREVIEW_OBJECT_ID, objectCategory);

        updateRoomPreview();
    };

    const checkAutomaticObjectStateChange = () => {
        const { autoStateChange, autoStateChangeTime, objectCategory } = previewData.current;

        if (!room || !autoStateChange) return;

        const time = GetTickerTime();

        if (time > (autoStateChangeTime + AUTOMATIC_STATE_CHANGE_INTERVAL)) {
            previewData.current.autoStateChangeTime = time;

            room.updateRoomObjectState(PREVIEW_OBJECT_ID, objectCategory);
        }
    };

    const getCanvasOffset = (point: PointData) => {
        const { previewRectangle, previewHeight, previewScale, objectCategory, previewOffset } = previewData.current;

        if (!previewRectangle || previewRectangle.width < 1 || previewRectangle.height < 1) return point;

        let x = (-(previewRectangle.left + previewRectangle.right) >> 1);
        let y = (-(previewRectangle.top + previewRectangle.bottom) >> 1);
        const height = ((previewHeight - previewRectangle.height) >> 1);

        const scaledThreshold = 10 * previewScale;
        const scaledMaxAdjust = 15 * previewScale;
        const scaledBaseOffset = 5 * previewScale;

        if (height > scaledThreshold) {
            y = (y + Math.min(scaledMaxAdjust, (height - scaledThreshold)));
        } else if (objectCategory !== RoomObjectCategoryEnum.Unit) {
            y = (y + (scaledBaseOffset - Math.max(0, (height / 2))));
        } else {
            y = (y - (scaledBaseOffset - Math.min(0, (height / 2))));
        }

        y = (y + previewOffset.y);
        x = (x + previewOffset.x);

        const offsetX = (x - point.x);
        const offsetY = (y - point.y);

        if (snapToFirstObject.current) {
            snapToFirstObject.current = false;

            return (offsetX !== 0 || offsetY !== 0) ? { x, y } : undefined;
        }

        if (offsetX !== 0 || offsetY !== 0) {
            const sqrt = Math.sqrt(((offsetX * offsetX) + (offsetY * offsetY)));
            const maxDrag = 10 * previewScale;

            if (sqrt > maxDrag) {
                x = (point.x + ((offsetX * maxDrag) / sqrt));
                y = (point.y + ((offsetY * maxDrag) / sqrt));
            }

            return { x, y };
        }

        return undefined;
    };

    const applyFixedScale = () => {
        if (!room?.canvas || scale === undefined || room.canvas.scale === scale) return;

        room.canvas.setScale(scale);

        previewData.current.previewScale = scale;
        previewData.current.previewRectangle = undefined;
    };

    const validatePreviewSize = (point: PointData) => {
        const { previewRectangle, previewWidth, previewHeight } = previewData.current;

        if (scale !== undefined) {
            applyFixedScale();

            return point;
        }

        if (!room || !room.canvas || !previewRectangle || (previewRectangle.width < 1) || (previewRectangle.height < 1)) return point;

        if ((previewRectangle.width > (previewWidth * (1 + ALLOWED_IMAGE_CUT))) || (previewRectangle.height > (previewHeight * (1 + ALLOWED_IMAGE_CUT)))) {
            if (room.canvas.scale !== 0.5) {
                room.canvas.setScale(0.5);

                previewData.current.previewScale = 0.5;

                point.x = (point.x >> 1);
                point.y = (point.y >> 1);

                previewRectangle.x = previewRectangle.x >> 1;
                previewRectangle.y = previewRectangle.y >> 1;
                previewRectangle.width = previewRectangle.width >> 1;
                previewRectangle.height = previewRectangle.height >> 1;
            }
        } else if ((((previewRectangle.width << 1) < ((previewWidth * (1 + ALLOWED_IMAGE_CUT)) - 5)) && ((previewRectangle.height << 1) < ((previewHeight * (1 + ALLOWED_IMAGE_CUT)) - 5)))) {
            if (room.canvas.scale !== 1) {
                room.canvas.setScale(1);

                previewData.current.previewScale = 1;

                point.x = (point.x << 1);
                point.y = (point.y << 1);
            }
        }

        return point;
    };

    const updatePreviewObjectBoundingRectangle = (point: PointData) => {
        if (!room) return;

        const { objectCategory, previewWidth, previewHeight, previewRectangle } = previewData.current;

        const bounds = room.getRoomObjectBoundingRectangle(PREVIEW_OBJECT_ID, objectCategory);

        if (!bounds) return;

        bounds.x += -(previewWidth >> 1);
        bounds.y += -(previewHeight >> 1);

        bounds.x += -(point.x);
        bounds.y += -(point.y);

        if (!previewRectangle) {
            previewData.current.previewRectangle = bounds;
        } else {
            const expandedBounds = previewRectangle.clone().enlarge(bounds);

            if (((((expandedBounds.width - previewRectangle.width) > ((previewWidth - previewRectangle.width) >> 1)) || ((expandedBounds.height - previewRectangle.height) > ((previewHeight - previewRectangle.height) >> 1))) || (previewRectangle.width < 1)) || (previewRectangle.height < 1)) previewData.current.previewRectangle = expandedBounds;
        }
    };

    const resizeRoomPreview = (width: number, height: number) => {
        if (!room) return;

        const canvas = room.canvas;

        previewData.current.previewWidth = width;
        previewData.current.previewHeight = height;
        // Whatever was measured against the old size is wrong for this one; the next frame
        // centres the object in one jump rather than gliding over from where it was.
        previewData.current.previewRectangle = undefined;
        snapToFirstObject.current = true;

        if (!canvas) room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);
        else canvas.initialize(width, height);

        room.canvas?.setBackgroundVisible(!transparent);
        applyFixedScale();

        const target = targetRef.current;

        if (target instanceof HTMLCanvasElement) {
            target.width = width;
            target.height = height;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;

            render();
        }
    };

    const updateRoomPreview = () => {
        if (!room) return;

        checkAutomaticObjectStateChange();

        // Nothing to centre in until the target has a size: a rectangle measured against 0x0
        // would park the object in the corner and use up the snap. On a remount the room is
        // still there with an object in it, so this is reached before the first layout.
        if ((previewData.current.previewWidth <= 0) || (previewData.current.previewHeight <= 0)) return;

        let offset = room.getRoomInstanceRenderingCanvasOffset();

        updatePreviewObjectBoundingRectangle(offset);

        const { previewRectangle, previewScale } = previewData.current;

        if (!previewRectangle) return;

        const scale = previewScale;

        offset = validatePreviewSize(offset);

        const canvasOffset = getCanvasOffset(offset);

        if (canvasOffset) room.setRoomInstanceRenderingCanvasOffset(canvasOffset);

        if (previewData.current.previewScale !== scale) previewData.current.previewRectangle = undefined;
    };

    const resetRoomPreview = (flag: boolean) => {
        if (!room) return;

        room.removeRoomObjectFloor(PREVIEW_OBJECT_ID);
        room.removeRoomObjectWall(PREVIEW_OBJECT_ID);
        room.removeRoomObjectUser(PREVIEW_OBJECT_ID);

        if (!flag) updateRoomPreview();

        previewData.current.objectCategory = RoomObjectCategoryEnum.Minimum;
    };

    const addFloorItem = (classId: number, direction: IVector3D, objectData?: IObjectData, extra: number = NaN) => {
        requested.current = { kind: 'floor', classId, direction, objectData, extra };

        if (!room) return -1;

        if (!objectData) objectData = new LegacyDataType();

        resetRoomPreview(false);

        previewData.current.objectType = classId;
        previewData.current.objectCategory = RoomObjectCategoryEnum.Floor;
        previewData.current.objectData = '';

        if (!room.addFurnitureFloorByTypeId(PREVIEW_OBJECT_ID, classId, new Vector3d(PREVIEW_OBJECT_LOCATION_X, PREVIEW_OBJECT_LOCATION_Y), direction, 0, objectData, NaN, -1, FurnitureUsagePolicyEnum.Nobody, -1, '', false, -1)) return -1;

        previewData.current.autoStateChangeTime = GetTickerTime();
        previewData.current.autoStateChange = true;

        const roomObject = room.getRoomObject(PREVIEW_OBJECT_ID, previewData.current.objectCategory);

        if (roomObject && extra) roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExtras, extra);

        updateRoomPreview();

        return PREVIEW_OBJECT_ID;
    };

    const addWallItem = (classId: number, direction: IVector3D, objectData: string) => {
        requested.current = { kind: 'wall', classId, direction, objectData };

        if (!room) return -1;

        if (previewData.current.objectCategory === RoomObjectCategoryEnum.Floor && previewData.current.objectType === classId && previewData.current.objectData === objectData) return PREVIEW_OBJECT_ID;

        resetRoomPreview(false);

        previewData.current.objectType = classId;
        previewData.current.objectCategory = RoomObjectCategoryEnum.Wall;
        previewData.current.objectData = objectData;

        if (!room.addFurnitureWallByTypeId(PREVIEW_OBJECT_ID, classId, new Vector3d(0.5, 2.3, 1.8), direction, 0, objectData, -1, FurnitureUsagePolicyEnum.Nobody, -1, '', false)) return -1;

        previewData.current.autoStateChangeTime = GetTickerTime();
        previewData.current.autoStateChange = true;

        updateRoomPreview();

        return PREVIEW_OBJECT_ID;
    };

    const addAvatar = (figure: string, effect: number = 0, gender?: string) => {
        requested.current = { kind: 'avatar', figure, gender, effect };

        if (!room) return -1;

        resetRoomPreview(false);

        previewData.current.objectType = 1;
        previewData.current.objectCategory = RoomObjectCategoryEnum.Unit;
        previewData.current.objectData = figure;

        const degrees = avatarDirection.current * 45;

        if (!room.addRoomObjectUser(PREVIEW_OBJECT_ID, new Vector3d(PREVIEW_OBJECT_LOCATION_X, PREVIEW_OBJECT_LOCATION_Y), new Vector3d(degrees), degrees, RoomObjectUserType.User, figure)) return -1;

        previewData.current.autoStateChangeTime = GetTickerTime();
        previewData.current.autoStateChange = true;

        room.updateRoomObjectUserGesture(PREVIEW_OBJECT_ID, 1);
        room.updateRoomObjectUserEffect(PREVIEW_OBJECT_ID, effect);
        room.updateRoomObjectUserPosture(PREVIEW_OBJECT_ID, 'std');

        updateRoomPreview();

        return PREVIEW_OBJECT_ID;
    };

    const placedAvatar = () => room?.getRoomObject(PREVIEW_OBJECT_ID, RoomObjectCategoryEnum.Unit);

    const applyAvatar = (figure: string, gender?: string, effect: number = 0) => {
        if (!room) return;

        if (!placedAvatar()) {
            addAvatar(figure, effect, gender);

            return;
        }

        requested.current = { kind: 'avatar', figure, gender, effect };

        room.updateRoomObjectUserFigure(PREVIEW_OBJECT_ID, figure, gender);
        room.updateRoomObjectUserEffect(PREVIEW_OBJECT_ID, effect);
    };

    const updateAvatar = (figure: string, gender?: string, effect: number = 0) => {
        if (!room) {
            requested.current = { kind: 'avatar', figure, gender, effect };

            return;
        }

        const request = ++avatarRequest.current;
        const renderManager = GetAvatarRenderManager();
        const container = renderManager.createFigureContainer(figure);

        if (renderManager.isFigureContainerReady(container)) {
            applyAvatar(figure, gender, effect);

            return;
        }

        // Re-dressing with a figure whose libraries aren't loaded swaps in the translucent
        // placeholder avatar until they are - keep the current look on screen instead and
        // switch once the new one can actually render.
        void renderManager.downloadAvatarFigureAsync(container).then(() => {
            if (request === avatarRequest.current) applyAvatar(figure, gender, effect);
        });
    };

    const rotateAvatar = (forward: boolean = true) => {
        if (!room || !placedAvatar()) return;

        avatarDirection.current = (avatarDirection.current + (forward ? 1 : AVATAR_DIRECTIONS - 1)) % AVATAR_DIRECTIONS;

        const degrees = avatarDirection.current * 45;

        room.updateRoomObjectUserDirection(PREVIEW_OBJECT_ID, new Vector3d(degrees), degrees);
    };

    /** DOM target: blit the room's master container (advanced by the engine tick) into the `<canvas>`. */
    const renderToCanvas = (canvas: HTMLCanvasElement) => {
        if (!room?.canvas?.master) return;

        updateRoomPreview();

        const extracted = GetRenderer().extract.canvas({ target: room.canvas.master });
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctx.clearRect(0, 0, room.canvas.master.width, room.canvas.master.height);

        ctx.drawImage(extracted as unknown as CanvasImageSource, 0, 0, room.canvas.master.width, room.canvas.master.height);
    };

    /** Pixi target: keep the room's master container (advanced by the engine tick) parented under the node. */
    const renderIntoContainer = (node: PixiContainer) => {
        if (!room?.canvas?.master) return;

        updateRoomPreview();

        // The check is against the master's actual parent, not just the ref - React can remount
        // the node while the ref still points at the old master.
        const master = room.canvas.master;

        if (master.parent !== node) {
            if (mountedMasterRef.current && mountedMasterRef.current !== master) mountedMasterRef.current.parent?.removeChild(mountedMasterRef.current);

            node.addChild(master);
            mountedMasterRef.current = master;
        }
    };

    const render = () => {
        const target = targetRef.current;

        if (!target) return;

        if (target instanceof HTMLCanvasElement) renderToCanvas(target);
        else renderIntoContainer(target);
    };

    useEffect(() => {
        room?.canvas?.setBackgroundVisible(!transparent);
        applyFixedScale();
    }, [ room, transparent, scale ]);

    useEffect(() => {
        room?.updateRoomPlaneVisibilities(showWalls, showFloor);
    }, [ room, showWalls, showFloor ]);

    // The room outlives the hook (it's kept in the engine), so on mount it may still hold the
    // object a previous previewer left in it: clear that, or place whatever this one asked for.
    useEffect(() => {
        if (!room) return;

        // A different room is a fresh showcase: its first object is centred in one jump.
        snapToFirstObject.current = true;

        const request = requested.current;

        if (!request) {
            resetRoomPreview(true);

            return;
        }

        switch (request.kind) {
            case 'avatar':
                updateAvatar(request.figure, request.gender, request.effect);
                break;
            case 'floor':
                addFloorItem(request.classId, request.direction, request.objectData, request.extra);
                break;
            case 'wall':
                addWallItem(request.classId, request.direction, request.objectData);
                break;
        }
    }, [ room ]);

    useEffect(() => {
        if (!room) return;

        // Presentation runs after the engine's HIGH-priority room tick (default priority is NORMAL).
        const tick = () => render();

        GetTicker().add(tick);

        let timer: ReturnType<typeof setTimeout> | undefined;
        let observer: ResizeObserver | undefined;
        let layoutNode: PixiContainer | undefined;
        const target = targetRef.current;

        // Pixi: the node's Yoga size, from @pixi/layout's `layout` event rather than polling.
        const onLayout = () => {
            if (!layoutNode) return;

            const width = Math.floor(layoutNode.layout?.computedLayout?.width ?? layoutNode.width ?? 0);
            const height = Math.floor(layoutNode.layout?.computedLayout?.height ?? layoutNode.height ?? 0);

            if (width > 0 && height > 0 && (width !== previewData.current.previewWidth || height !== previewData.current.previewHeight)) resizeRoomPreview(width, height);
        };

        if (target && !(target instanceof HTMLCanvasElement)) {
            layoutNode = target;

            layoutNode.on('layout', onLayout);
            onLayout();
        }

        // DOM: the <canvas> follows its parent element's size.
        if (target instanceof HTMLCanvasElement && target.parentElement) {
            const parent = target.parentElement;
            const rect = parent.getBoundingClientRect();

            resizeRoomPreview(Math.floor(rect.width), Math.floor(rect.height));

            observer = new ResizeObserver((entries) => {
                const { width, height } = entries[0]?.contentRect ?? { width: 0, height: 0 };

                clearTimeout(timer);

                timer = setTimeout(() => resizeRoomPreview(Math.floor(width), Math.floor(height)), 5);
            });

            observer.observe(parent);
        }

        const onObjectEvent = (event: RoomEngineObjectEvent) => {
            if (!event || event.type !== RoomEngineObjectEvent.ADDED) return;

            previewData.current.previewRectangle = undefined;

            const roomObject = room.getRoomObject(event.objectId, event.category);

            if (roomObject && event.category === RoomObjectCategoryEnum.Wall) {
                const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);
                const centerZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCenterZ);

                room.updateRoomObjectWallLocation(event.objectId, new Vector3d(0.5, 2.3, (((3.6 - sizeZ) / 2) + centerZ)));
            }
        };

        const listeners = [
            room.eventDispatcher.addEventListener(RoomEngineObjectEvent.ADDED, onObjectEvent),
        ];

        return () => {
            GetTicker().remove(tick);
            layoutNode?.off('layout', onLayout);
            observer?.disconnect();
            clearTimeout(timer);
            listeners.map(x => x?.());

            if (mountedMasterRef.current?.parent) mountedMasterRef.current.parent.removeChild(mountedMasterRef.current);

            mountedMasterRef.current = undefined;
        };
    }, [ room ]);

    return { room, addAvatar, updateAvatar, rotateAvatar, addFloorItem, addWallItem, changeObjectDirection, changeObjectState };
};
