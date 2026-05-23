import { RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, GetTexturePool, GetTicker, RoomEnterEffect, RoomGeometry } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent, RoomObjectFurnitureActionEvent, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-shared';
import { useEffect, useRef, useState } from 'react';

import { useRoomCamera, useRoomCanvasMouse, useRoomContext, useRoomEventDispatcher, useRoomEventHandler, useRoomObjectEvent } from '#base/hooks';
import { GetPixelRatio } from '#base/utils';

export const RoomCanvasView = () => {
    const room = useRoomContext(x => x.room);
    const camera = useRoomContext(x => x.camera);
    const [size, setSize] = useState<{ width: number; height: number; resolution: number } | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);
    const { dragXY, isDragged, wasDragged, hasCursorUpdate, updateMousePointer } = useRoomCanvasMouse();
    const { updateRoomCamera } = useRoomCamera();

    useRoomEventHandler();

    useRoomObjectEvent<RoomObjectFurnitureActionEvent>([RoomObjectFurnitureActionEvent.MOUSE_ARROW, RoomObjectFurnitureActionEvent.MOUSE_BUTTON], event => {
        updateMousePointer(event.type, event.objectId, event.objectType);
    });

    useRoomEventDispatcher<RoomEngineObjectEvent>([
        RoomEngineObjectEvent.SELECTED,
        RoomEngineObjectEvent.DESELECTED,
        RoomEngineObjectEvent.ADDED,
        RoomEngineObjectEvent.REMOVED,
        RoomEngineObjectEvent.PLACED,
        RoomEngineObjectEvent.REQUEST_MOVE,
        RoomEngineObjectEvent.REQUEST_ROTATE,
        RoomEngineObjectEvent.MOUSE_ENTER,
        RoomEngineObjectEvent.MOUSE_LEAVE,
        RoomEngineObjectEvent.DOUBLE_CLICK,
    ], event => {
        //if (RoomId.isRoomPreviewerId(event.roomId)) return;

        let updateEvent: RoomWidgetUpdateRoomObjectEvent | undefined = undefined;

        switch (event.type) {
            case RoomEngineObjectEvent.SELECTED: {
                const roomObject = room?.getRoomObject(event.objectId, event.category);

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
            case RoomEngineObjectEvent.REQUEST_MOVE:
                //if (CanManipulateFurniture(roomSession, event.objectId, event.category))
                //    ProcessRoomObjectOperation(event.objectId, event.category, RoomObjectOperationType.OBJECT_MOVE);
                break;
            case RoomEngineObjectEvent.REQUEST_ROTATE:
                //if (CanManipulateFurniture(roomSession, event.objectId, event.category))
                //    ProcessRoomObjectOperation(
                //        event.objectId,
                //        event.category,
                //        RoomObjectOperationType.OBJECT_ROTATE_POSITIVE,
                //    );
                break;
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

        if (updateEvent) room?.eventDispatcher.dispatchEvent(updateEvent);
    });

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const texturePool = GetTexturePool();

        GetTicker().add(ticker => {
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

                renderer.canvas.style.cursor = room.instance.hasButtonMouseCursorOwners() ? 'pointer' : 'auto';
            }

            RoomEnterEffect.turnVisualizationOff();

            renderer.render(stage);
            texturePool.run();
        });
    }, [room, updateRoomCamera]);

    useEffect(() => {
        if (!room || !size) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const width = Math.round(size.width);
        const height = Math.round(size.height);
        const canvas = room.getRoomCanvas(width, height, RoomGeometry.SCALE_ZOOMED_IN);

        renderer.canvas.style.width = `${width}px`;
        renderer.canvas.style.height = `${height}px`;

        if (renderer.resolution !== size.resolution) {
            camera.reset();
            camera.setTarget(new Vector3d(0, 0, 0));
        }

        if (renderer.width !== width || renderer.height !== height || renderer.resolution !== size.resolution) renderer.resize(width, height, size.resolution);

        if (canvas && canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);

        renderer.render(stage);
    }, [room, size]);

    useEffect(() => {
        const renderer = GetRenderer();
        const element = elementRef?.current;

        if (!renderer || !element) return;

        if (renderer.canvas) elementRef?.current?.appendChild(renderer.canvas);

        let timer: ReturnType<typeof setTimeout>;

        const handleResize = (size: { width: number, height: number, resolution: number }) => {
            clearTimeout(timer);

            timer = setTimeout(() => setSize(size), 5);
        };

        const observer = new ResizeObserver(() => {
            const width = element.clientWidth;
            const height = element.clientHeight;
            const resolution = GetPixelRatio();

            handleResize({ width, height, resolution });
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        }
    }, []);

    return <div className="size-full" ref={elementRef}></div>;
};
