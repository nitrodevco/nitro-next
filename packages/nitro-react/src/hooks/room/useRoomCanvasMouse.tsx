import { MouseEventType, RoomControllerLevelEnum, RoomObjectCategoryEnum, Vector3d } from "@nitrodevco/nitro-api";
import { GetRenderer, Room, RoomAreaSelectionManager } from "@nitrodevco/nitro-renderer";
import { RoomEngineObjectEvent, RoomObjectFurnitureActionEvent, RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";
import { useEffect, useRef } from "react";

import { useRoomContext } from "../context";
import { useRoomEventDispatcher } from "./useRoomEventDispatcher";
import { useRoomObjectEvent } from "./useRoomObjectEvent";

const DRAG_THRESHOLD: number = 15;

export const useRoomCanvasMouse = () => {
    const room = useRoomContext(x => x.room);
    const controllerLevel = useRoomContext(x => x.controllerLevel);
    const camera = useRoomContext(x => x.camera);
    const mouseXY = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const dragStartXY = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const dragXY = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const isDragged = useRef<boolean>(false);
    const wasDragged = useRef<boolean>(false);
    const hasCursorUpdate = useRef<boolean>(false);
    const cursorOwners = useRef<string[]>([]);

    const hasCursorOwners = () => cursorOwners.current.length > 0;

    const setMouseButton = (objectId: number, category: RoomObjectCategoryEnum) => {
        if (
            (category !== RoomObjectCategoryEnum.Floor && category !== RoomObjectCategoryEnum.Wall) ||
            controllerLevel >= RoomControllerLevelEnum.Guest
        ) {
            const index = cursorOwners.current.indexOf(`${category}_${objectId}`);

            if (index === -1) {
                cursorOwners.current.push(`${category}_${objectId}`);

                hasCursorUpdate.current = true;
            }
        }
    }

    const setMouseDefault = (objectId: number, category: RoomObjectCategoryEnum) => {
        const index = cursorOwners.current.indexOf(`${category}_${objectId}`);

        if (index >= 0) {
            cursorOwners.current.splice(index, 1);

            hasCursorUpdate.current = true;
        }
    }

    const updateMousePointer = (type: string, objectId: number, objectType: string) => {
        const category = room.getRoomObjectCategoryForType(objectType);

        switch (type) {
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                setMouseButton(objectId, category);
                return;
            default:
                setMouseDefault(objectId, category);
                return;
        }
    }

    const handleRoomDragging = (
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean
    ) => {
        if (room.isPlayingGame()) return false;

        if (room.areaSelection.areaSelectionState === RoomAreaSelectionManager.SELECTING) {
            isDragged.current = false;
            wasDragged.current = false;

            return false;
        }

        const canvas = room.instance?.canvas;

        if (!canvas) return false;

        let offsetX = x - mouseXY.current.x;
        let offsetY = y - mouseXY.current.y;

        if (type === MouseEventType.MOUSE_DOWN) {
            if (!altKey && !ctrlKey && !shiftKey && !room.isDecorating) {
                isDragged.current = true;
                wasDragged.current = false;
                dragStartXY.current = { ...mouseXY.current };
            }
        } else if (type === MouseEventType.MOUSE_UP) {
            if (isDragged.current) {
                isDragged.current = false;

                if (wasDragged.current) {
                    if (!camera.isMoving) {
                        camera.centeredLocX = false;
                        camera.centeredLocY = false;
                    }

                    camera.resetLocation(new Vector3d(-canvas.screenOffsetX, -canvas.screenOffsetY));
                }
            }
        } else if (type === MouseEventType.MOUSE_MOVE) {
            if (isDragged.current) {
                if (!wasDragged.current) {
                    offsetX = x - dragStartXY.current.x;
                    offsetY = y - dragStartXY.current.y;

                    if (
                        offsetX <= -DRAG_THRESHOLD ||
                        offsetX >= DRAG_THRESHOLD ||
                        offsetY <= -DRAG_THRESHOLD ||
                        offsetY >= DRAG_THRESHOLD
                    ) {
                        wasDragged.current = true;
                    }

                    offsetX = 0;
                    offsetY = 0;
                }

                if (!(offsetX == 0) || !(offsetY == 0)) {
                    dragXY.current.x += offsetX;
                    dragXY.current.y += offsetY;
                    wasDragged.current = true;
                }
            }
        } else if (type === MouseEventType.MOUSE_CLICK || type === MouseEventType.DOUBLE_CLICK) {
            isDragged.current = false;

            if (wasDragged.current) {
                wasDragged.current = false;

                return true;
            }
        }

        return false;
    }

    const dispatchMouseEvent = (
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean
    ) => {
        /*  const overlay = this.getRenderingCanvasOverlay(canvas);
        const sprite = this.getOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE);
    
        if (sprite) {
            const rectangle = sprite.getLocalBounds();
    
            sprite.x = x - rectangle.width / 2;
            sprite.y = y - rectangle.height / 2;
        } */

        if (
            !handleRoomDragging(x, y, type, altKey, ctrlKey, shiftKey) &&
            !room.instance.canvas?.handleMouseEvent(x, y, type, altKey, ctrlKey, shiftKey, buttonDown)
        ) {
            let eventType: string = '';

            if (type === MouseEventType.MOUSE_CLICK) eventType = RoomObjectMouseEvent.CLICK;
            else if (type === MouseEventType.MOUSE_MOVE) eventType = RoomObjectMouseEvent.MOUSE_MOVE;
            else if (type === MouseEventType.MOUSE_DOWN) eventType = RoomObjectMouseEvent.MOUSE_DOWN;
            else if (type === MouseEventType.MOUSE_UP) eventType = RoomObjectMouseEvent.MOUSE_UP;

            room.eventHandler.handleRoomObjectEvent(new RoomObjectMouseEvent(
                eventType,
                room.getRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room),
                -1,
                altKey,
                ctrlKey,
                shiftKey,
                buttonDown,
            ));
        }

        mouseXY.current = { x, y };
    }

    useRoomEventDispatcher<RoomEngineObjectEvent>(RoomEngineObjectEvent.REMOVED, event => {
        if (event.category !== RoomObjectCategoryEnum.Floor && event.category !== RoomObjectCategoryEnum.Wall) return;

        setMouseDefault(event.objectId, event.category);
    });

    useRoomObjectEvent<RoomObjectFurnitureActionEvent>([RoomObjectFurnitureActionEvent.MOUSE_ARROW, RoomObjectFurnitureActionEvent.MOUSE_BUTTON], event => {
        updateMousePointer(event.type, event.objectId, event.objectType);
    });

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

            dispatchMouseEvent(
                event.clientX,
                event.clientY,
                eventType,
                event.altKey,
                event.ctrlKey || event.metaKey,
                event.shiftKey,
                isMouseDown
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

                    dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_DOWN, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchmove':
                    didMouseMove = true;

                    dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_MOVE, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchend': {
                    isMouseDown = false;

                    dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_UP, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

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

                    if (eventType) dispatchMouseEvent(touch.clientX, touch.clientY, eventType, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

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

    return { dragXY, isDragged, wasDragged, hasCursorUpdate, hasCursorOwners, updateMousePointer };
}