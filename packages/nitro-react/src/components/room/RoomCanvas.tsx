/** Room canvas lifecycle and input bridge, including RoomEngine camera updates on each render tick. */
import { IRoomObject, MouseEventType, RoomDragEvent, RoomDraggedEvent, RoomGeometryScaleType, RoomObjectMouseEvent, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomStage, GetTicker, RoomAreaSelectionManager } from '@nitrodevco/nitro-renderer';
import { FederatedPointerEvent, Ticker } from 'pixi.js';
import { useEffect, useLayoutEffect, useRef } from 'react';

import { getRoomObjectBeingPlaced, useRoom, useRoomMouseActions, useRoomStore } from '#base/context/room';
import { useRoomCamera } from '#base/hooks';

import { touchPlacementDrop } from './touchPlacementDrop';

type MouseData = {
    mouseXY: { x: number; y: number };
    dragStartXY: { x: number; y: number };
    dragXY: { x: number; y: number };
    isDragged: boolean;
    wasDragged: boolean;
};

const DRAG_THRESHOLD: number = 15;

/**
 * A touch while an object follows the pointer - placed from the inventory or the catalogue, or moved.
 * Flash's placement is a mouse's: the ghost follows the hover (`ROE_MOUSE_MOVE`) and a later click
 * drops it where the ghost is. A finger has no hover, so for it the press puts the ghost under the
 * finger, dragging moves it rather than the room, and lifting drops it there.
 */
const isTouchPlacing = (event: FederatedPointerEvent) => (event.pointerType === 'touch') && !!getRoomObjectBeingPlaced();

