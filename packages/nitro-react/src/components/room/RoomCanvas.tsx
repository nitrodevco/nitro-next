import { IRoomObject, MouseEventType, RoomDragEvent, RoomDraggedEvent, RoomGeometryScaleType, RoomObjectMouseEvent } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomStage, GetTicker, RoomAreaSelectionManager } from '@nitrodevco/nitro-renderer';
import { FederatedPointerEvent, Ticker } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { useRoomInteractionSelector, useRoomMouseActions, useRoomSelector } from '#base/context';
import { useRoomCamera } from '#base/hooks';
import { getRenderMode } from '#base/theme';

type MouseData = {
    mouseXY: { x: number; y: number };
    dragStartXY: { x: number; y: number };
    dragXY: { x: number; y: number };
    isDragged: boolean;
    wasDragged: boolean;
};

const DRAG_THRESHOLD: number = 15;

export const RoomCanvas = () => {
    const room = useRoomSelector();
    const { isDecorating, isPlayingGame } = useRoomInteractionSelector();
    const { updateRoomCamera } = useRoomCamera();
    const { hasAndResetCursorUpdate, hasCursorOwners } = useRoomMouseActions();
    const mouseDataRef = useRef<MouseData>({
        mouseXY: { x: 0, y: 0 },
        dragStartXY: { x: 0, y: 0 },
        dragXY: { x: 0, y: 0 },
        isDragged: false,
        wasDragged: false,
    });
    const renderMode = getRenderMode();

    const handleRoomDragging = (
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
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
                        offsetX <= -DRAG_THRESHOLD
                        || offsetX >= DRAG_THRESHOLD
                        || offsetY <= -DRAG_THRESHOLD
                        || offsetY >= DRAG_THRESHOLD
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
    };

    const dispatchMouseEvent = (
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean,
    ) => {
        if (!room?.canvas) return;

        const sprite = room.getRoomOverlayIconSprite();

        if (sprite) {
            const rectangle = sprite.getLocalBounds();

            sprite.x = x - rectangle.width / 2;
            sprite.y = y - rectangle.height / 2;
        }

        if (
            !handleRoomDragging(x, y, type, altKey, ctrlKey, shiftKey)
            && !room.canvas.handleMouseEvent(x, y, type, altKey, ctrlKey, shiftKey, buttonDown)
        ) {
            let eventType: string = '';

            if (type === MouseEventType.MOUSE_CLICK) eventType = RoomObjectMouseEvent.CLICK;
            else if (type === MouseEventType.MOUSE_MOVE) eventType = RoomObjectMouseEvent.MOUSE_MOVE;
            else if (type === MouseEventType.MOUSE_DOWN) eventType = RoomObjectMouseEvent.MOUSE_DOWN;
            else if (type === MouseEventType.MOUSE_UP) eventType = RoomObjectMouseEvent.MOUSE_UP;

            room.eventHandler.handleRoomObjectEvent(new RoomObjectMouseEvent(
                eventType,
                room.getRoomObjectRoom() as IRoomObject,
                -1,
                altKey,
                ctrlKey,
                shiftKey,
                buttonDown,
            ));
        }

        mouseDataRef.current.mouseXY = { x, y };
    };

    useEffect(() => {
        if (!room) return;

        let canvas = room.canvas;

        const width = window.innerWidth;
        const height = window.innerHeight;

        if (!canvas) {
            canvas = room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);

            if (renderMode === 'pixi' && canvas.master) GetRoomStage().addChild(canvas.master);
        } else {
            canvas.initialize(width, height);
        }

        const renderer = GetRenderer();
        const container = canvas.master;

        if (!container) return;

        updateRoomCamera(-1);

        const resizeCanvas = () => {
            if (!room.canvas) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            room.canvas.initialize(width, height);

            updateRoomCamera(-1);

            if (renderMode === 'dom') renderer.render(container);
        };

        renderer.on('resize', resizeCanvas);

        const tick = (ticker: Ticker) => {
            if (!room || !canvas || !container) return;

            const mouseData = mouseDataRef.current;
            const time = ticker.lastTime;

            room.update(time, false);

            if (!mouseData.isDragged) updateRoomCamera(time);

            if (mouseData.wasDragged) {
                const offsetX = canvas.screenOffsetX || 0;
                const offsetY = canvas.screenOffsetY || 0;

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + mouseData.dragXY.x), y: (offsetY + mouseData.dragXY.y) });

                mouseData.dragXY = { x: 0, y: 0 };
            }

            if (hasAndResetCursorUpdate()) container.cursor = hasCursorOwners() ? 'pointer' : 'auto';

            if (renderMode === 'dom') renderer.render(container);
        };

        GetTicker().add(tick);

        let didMouseMove = false;
        let isMouseDown = false;
        let lastClick = 0;
        let clickCount = 0;

        const handlePointerEvent = (event: FederatedPointerEvent) => {
            if (!room) return;

            // Pixi's EventSystem listens for `pointermove` on `document` and `pointerup` on
            // `window` (pixi.js's EventSystem.mjs), not scoped to its own canvas the way
            // `pointerdown` is - by design, so a drag begun on the canvas keeps tracking once
            // the pointer strays off it. In DOM render mode that same canvas sits underneath
            // real DOM windows (#ui-container, z-index above it), so those two event types
            // still reach the room's hover/drag handling even while the pointer is actually
            // over a window's own DOM elements, letting room interactions leak through
            // whatever's visually on top. Bail out whenever the canvas isn't the real topmost
            // element at this point - Pixi's own UI render mode has nothing to check here since
            // the UI is part of the very same canvas.
            if (getRenderMode() === 'dom') {
                const canvas = GetRenderer().canvas;

                if (canvas && document.elementFromPoint(event.clientX, event.clientY) !== canvas) return;
            }

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
                case 'pointermove':
                    eventType = MouseEventType.MOUSE_MOVE;
                    didMouseMove = true;
                    break;
                case 'pointerdown':
                    eventType = MouseEventType.MOUSE_DOWN;
                    didMouseMove = false;
                    isMouseDown = true;
                    break;
                case 'pointerup':
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
                isMouseDown,
            );
        };

        container.on('click', handlePointerEvent);
        container.on('pointermove', handlePointerEvent);
        container.on('pointerdown', handlePointerEvent);
        container.on('pointerup', handlePointerEvent);
        container.on('rightclick', handlePointerEvent);

        return () => {
            GetRenderer().off('resize', resizeCanvas);
            GetTicker().remove(tick);

            container.off('click', handlePointerEvent);
            container.off('pointermove', handlePointerEvent);
            container.off('pointerdown', handlePointerEvent);
            container.off('pointerup', handlePointerEvent);
            container.off('rightclick', handlePointerEvent);
        };
    }, [ room ]);

    return null;
};
