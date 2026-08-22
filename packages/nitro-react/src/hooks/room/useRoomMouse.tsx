import type { IRoomObject } from "@nitrodevco/nitro-api";
import { MouseEventType, RoomDragEvent, RoomDraggedEvent, RoomObjectCategoryEnum, RoomObjectMouseEvent } from "@nitrodevco/nitro-api";
import { Room, RoomAreaSelectionManager } from "@nitrodevco/nitro-renderer";
import { FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";

import { useRoomInteractionSelector, useRoomSelector } from "#base/context";

const DRAG_THRESHOLD: number = 15;

export const useRoomMouse = () => {
    const room = useRoomSelector();
    const { isDecorating, isPlayingGame } = useRoomInteractionSelector();
    const mouseDataRef = useRef<{
        mouseXY: { x: number, y: number },
        dragStartXY: { x: number, y: number },
        dragXY: { x: number, y: number },
        isDragged: boolean,
        wasDragged: boolean
    }>({
        mouseXY: { x: 0, y: 0 },
        dragStartXY: { x: 0, y: 0 },
        dragXY: { x: 0, y: 0 },
        isDragged: false,
        wasDragged: false
    });

    const handleRoomDragging = (
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean
    ) => {
        if (!room || !room.canvas || isPlayingGame) return false;

        const mouseData = mouseDataRef.current;

        if (room.areaSelection.areaSelectionState === RoomAreaSelectionManager.SELECTING) {
            mouseData.isDragged = false;
            mouseData.wasDragged = false;

            return false;
        }

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

                if (mouseData.wasDragged) room.dispatchEvent(new RoomDraggedEvent(room.roomId, -room.canvas.screenOffsetX, -room.canvas.screenOffsetY));
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

                    room.dispatchEvent(new RoomDragEvent(room.roomId, -(room.canvas.screenOffsetX - offsetX), -(room.canvas.screenOffsetY - offsetY)));
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
            !room.canvas?.handleMouseEvent(x, y, type, altKey, ctrlKey, shiftKey, buttonDown)
        ) {
            let eventType: string = '';

            if (type === MouseEventType.MOUSE_CLICK) eventType = RoomObjectMouseEvent.CLICK;
            else if (type === MouseEventType.MOUSE_MOVE) eventType = RoomObjectMouseEvent.MOUSE_MOVE;
            else if (type === MouseEventType.MOUSE_DOWN) eventType = RoomObjectMouseEvent.MOUSE_DOWN;
            else if (type === MouseEventType.MOUSE_UP) eventType = RoomObjectMouseEvent.MOUSE_UP;

            room.eventHandler.handleRoomObjectEvent(new RoomObjectMouseEvent(
                eventType,
                room.getRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room) as IRoomObject,
                -1,
                altKey,
                ctrlKey,
                shiftKey,
                buttonDown,
            ));
        }

        mouseDataRef.current.mouseXY = { x, y };
    }

    const registerPointerEvents = () => {
        if (!room?.canvas?.master) return;

        const container = room.canvas.master;

        // eslint-disable-next-line react-hooks/immutability
        container.eventMode = 'static';

        let didMouseMove = false;
        let isMouseDown = false;
        let lastClick = 0;
        let clickCount = 0;

        const handlePointerEvent = (event: FederatedPointerEvent) => {
            if (!room) return;

            let eventType = event.type;

            if (eventType === 'click') {
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
                case 'click':
                    eventType = MouseEventType.MOUSE_CLICK;
                    break;
                case MouseEventType.DOUBLE_CLICK:
                    break;
                case 'mousemove':
                    eventType = MouseEventType.MOUSE_MOVE;
                    didMouseMove = true;
                    break;
                case 'pointerdown':
                    eventType = MouseEventType.MOUSE_DOWN;
                    didMouseMove = false;
                    isMouseDown = true;
                    break;
                case 'mouseup':
                    eventType = MouseEventType.MOUSE_UP;
                    isMouseDown = false;
                    break;
                case 'rightclick':
                    eventType = MouseEventType.RIGHT_CLICK;
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
        }

        container.on('click', handlePointerEvent);
        container.on('pointerdown', handlePointerEvent);
        container.on('pointerup', handlePointerEvent);
        container.on('pointerupoutside', handlePointerEvent);
        container.on('pointerover', handlePointerEvent);
        container.on('pointerout', handlePointerEvent);
        container.on('pointermove', handlePointerEvent);
        container.on('rightclick', handlePointerEvent);
    }

    return { mouseDataRef, registerPointerEvents };
}