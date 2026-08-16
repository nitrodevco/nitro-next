import { FurnitureUsagePolicyEnum, IObjectData, IRoom, IRoomObjectController, IVector3D, LegacyDataType, RoomGeometryScaleType, RoomId, RoomObjectCategoryEnum, RoomObjectUserTypeName, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { GetRenderer, GetRoomEngine, GetStage, GetTicker, GetTickerTime } from "@nitrodevco/nitro-renderer";
import { PointData, Rectangle, Ticker } from "pixi.js";
import { MouseEvent, RefObject, useEffect, useEffectEvent, useRef, useState } from "react";

import { GetPixelRatio } from "#base/utils";

import { useRoomMapping } from "./useRoomMapping";

const PREVIEW_OBJECT_ID: number = 1;
const PREVIEW_OBJECT_LOCATION_X: number = 2;
const PREVIEW_OBJECT_LOCATION_Y: number = 2;
const ALLOWED_IMAGE_CUT: number = 0.5;

export const useRoomPreviewer = (roomId: number, canvasRef: RefObject<HTMLCanvasElement | null>) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [autoStateChange, setAutoStateChange] = useState<boolean>(false);
    const { createMapForSize } = useRoomMapping();
    const prevAutoStateChangeTime = useRef<number>(-1);
    const currentObjectType = useRef<number>(0);
    const currentObjectCategory = useRef<RoomObjectCategoryEnum>(RoomObjectCategoryEnum.Minimum);
    const currentObjectData = useRef<string>('');
    const currentPreviewRectangle = useRef<Rectangle>(null);
    const currentPreviewWidth = useRef<number>(0);
    const currentPreviewHeight = useRef<number>(0);
    const currentPreviewScale = useRef<number>(1);
    const addViewOffset = useRef<PointData>({ x: 0, y: 0 });
    const needsZoomOut = useRef<boolean>(false);

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

        const roomObject = room.getRoomObject(PREVIEW_OBJECT_ID, currentObjectCategory.current);

        if (!roomObject) return;

        const direction = getValidRoomObjectDirection(roomObject, true);

        switch (currentObjectCategory.current) {
            case RoomObjectCategoryEnum.Floor: {
                const loc = new Vector3d(PREVIEW_OBJECT_LOCATION_X, PREVIEW_OBJECT_LOCATION_Y);
                const dir = new Vector3d(direction, direction, direction);

                room.updateRoomObjectFloor(PREVIEW_OBJECT_ID, loc, dir, 0);
                return;
            }
        }
    }

    const onClick = useEffectEvent((event: MouseEvent<HTMLDivElement>) => {
        if (!room) return;

        if (event.shiftKey) changeObjectDirection();
        else return;
    });

    const getCanvasOffset = (point: PointData) => {
        if (!currentPreviewRectangle.current || currentPreviewRectangle.current.width < 1 || currentPreviewRectangle.current.height < 1) return point;

        let x = (-(currentPreviewRectangle.current.left + currentPreviewRectangle.current.right) >> 1);
        let y = (-(currentPreviewRectangle.current.top + currentPreviewRectangle.current.bottom) >> 1);
        const height = ((currentPreviewHeight.current - currentPreviewRectangle.current.height) >> 1);

        if (height > 10) {
            y = (y + Math.min(15, (height - 10)));
        }
        else
            if (currentObjectCategory.current !== RoomObjectCategoryEnum.Unit) {
                y = (y + (5 - Math.max(0, (height / 2))));
            }
            else {
                y = (y - (5 - Math.min(0, (height / 2))));
            }

        y = (y + addViewOffset.current.y);
        x = (x + addViewOffset.current.x);

        const offsetX = (x - point.x);
        const offsetY = (y - point.y);

        if (offsetX !== 0 || offsetY !== 0) {
            const sqrt = Math.sqrt(((offsetX * offsetX) + (offsetY * offsetY)));

            if (sqrt > 10) {
                x = (point.x + ((offsetX * 10) / sqrt));
                y = (point.y + ((offsetY * 10) / sqrt));
            }

            return { x, y };
        }

        return undefined;
    }

    const validatePreviewSize = (point: PointData) => {
        if (!room || !room.canvas || !currentPreviewRectangle.current || (currentPreviewRectangle.current.width < 1) || (currentPreviewRectangle.current.height < 1)) return point;

        if ((currentPreviewRectangle.current.width > (currentPreviewWidth.current * (1 + ALLOWED_IMAGE_CUT))) || (currentPreviewRectangle.current.height > (currentPreviewHeight.current * (1 + ALLOWED_IMAGE_CUT)))) {
            if (room.canvas.scale !== 0.5) {
                room.canvas.setScale(0.5);

                currentPreviewScale.current = 0.5;
                needsZoomOut.current = true;

                point.x = (point.x >> 1);
                point.y = (point.y >> 1);

                currentPreviewRectangle.current.x = currentPreviewRectangle.current.x >> 2;
                currentPreviewRectangle.current.y = currentPreviewRectangle.current.y >> 2;
                currentPreviewRectangle.current.width = currentPreviewRectangle.current.width >> 2;
                currentPreviewRectangle.current.height = currentPreviewRectangle.current.height >> 2;
            }
        } else if ((((currentPreviewRectangle.current.width << 1) < ((currentPreviewWidth.current * (1 + ALLOWED_IMAGE_CUT)) - 5)) && ((currentPreviewRectangle.current.height << 1) < ((currentPreviewHeight.current * (1 + ALLOWED_IMAGE_CUT)) - 5)))) {
            if (room.canvas.scale !== 1 && !needsZoomOut.current) {
                room.canvas.setScale(1);

                currentPreviewScale.current = 1;

                point.x = (point.x << 1);
                point.y = (point.y << 1);
            }
        }

        return point;
    }

    const updatePreviewObjectBoundingRectangle = (point: PointData) => {
        if (!room) return;

        const bounds = room.getRoomObjectBoundingRectangle(PREVIEW_OBJECT_ID, currentObjectCategory.current);

        if (!bounds) return;

        bounds.x += -(currentPreviewWidth.current >> 1);
        bounds.y += -(currentPreviewHeight.current >> 1);

        bounds.x += -(point.x);
        bounds.y += -(point.y);

        if (!currentPreviewRectangle.current) {
            currentPreviewRectangle.current = bounds;
        }
        else {
            const expandedBounds = currentPreviewRectangle.current.clone().enlarge(bounds);

            if (((((expandedBounds.width - currentPreviewRectangle.current.width) > ((currentPreviewWidth.current - currentPreviewRectangle.current.width) >> 1)) || ((expandedBounds.height - currentPreviewRectangle.current.height) > ((currentPreviewHeight.current - currentPreviewRectangle.current.height) >> 1))) || (currentPreviewRectangle.current.width < 1)) || (currentPreviewRectangle.current.height < 1)) currentPreviewRectangle.current = expandedBounds;
        }
    }

    const updateRoomPreview = () => {
        if (!room) return;

        let offset = room.getRoomInstanceRenderingCanvasOffset();

        updatePreviewObjectBoundingRectangle(offset);

        if (!currentPreviewRectangle.current) return;

        const scale = currentPreviewScale.current;

        offset = validatePreviewSize(offset);

        const canvasOffset = getCanvasOffset(offset);

        if (canvasOffset) room.setRoomInstanceRenderingCanvasOffset(canvasOffset);

        if (currentPreviewScale.current !== scale) currentPreviewRectangle.current = null;
    }

    const resetRoomPreview = (flag: boolean) => {
        if (!room) return;

        room.removeRoomObjectFloor(PREVIEW_OBJECT_ID);
        room.removeRoomObjectWall(PREVIEW_OBJECT_ID);
        room.removeRoomObjectUser(PREVIEW_OBJECT_ID);

        if (!flag) updateRoomPreview();

        currentObjectCategory.current = RoomObjectCategoryEnum.Minimum;
    }

    const addFurnitureIntoRoom = (classId: number, direction: IVector3D, objectData?: IObjectData, extra: number = NaN) => {
        if (!room) return;

        if (!objectData) objectData = new LegacyDataType();

        resetRoomPreview(false);

        currentObjectType.current = classId;
        currentObjectCategory.current = RoomObjectCategoryEnum.Floor;
        currentObjectData.current = '';

        if (room.addFurnitureFloorByTypeId(PREVIEW_OBJECT_ID, classId, new Vector3d(PREVIEW_OBJECT_LOCATION_X, PREVIEW_OBJECT_LOCATION_Y), direction, 0, objectData, NaN, -1, FurnitureUsagePolicyEnum.Nobody, -1, '', false, -1)) {
            prevAutoStateChangeTime.current = GetTickerTime();
            setAutoStateChange(true);

            const roomObject = room.getRoomObject(PREVIEW_OBJECT_ID, currentObjectCategory.current);

            if (roomObject && extra) roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExtras, extra);

            updateRoomPreview();

            return PREVIEW_OBJECT_ID;
        }

        return -1;
    }

    useEffect(() => {
        if (!room || !isReady) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const ticker = GetTicker();

        const handleSize = (width: number, height: number, resolution: number) => {
            const canvas = room.canvas;

            if (!canvas) room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);
            else canvas.initialize(width, height);

            //updateRoomCamera(-1);

            if (canvasRef.current) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                canvasRef.current.style.width = `${width}px`;
                canvasRef.current.style.height = `${height}px`;
            }
        }

        let timer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(x => {
            const width = ~~x[0]?.contentRect.width;
            const height = ~~x[0]?.contentRect.height;
            const resolution = GetPixelRatio();

            clearTimeout(timer);

            timer = setTimeout(() => handleSize(width, height, resolution), 5);
        });

        if (canvasRef && ('current' in canvasRef) && canvasRef.current) {
            const rect = canvasRef.current.parentElement?.getBoundingClientRect();

            if (rect) handleSize(~~rect.width, ~~rect.height, GetPixelRatio());

            observer.observe(canvasRef.current.parentElement as HTMLElement);
        }

        const tick = (ticker: Ticker) => {
            if (!room || !room.canvas?.master || !canvasRef.current) return;

            const time = ticker.lastTime;
            const update = false;

            room.update(time, update);

            updateRoomPreview();

            const extracted = renderer.extract.canvas({ target: room.canvas.master });
            const ctx = canvasRef.current.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, room.canvas.master.width, room.canvas.master.height);
                ctx.drawImage(extracted as unknown as CanvasImageSource, 0, 0, room.canvas.master.width, room.canvas.master.height);
            }
        }

        ticker.add(tick);

        return () => {
            if (observer) observer.disconnect();
            if (timer) clearTimeout(timer);
            if (ticker) ticker.remove(tick);
        }
    }, [room, isReady]);

    useEffect(() => {
        if (!room) return;

        const map = createMapForSize(7);

        if (map.wallGeometry) room.setLegacyGeometry(map.wallGeometry);

        if (map.mapData) room.applyRoomMap(map.mapData);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);

        return () => {
            setIsReady(false);
        }
    }, [room]);

    useEffect(() => {
        const inst = GetRoomEngine().createRoom(RoomId.makeRoomPreviewerId(roomId));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRoom(inst);

        return () => {
            inst.dispose();
        }
    }, [roomId]);

    return { room, addFurnitureIntoRoom };
}