import { FurnitureUsagePolicyEnum, IObjectData, IRoom, IRoomObjectController, IRoomPreviewerData, IVector3D, LegacyDataType, RoomEngineObjectEvent, RoomGeometryScaleType, RoomId, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectUserTypeName, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine, GetTicker, GetTickerTime } from '@nitrodevco/nitro-renderer';
import type { Container as PixiContainer , PointData, Ticker } from 'pixi.js';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { useRoomMapping } from '#base/hooks/room/useRoomMapping';

const PREVIEW_OBJECT_ID: number = 1;
const PREVIEW_OBJECT_LOCATION_X: number = 2;
const PREVIEW_OBJECT_LOCATION_Y: number = 2;
const ALLOWED_IMAGE_CUT: number = 0.5;
const AUTOMATIC_STATE_CHANGE_INTERVAL: number = 2500;

/**
 * Pixi port of hooks/room/useRoomPreviewer.tsx. DOM extracts the temp room's own offscreen
 * `room.canvas.master` (a plain Pixi `Container` - confirmed via RoomSpriteCanvas.ts's `get
 * master()`) into a 2D `<canvas>` every tick via `GetRenderer().extract.canvas()`, purely
 * because DOM needs an HTML element to show it in. Since this whole app already shares one Pixi
 * renderer/stage, that round-trip is unnecessary here: this mounts `room.canvas.master` as a
 * real child of the caller's own Pixi container directly (the same "add an external engine
 * container into the UI's own tree" technique PixiApplicationRoot.tsx already uses for the main
 * room's `GetStage()`), so it renders natively without ever touching a 2D context. Sizing swaps
 * DOM's `ResizeObserver` (no DOM element here to observe) for the same `requestAnimationFrame`
 * + `.layout.computedLayout` polling this package already uses everywhere else for a Pixi
 * container's yoga-computed size (see InfiniteGrid.tsx).
 */
export const useRoomPreviewerPixi = (roomId: number, containerRef: React.RefObject<PixiContainer | null>) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);
    const { createMapForSize } = useRoomMapping();
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

    const onObjectEvent = useEffectEvent((event: RoomEngineObjectEvent) => {
        if (!room || !event) return;

        switch (event.type) {
            case RoomEngineObjectEvent.ADDED: {
                previewData.current.previewRectangle = undefined;

                const roomObject = room.getRoomObject(event.objectId, event.category);

                if (roomObject && event.category === RoomObjectCategoryEnum.Wall) {
                    const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);
                    const centerZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCenterZ);

                    room.updateRoomObjectWallLocation(event.objectId, new Vector3d(0.5, 2.3, (((3.6 - sizeZ) / 2) + centerZ)));
                }
            }
        }
    });

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

    const validatePreviewSize = (point: PointData) => {
        const { previewRectangle, previewWidth, previewHeight } = previewData.current;

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
        if (!room || width < 1 || height < 1) return;

        const canvas = room.canvas;

        previewData.current.previewWidth = width;
        previewData.current.previewHeight = height;

        if (!canvas) room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);
        else canvas.initialize(width, height);
    };

    const updateRoomPreview = () => {
        if (!room) return;

        checkAutomaticObjectStateChange();

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

    const addFloorItemIntoRoom = (classId: number, direction: IVector3D, objectData?: IObjectData, extra: number = NaN) => {
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

    const addWallItemIntoRoom = (classId: number, direction: IVector3D, objectData: string) => {
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

    const addAvatarIntoRoom = (figure: string, effect: number) => {
        if (!room) return -1;

        resetRoomPreview(false);

        previewData.current.objectType = 1;
        previewData.current.objectCategory = RoomObjectCategoryEnum.Unit;
        previewData.current.objectData = figure;

        if (!room.addRoomObjectUser(PREVIEW_OBJECT_ID, new Vector3d(PREVIEW_OBJECT_LOCATION_X, PREVIEW_OBJECT_LOCATION_Y), new Vector3d(90), 135, RoomObjectUserType.User, figure)) return -1;

        previewData.current.autoStateChangeTime = GetTickerTime();
        previewData.current.autoStateChange = true;

        room.updateRoomObjectUserGesture(PREVIEW_OBJECT_ID, 1);
        room.updateRoomObjectUserEffect(PREVIEW_OBJECT_ID, effect);
        room.updateRoomObjectUserPosture(PREVIEW_OBJECT_ID, 'std');

        updateRoomPreview();

        return PREVIEW_OBJECT_ID;
    };

    const mountedMasterRef = useRef<PixiContainer | undefined>(undefined);

    const render = (time: number = -1) => {
        if (!room || !room.canvas?.master || !containerRef.current) return;

        room.update(time);

        updateRoomPreview();

        if (mountedMasterRef.current !== room.canvas.master) {
            if (mountedMasterRef.current?.parent) mountedMasterRef.current.parent.removeChild(mountedMasterRef.current);

            containerRef.current.addChild(room.canvas.master);
            mountedMasterRef.current = room.canvas.master;
        }
    };

    useEffect(() => {
        if (!room) return;

        const ticker = GetTicker();

        const tick = (ticker: Ticker) => render(ticker.lastTime);

        ticker.add(tick);

        let raf = 0;
        let lastWidth = -1;
        let lastHeight = -1;
        let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

        const poll = () => {
            const node = containerRef.current;

            if (node) {
                const width = Math.floor(node.layout?.computedLayout?.width ?? node.width ?? 0);
                const height = Math.floor(node.layout?.computedLayout?.height ?? node.height ?? 0);

                if ((width !== lastWidth || height !== lastHeight) && width > 0 && height > 0) {
                    lastWidth = width;
                    lastHeight = height;

                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => resizeRoomPreview(width, height), 5);
                }
            }

            raf = requestAnimationFrame(poll);
        };
        raf = requestAnimationFrame(poll);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimeout);
            ticker.remove(tick);

            if (mountedMasterRef.current?.parent) mountedMasterRef.current.parent.removeChild(mountedMasterRef.current);
            mountedMasterRef.current = undefined;
        };
    }, [room]);

    useEffect(() => {
        const inst = GetRoomEngine().createRoom(RoomId.makeRoomPreviewerId(roomId));

        if (!inst.isInitialized) {
            const map = createMapForSize(7);

            if (map.wallGeometry) inst.setLegacyGeometry(map.wallGeometry);

            if (map.mapData) inst.applyRoomMap(map.mapData);

            inst.updateRoomPlaneType('110', '99999', undefined);
        }

        const listeners = [
            inst.eventDispatcher.addEventListener(RoomEngineObjectEvent.ADDED, onObjectEvent),
        ];

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRoom(inst);

        return () => {
            listeners.map(x => x?.());
        };
    }, [roomId]);

    return { room, addFloorItemIntoRoom, addWallItemIntoRoom, addAvatarIntoRoom, changeObjectDirection, changeObjectState };
};
