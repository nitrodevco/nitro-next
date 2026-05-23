import { MouseEventType, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, RoomGeometry } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-shared';
import { useEffect, useRef, useState } from 'react';

import { useRoomContext, useRoomEventDispatcher, useRoomEventHandler } from '#base/hooks';
import { GetPixelRatio } from '#base/utils';

export const RoomCanvasView = () => {
    const { room } = useRoomContext();
    const [size, setSize] = useState<{ width: number; height: number; resolution: number } | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);

    useRoomEventHandler();

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
    })

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
            room.camera.reset();
            room.camera.setTarget(new Vector3d(0, 0, 0));
        }

        if (renderer.width !== width || renderer.height !== height || renderer.resolution !== size.resolution) renderer.resize(width, height, size.resolution);

        if (canvas && canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);

        renderer.render(stage);
    }, [room, size]);

    useEffect(() => {
        if (!room) return;

        const canvas = GetRenderer().canvas;
        let didMouseMove = false;
        let isMouseDown = false;
        let lastClick = 0;
        let clickCount = 0;

        const mouseHandler = (event: MouseEvent) => {
            event.preventDefault();

            let eventType = event.type;

            if (eventType === MouseEventType.MOUSE_CLICK) {
                if (lastClick) {
                    clickCount = 1;

                    if (lastClick >= Date.now() - 300) clickCount++;
                }

                lastClick = Date.now();

                if (clickCount === 2) {
                    if (!didMouseMove) eventType = MouseEventType.DOUBLE_CLICK;

                    clickCount = 0;
                    lastClick = 0;
                }
            }

            switch (eventType) {
                case MouseEventType.MOUSE_CLICK:
                    break;
                case MouseEventType.DOUBLE_CLICK:
                    break;
                case MouseEventType.MOUSE_MOVE:
                    didMouseMove = true;
                    break;
                case MouseEventType.MOUSE_DOWN:
                    didMouseMove = false;
                    isMouseDown = true;
                    break;
                case MouseEventType.MOUSE_UP:
                    isMouseDown = false;
                    break;
                case MouseEventType.RIGHT_CLICK:
                    break;
                default:
                    return;
            }

            void room.dispatchMouseEvent(
                event.clientX,
                event.clientY,
                eventType,
                event.altKey,
                event.ctrlKey || event.metaKey,
                event.shiftKey,
                isMouseDown,
            );
        };

        const touchHandler = (event: TouchEvent) => {
            event.preventDefault();

            const touch = event.changedTouches[0];

            if (!touch) return;

            switch (event.type) {
                case 'touchstart':
                    didMouseMove = false;
                    isMouseDown = true;

                    void room.dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_DOWN, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchmove':
                    didMouseMove = true;

                    void room.dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_MOVE, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchend': {
                    isMouseDown = false;

                    void room.dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_UP, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

                    let eventType: string | undefined = undefined;

                    if (!didMouseMove) {
                        eventType = MouseEventType.MOUSE_CLICK;

                        if (lastClick) {
                            clickCount = 1;

                            if (lastClick >= Date.now() - 300) clickCount++;
                        }
                    }

                    if (clickCount === 2) {
                        if (!didMouseMove) eventType = MouseEventType.DOUBLE_CLICK;

                        clickCount = 0;
                        lastClick = 0;
                    }

                    if (eventType) void room.dispatchMouseEvent(touch.clientX, touch.clientY, eventType, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

                    break;
                }
            }
        };

        canvas.onclick = mouseHandler;
        canvas.onmousemove = mouseHandler;
        canvas.onmousedown = mouseHandler;
        canvas.onmouseup = mouseHandler;

        canvas.ontouchstart = touchHandler;
        canvas.ontouchmove = touchHandler;
        canvas.ontouchend = touchHandler;

        return () => {
            canvas.onclick = null;
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;

            canvas.ontouchstart = null;
            canvas.ontouchmove = null;
            canvas.ontouchend = null;
        };
    }, [room]);

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
