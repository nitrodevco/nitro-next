import { MouseEventType, RoomControllerLevelEnum, RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { GetRenderer, Room, RoomAreaSelectionManager } from "@nitrodevco/nitro-renderer";
import { RoomDragEvent, RoomDraggedEvent, RoomObjectFurnitureActionEvent, RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";
import { useEffect, useRef } from "react";

import { useRoomSessionSelector } from "#base/selectors";

import { useRoom } from "./useRoom";

const DRAG_THRESHOLD: number = 15;

export const useRoomMouse = () => {
    const room = useRoom();
    const { controllerLevel, isDecorating, isPlayingGame } = useRoomSessionSelector();
    const mouseDataRef = useRef<{
        mouseXY: { x: number, y: number },
        dragStartXY: { x: number, y: number },
        dragXY: { x: number, y: number },
        isDragged: boolean,
        wasDragged: boolean,
        hasCursorUpdate: boolean,
        cursorOwners: Set<string>
    }>({
        mouseXY: { x: 0, y: 0 },
        dragStartXY: { x: 0, y: 0 },
        dragXY: { x: 0, y: 0 },
        isDragged: false,
        wasDragged: false,
        hasCursorUpdate: false,
        cursorOwners: new Set<string>()
    });

    const hasCursorOwners = () => mouseDataRef.current.cursorOwners.size > 0;

    const setMouseButton = (objectId: number, category: RoomObjectCategoryEnum) => {
        if (
            (category !== RoomObjectCategoryEnum.Floor && category !== RoomObjectCategoryEnum.Wall) ||
            controllerLevel >= RoomControllerLevelEnum.Guest
        ) {
            const cursorOwners = mouseDataRef.current.cursorOwners;
            const key = `${category}_${objectId}`;

            if (!cursorOwners.has(key)) {
                cursorOwners.add(key);

                mouseDataRef.current.hasCursorUpdate = true;
            }
        }
    }

    const setMouseDefault = (objectId: number, category: RoomObjectCategoryEnum) => {
        const cursorOwners = mouseDataRef.current.cursorOwners;
        const key = `${category}_${objectId}`;

        if (cursorOwners.has(key)) {
            cursorOwners.delete(key);

            mouseDataRef.current.hasCursorUpdate = true;
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
        if (isPlayingGame) return false;

        const mouseData = mouseDataRef.current;

        if (room.areaSelection.areaSelectionState === RoomAreaSelectionManager.SELECTING) {
            mouseData.isDragged = false;
            mouseData.wasDragged = false;

            return false;
        }

        const canvas = room.instance?.canvas;

        if (!canvas) return false;

        let offsetX = x - mouseData.mouseXY.x;
        let offsetY = y - mouseData.mouseXY.y;

        if (type === MouseEventType.MOUSE_DOWN) {
            if (!altKey && !ctrlKey && !shiftKey && !isDecorating) {
                mouseData.isDragged = true;
                mouseData.wasDragged = false;
                mouseData.dragStartXY = { ...mouseData.mouseXY };
            }
        } else if (type === MouseEventType.MOUSE_UP) {
            if (mouseData.isDragged) {
                mouseData.isDragged = false;

                if (mouseData.wasDragged) room.dispatchEvent(new RoomDraggedEvent(room.roomId, -canvas.screenOffsetX, -canvas.screenOffsetY));
            }
        } else if (type === MouseEventType.MOUSE_MOVE) {
            if (mouseData.isDragged) {
                if (!mouseData.wasDragged) {
                    offsetX = x - mouseData.dragStartXY.x;
                    offsetY = y - mouseData.dragStartXY.y;

                    if (
                        offsetX <= -DRAG_THRESHOLD ||
                        offsetX >= DRAG_THRESHOLD ||
                        offsetY <= -DRAG_THRESHOLD ||
                        offsetY >= DRAG_THRESHOLD
                    ) {
                        mouseData.wasDragged = true;
                    }

                    offsetX = 0;
                    offsetY = 0;
                }

                if (!(offsetX == 0) || !(offsetY == 0)) {
                    mouseData.dragXY.x += offsetX;
                    mouseData.dragXY.y += offsetY;
                    mouseData.wasDragged = true;

                    room.dispatchEvent(new RoomDragEvent(room.roomId, -(canvas.screenOffsetX - offsetX), -(canvas.screenOffsetY - offsetY)));
                }
            }
        } else if (type === MouseEventType.MOUSE_CLICK || type === MouseEventType.DOUBLE_CLICK) {
            mouseData.isDragged = false;

            if (mouseData.wasDragged) {
                mouseData.wasDragged = false;

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
        if (!room) return;

        const sprite = room.getRoomOverlayIconSprite();

        if (sprite) {
            const rectangle = sprite.getLocalBounds();

            sprite.x = x - rectangle.width / 2;
            sprite.y = y - rectangle.height / 2;
        }

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

        mouseDataRef.current.mouseXY = { x, y };
    }

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

    return { mouseDataRef, hasCursorOwners, setMouseButton, setMouseDefault, updateMousePointer };
}