export const RoomCanvas = () => {
    const room = useRoom();
    const isDecorating = useRoomStore(x => x.isDecorating);
    const isPlayingGame = useRoomStore(x => x.isPlayingGame);
    const { updateRoomCamera } = useRoomCamera();
    // The ticker and the pointer listeners outlive renders; own-avatar targeting and follow settings,
    // and whether a drag may start (decorating, a game), must stay current.
    const updateCameraRef = useRef(updateRoomCamera);
    const isDecoratingRef = useRef(isDecorating);
    const isPlayingGameRef = useRef(isPlayingGame);
    // Whether the press being handled is a finger placing an object (`isTouchPlacing`).
    const touchPlacingRef = useRef(false);

    useLayoutEffect(() => {
        updateCameraRef.current = updateRoomCamera;
        isDecoratingRef.current = isDecorating;
        isPlayingGameRef.current = isPlayingGame;
    });
    const { hasAndResetCursorUpdate, hasCursorOwners } = useRoomMouseActions();
    const mouseDataRef = useRef<MouseData>({
        mouseXY: { x: 0, y: 0 },
        dragStartXY: { x: 0, y: 0 },
        dragXY: { x: 0, y: 0 },
        isDragged: false,
        wasDragged: false,
    });

    const handleRoomDragging = (
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
    ) => {
        if (!room || !room.canvas || isPlayingGameRef.current) return false;

        const mouseData = mouseDataRef.current;

        if (room.areaSelection.areaSelectionState === RoomAreaSelectionManager.SELECTING) {
            mouseData.isDragged = false;
            mouseData.wasDragged = false;

            return false;
        }

        let offsetX = x - mouseData.mouseXY.x;
        let offsetY = y - mouseData.mouseXY.y;

        if (type === MouseEventType.MOUSE_DOWN) {
            // `RoomEngine.handleRoomDragging` (`isDecorateMode`): decorating, a press starts no room drag.
            // Nor does a finger placing an object: it drags the object, not the room (see `isTouchPlacing`).
            if (!altKey && !ctrlKey && !shiftKey && !isDecoratingRef.current && !touchPlacingRef.current) {
                mouseData.isDragged = true;
                mouseData.wasDragged = false;
                // The press's own position: a finger has no hover, so the last one seen is where the
                // previous touch ended, and the threshold would count from there.
                mouseData.dragStartXY = { x, y };
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

        // `RoomEngine.handleMouseEvent`: the click that ends an area drag finishes the selection (its
        // callback hands the area to whoever asked for it - a wired "in area" box, the area hide furni)
        // and is not handled as anything else: it neither walks nor selects.
        if (type === MouseEventType.MOUSE_CLICK && room.areaSelection.finishSelecting()) {
            mouseDataRef.current.mouseXY = { x, y };

            return;
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

            if (canvas.master) GetRoomStage().addChild(canvas.master);
        } else {
            canvas.initialize(width, height);
        }

        const renderer = GetRenderer();
        const container = canvas.master;

        if (!container) return;

        updateCameraRef.current(-1);

        const resizeCanvas = () => {
            if (!room.canvas) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            /*
             * `RoomEngine.modifyRoomCanvas` only re-initializes the canvas; the next tick's camera
             * update sees the new size and eases to it. Updating with time -1 here marked the scale
             * as changed, so every resize event snapped the camera onto its half-tile-rounded
             * target and the room jittered from side to side while the window was dragged.
             */
            room.canvas.initialize(width, height);
        };

        renderer.on('resize', resizeCanvas);

        // The room itself is advanced by the engine's HIGH-priority tick; this NORMAL-priority
        // one only does the presentation that follows it (camera, drag, cursor, DOM blit).
        const tick = (ticker: Ticker) => {
            if (!room || !canvas || !container) return;

            const mouseData = mouseDataRef.current;
            const time = ticker.lastTime;

            if (!mouseData.isDragged) updateCameraRef.current(time);

            if (mouseData.wasDragged) {
                const offsetX = canvas.screenOffsetX || 0;
                const offsetY = canvas.screenOffsetY || 0;

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + mouseData.dragXY.x), y: (offsetY + mouseData.dragXY.y) });

                mouseData.dragXY = { x: 0, y: 0 };
            }

            if (hasAndResetCursorUpdate()) container.cursor = hasCursorOwners() ? 'pointer' : 'auto';

            /*
             * Everything that sits over the room - the name and menu bubbles, friend requests, quiz
             * thumbs - repositions itself off this, once the camera and any drag have moved the
             * canvas for the frame. The time is the frame delta, which is what their fades count in.
             */
            room.dispatchEvent(new RoomRenderedEvent(room.roomId, ticker.deltaTime));
        };

        GetTicker().add(tick);

        let didMouseMove = false;
        let isMouseDown = false;
        let lastClick = 0;
        let clickCount = 0;

        /*
         * The room only hears moves over itself, so a drag that crosses the toolbar, the chat bar or
         * a window - most of a phone's screen - would stall there, and a finger lifted over one would
         * never end it. While a press that began on the room is held, moves and the release anywhere
         * else still drag the room; they are not room mouse events otherwise (no tile hover under a
         * window). Pixi hands `globalpointermove` listeners an event whose type is still
         * `pointermove`, so each listener says which it is rather than the event.
         */
        const dragElsewhere = (event: FederatedPointerEvent, type: string) => {
            if (!isMouseDown || !event.isPrimary) return;

            if (type === MouseEventType.MOUSE_MOVE) didMouseMove = true;
            else isMouseDown = false;

            handleRoomDragging(event.clientX, event.clientY, type, event.altKey, event.ctrlKey || event.metaKey, event.shiftKey);

            mouseDataRef.current.mouseXY = { x: event.clientX, y: event.clientY };
        };

        // Over the room, its own `pointermove` already moved it.
        const handleGlobalPointerMove = (event: FederatedPointerEvent) => {
            if (event.target !== container) dragElsewhere(event, MouseEventType.MOUSE_MOVE);
        };

        const handlePointerUpOutside = (event: FederatedPointerEvent) => dragElsewhere(event, MouseEventType.MOUSE_UP);

        // Pixi does not pass the browser's `pointercancel` on: a touch the browser takes over ends the drag here.
        const handlePointerCancel = (event: PointerEvent) => {
            if (!isMouseDown || !event.isPrimary) return;

            isMouseDown = false;

            handleRoomDragging(event.clientX, event.clientY, MouseEventType.MOUSE_UP, false, false, false);
        };

        /*
         * A finger lifted while placing drops the object where it was lifted. Done on the next frame,
         * after the engine's tick: the room takes one move per frame (`RoomSpriteCanvas.handleMouseEvent`,
         * and the handler's per-frame event ids), so the finger's last moves may not have reached the
         * ghost yet - a fresh move puts it under the finger, and the click then drops it there.
         */
        const dropWhereLifted = (x: number, y: number) => {
            GetTicker().addOnce(() => {
                const selected = getRoomObjectBeingPlaced();

                if (!selected) return;

                dispatchMouseEvent(x, y, MouseEventType.MOUSE_MOVE, false, false, false, false);

                touchPlacementDrop.objectId = selected.objectId;
                touchPlacementDrop.category = selected.category;

                try {
                    dispatchMouseEvent(x, y, MouseEventType.MOUSE_CLICK, false, false, false, false);
                } finally {
                    touchPlacementDrop.category = -1;
                }
            });
        };

        /** `isTouchPlacing`: the press puts the ghost under the finger, a drag moves it, lifting drops it. */
        const handleTouchPlacing = (event: FederatedPointerEvent) => {
            const x = event.clientX;
            const y = event.clientY;

            switch (event.type) {
                case 'pointerdown':
                    isMouseDown = true;
                    didMouseMove = false;
                    dispatchMouseEvent(x, y, MouseEventType.MOUSE_MOVE, false, false, false, false);
                    touchPlacingRef.current = true;
                    dispatchMouseEvent(x, y, MouseEventType.MOUSE_DOWN, false, false, false, true);
                    touchPlacingRef.current = false;
                    return true;
                case 'pointerup': {
                    // A press that began off the room - dragged out of the inventory - ends with no
                    // tap on the room, so its release is the drop; one that began here is dropped by its tap.
                    const pressedHere = isMouseDown;

                    isMouseDown = false;
                    dispatchMouseEvent(x, y, MouseEventType.MOUSE_UP, false, false, false, false);

                    if (!pressedHere) dropWhereLifted(x, y);

                    return true;
                }
                case 'tap':
                    dropWhereLifted(x, y);
                    return true;
                default:
                    return false;
            }
        };

        const handlePointerEvent = (event: FederatedPointerEvent) => {
            // A second finger is not a second mouse: its moves, measured from the first finger's
            // position, threw the room about, and its release ended the first finger's drag.
            if (!room || !event.isPrimary) return;

            if (isTouchPlacing(event) && handleTouchPlacing(event)) return;

            let eventType = event.type === 'tap' ? 'click' : event.type;

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
        container.on('tap', handlePointerEvent);
        container.on('pointermove', handlePointerEvent);
        container.on('pointerdown', handlePointerEvent);
        container.on('pointerup', handlePointerEvent);
        container.on('rightclick', handlePointerEvent);
        container.on('globalpointermove', handleGlobalPointerMove);
        container.on('pointerupoutside', handlePointerUpOutside);
        window.addEventListener('pointercancel', handlePointerCancel);

        return () => {
            container.off('globalpointermove', handleGlobalPointerMove);
            container.off('pointerupoutside', handlePointerUpOutside);
            window.removeEventListener('pointercancel', handlePointerCancel);
            GetRenderer().off('resize', resizeCanvas);
            GetTicker().remove(tick);

            container.off('click', handlePointerEvent);
            container.off('tap', handlePointerEvent);
            container.off('pointermove', handlePointerEvent);
            container.off('pointerdown', handlePointerEvent);
            container.off('pointerup', handlePointerEvent);
            container.off('rightclick', handlePointerEvent);
        };
    }, [ room ]);

    return null;
};
