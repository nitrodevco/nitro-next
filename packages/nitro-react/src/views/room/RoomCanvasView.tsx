import type { IRoomObject } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, GetTexturePool, GetTicker, RoomEnterEffect, RoomGeometry } from '@nitrodevco/nitro-renderer';
import type { RoomObjectEvent, RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';
import { RoomEngineObjectEvent, RoomObjectFurnitureActionEvent, RoomObjectMouseEvent, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-shared';
import type { Ticker } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { useRoomCamera, useRoomContext, useRoomCursor, useRoomEventDispatcher, useRoomEventHandler, useRoomMouse } from '#base/hooks';
import { GetPixelRatio } from '#base/utils';

export const RoomCanvasView = () => {
    const room = useRoomContext(x => x.room);
    const camera = useRoomContext(x => x.camera);
    const getMouseEventId = useRoomContext(x => x.getMouseEventId);
    const setMouseEventId = useRoomContext(x => x.setMouseEventId);
    const { dragXY, isDragged, wasDragged } = useRoomMouse();
    const { hasCursorUpdate, hasCursorOwners, updateMousePointer } = useRoomCursor();
    const { updateRoomCamera } = useRoomCamera();
    const setControllerLevel = useRoomContext(x => x.setControllerLevel);
    const elementRef = useRef<HTMLDivElement>(null);

    const { handleRoomObjectMouseEvent } = useRoomEventHandler();

    useRoomEventDispatcher<RoomEngineObjectEvent>([
        RoomEngineObjectEvent.SELECTED,
        RoomEngineObjectEvent.DESELECTED,
        RoomEngineObjectEvent.ADDED,
        RoomEngineObjectEvent.REMOVED,
        RoomEngineObjectEvent.PLACED,
        RoomEngineObjectEvent.MOUSE_ENTER,
        RoomEngineObjectEvent.MOUSE_LEAVE,
        RoomEngineObjectEvent.DOUBLE_CLICK,
    ], event => {
        //if (RoomId.isRoomPreviewerId(event.roomId)) return;

        let updateEvent: RoomWidgetUpdateRoomObjectEvent | undefined = undefined;

        switch (event.type) {
            case RoomEngineObjectEvent.SELECTED: {
                const roomObject = room.getRoomObject(event.objectId, event.category);

                if (!roomObject) return;

                const disabled = (roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSelectionDisabled) === 1);

                if (!disabled) { // || isModerator
                    updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                        RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED,
                        event.objectId,
                        event.category,
                        event.roomId,
                    );
                }
                break;
            }
            case RoomEngineObjectEvent.DESELECTED:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.ADDED: {
                let addedEventType: string = '';

                switch (event.category) {
                    case RoomObjectCategoryEnum.Floor:
                    case RoomObjectCategoryEnum.Wall:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_ADDED;
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.USER_ADDED;
                        break;
                }

                if (addedEventType)
                    updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                        addedEventType,
                        event.objectId,
                        event.category,
                        event.roomId,
                    );
                break;
            }
            case RoomEngineObjectEvent.REMOVED: {
                let removedEventType: string = '';

                switch (event.category) {
                    case RoomObjectCategoryEnum.Floor:
                    case RoomObjectCategoryEnum.Wall:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED;
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.USER_REMOVED;
                        break;
                }

                if (removedEventType)
                    updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                        removedEventType,
                        event.objectId,
                        event.category,
                        event.roomId,
                    );
                break;
            }
            case RoomEngineObjectEvent.MOUSE_ENTER:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.MOUSE_LEAVE:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.DOUBLE_CLICK:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_DOUBLE_CLICKED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
        }

        if (updateEvent) room.dispatchEvent(updateEvent);
    });

    useEffect(() => {
        if (!room) return;

        const handleRoomObjectEvent = (event: RoomObjectEvent) => {

            if (event instanceof RoomObjectMouseEvent) {
                handleRoomObjectMouseEvent(event);

                return;
            }

            switch (event.type) {
                case RoomObjectFurnitureActionEvent.MOUSE_ARROW:
                case RoomObjectFurnitureActionEvent.MOUSE_BUTTON: {
                    updateMousePointer(event.type, event.objectId, event.objectType);
                    return;
                }
            }
        };

        room.eventHandler.setRoomObjectEventHandler(handleRoomObjectEvent);

        return () => room.eventHandler.setRoomObjectEventHandler(undefined);
    }, [room, handleRoomObjectMouseEvent, updateMousePointer]);

    useEffect(() => {
        const handleRoomCanvasMouseEvent = (event: RoomSpriteMouseEvent, object: IRoomObject) => {
            if (!object) return;

            let category = room.getRoomObjectCategoryForType(object.type);

            if (category !== RoomObjectCategoryEnum.Room && (!room.isPlayingGame() || category !== RoomObjectCategoryEnum.Unit))
                category = RoomObjectCategoryEnum.Minimum;

            const eventId = getMouseEventId(category, event.type);

            if (eventId === event.eventId) {
                if (
                    event.type === MouseEventType.MOUSE_CLICK ||
                    event.type === MouseEventType.DOUBLE_CLICK ||
                    event.type === MouseEventType.MOUSE_DOWN ||
                    event.type === MouseEventType.MOUSE_UP ||
                    event.type === MouseEventType.MOUSE_MOVE
                )
                    return;
            } else if (event.eventId) {
                setMouseEventId(category, event.type, event.eventId);
            }

            if (object.mouseHandler) object.mouseHandler.mouseEvent(event, room.getGeometry());
        };

        room.eventHandler.setRoomCanvasMouseHandler(handleRoomCanvasMouseEvent);

        return () => room.eventHandler.setRoomCanvasMouseHandler(undefined);
    }, [room, getMouseEventId, setMouseEventId]);

    useEffect(() => {
        const renderer = GetRenderer();
        const stage = GetStage();
        const texturePool = GetTexturePool();

        const tick = (ticker: Ticker) => {
            if (!room) return;

            const time = ticker.lastTime;
            const update = false;

            RoomEnterEffect.turnVisualizationOn();

            room.instance.update(time, update);

            if (!isDragged.current) updateRoomCamera(time);

            if (wasDragged.current) {
                const offsetX = ~~(room.instance.canvas?.screenOffsetX || 0);
                const offsetY = ~~(room.instance.canvas?.screenOffsetY || 0);

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + dragXY.current.x), y: (offsetY + dragXY.current.y) });

                dragXY.current = { x: 0, y: 0 };
            }

            if (hasCursorUpdate.current) {
                hasCursorUpdate.current = false;

                renderer.canvas.style.cursor = hasCursorOwners() ? 'pointer' : 'auto';
            }

            RoomEnterEffect.turnVisualizationOff();

            renderer.render(stage);
            texturePool.run();
        }

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        }
    }, [room, dragXY, hasCursorUpdate, isDragged, wasDragged, hasCursorOwners, updateRoomCamera]);

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();

        if (renderer?.canvas) elementRef?.current?.appendChild(renderer.canvas);

        const handleSize = (width: number, height: number, resolution: number) => {
            const canvas = room.getRoomCanvas(width, height, RoomGeometry.SCALE_ZOOMED_IN);

            renderer.canvas.style.width = `${width}px`;
            renderer.canvas.style.height = `${height}px`;

            if (renderer.resolution !== resolution && camera) {
                camera.reset();
                camera.setTarget(new Vector3d(0, 0, 0));
            }

            if (renderer.width !== width || renderer.height !== height || renderer.resolution !== resolution) renderer.resize(width, height, resolution);

            if (canvas && canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);

            renderer.render(stage);
        }

        let timer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(x => {
            const width = x[0]?.contentRect.width;
            const height = x[0]?.contentRect.height;
            const resolution = GetPixelRatio();

            clearTimeout(timer);

            timer = setTimeout(() => handleSize(width, height, resolution), 5);
        });

        if (elementRef.current) observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        }
    }, [room, camera]);

    return <div className="size-full" ref={elementRef}></div>;
};
