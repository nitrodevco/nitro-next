import { RoomEngineEvent, RoomZoomEvent } from '@nitrodevco/nitro-api';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { getRoom } from '#base/context/room';
import { useConfigBoolean } from '#base/context/system';

import { useRoomEventDispatcher } from './useRoomEventDispatcher';

/** `RoomDesktop.ROOM_ZOOM_SCALES` - the room only ever rests on one of these. */
const ZOOM_SCALES = [ 0.5, 1, 2, 4, 8, 16 ];

/** The scale a room opens at, and the one the toggle button comes back to. */
const DEFAULT_SCALE = 1;

/**
 * `RoomDesktop.getZoomAnimationStep`: zoom levels crossed per reference frame, so the room takes
 * about the same time to cross one doubling however fast the display runs. A frame longer than
 * `MAX_FRAME_MS` is treated as that long, so a stall does not jump the whole way at once.
 */
const LEVELS_PER_FRAME = 0.14;
const REFERENCE_FRAME_MS = 1000 / 60;
const MAX_FRAME_MS = 50;

/** Ahead of the room engine's `UPDATE_PRIORITY.HIGH` tick. */
const ZOOM_STEP_PRIORITY = UPDATE_PRIORITY.HIGH + 1;

/** Close enough to the target to stop animating and sit exactly on it. */
const SETTLE_EPSILON = 0.01;

const toLevel = (scale: number) => Math.log(scale) / Math.LN2;

/**
 * The room's zoom, as the Flash `RoomDesktop` ran it: the scale is animated towards the target
 * in log space rather than snapped, so a double-step still reads as one continuous zoom.
 *
 * The room object itself keeps no zoom state - the canvas does - so the level the buttons act on
 * is held here, and it starts at 1 because that is what a freshly built canvas is at.
 *
 * A `RoomZoomEvent` (Flash's `RoomEngineZoomEvent`, `REE_ROOM_ZOOM`) is answered as
 * `RoomUI.roomEngineEventHandler` answered it: its level becomes a scale that is zoomed to, which
 * needs `zoom.enabled` as `RoomEngine.setRoomCanvasScale` does. One that forces a flip (the upside
 * down special room effect) is `useRoomCamera`'s, which turns the canvas and re-syncs the camera
 * to it; answering it here as well would turn the canvas straight back.
 *
 * Each step runs before the room engine's tick draws the frame, as `RoomDesktop.update` (under
 * `RoomUI`, priority 0) runs before `RoomEngine.update` (priority 1): the room is drawn at the
 * scale everything placed over it is placed by. Stepped after the draw, the bubbles ran one zoom
 * step ahead of the room. Every change of scale is announced (`REE_ROOM_ZOOMED`, as
 * `RoomEngine.setRoomCanvasScale` does) for the camera to follow, and one made elsewhere - the
 * room's Ctrl+Alt click - is taken as the level the buttons act on.
 */
export const useRoomZoom = () => {
    const enabled = useConfigBoolean('zoom.enabled');
    const [ scale, setScale ] = useState(DEFAULT_SCALE);
    const targetRef = useRef<number | undefined>(undefined);

    // The room is read when the frame runs, never captured (see `getRoom`): on the first room entered
    // after a load the step was left holding a room that had already been disposed, which has no
    // canvas, so the buttons counted up and the room never moved.
    useEffect(() => {
        const step = (ticker: Ticker) => {
            const room = getRoom();
            const canvas = room?.canvas;
            const target = targetRef.current;

            if (!room || !canvas || (target === undefined)) return;

            const setScale = (scale: number) => {
                canvas.setScale(scale);
                room.eventDispatcher.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.ROOM_ZOOMED, room.roomId));
            };

            const from = toLevel(canvas.scale);
            const distance = toLevel(target) - from;

            if (Math.abs(distance) <= SETTLE_EPSILON) {
                targetRef.current = undefined;
                setScale(target);

                return;
            }

            const travel = Math.min(
                Math.abs(distance),
                LEVELS_PER_FRAME * Math.min(ticker.deltaMS, MAX_FRAME_MS) / REFERENCE_FRAME_MS,
            );

            setScale(Math.pow(2, from + ((distance < 0) ? -travel : travel)));
        };

        GetTicker().add(step, undefined, ZOOM_STEP_PRIORITY);

        return () => {
            GetTicker().remove(step);
        };
    }, []);

    const zoomTo = (next: number) => {
        if (!enabled || (next === scale)) return;

        setScale(next);
        targetRef.current = next;
    };

    useRoomEventDispatcher<RoomZoomEvent>(RoomZoomEvent.ROOM_ZOOM, (event) => {
        if (!enabled || event.isFlipForced) return;

        // `1 << (min(5, floor(level)) - 1)`: level 1 is scale 1, and anything under 1 is half.
        zoomTo((event.level < 1) ? 0.5 : (1 << (Math.min(5, Math.floor(event.level)) - 1)));
    });

    // A scale set while no zoom is running is someone else's: the buttons go on from it.
    useRoomEventDispatcher<RoomEngineEvent>(RoomEngineEvent.ROOM_ZOOMED, () => {
        const canvas = getRoom()?.canvas;

        if (canvas && (targetRef.current === undefined) && (canvas.scale !== scale)) setScale(canvas.scale);
    });

    const index = ZOOM_SCALES.indexOf(scale);
    const canZoomIn = enabled && (index >= 0) && (index < ZOOM_SCALES.length - 1);
    const canZoomOut = enabled && (index > 0);

    return {
        scale,
        /** What the toolbar prints: level 1 is scale 1, and each doubling is one more. */
        level: Math.round(toLevel(scale)) + 1,
        canZoomIn,
        canZoomOut,
        zoomIn: () => canZoomIn && zoomTo(ZOOM_SCALES[index + 1]),
        zoomOut: () => canZoomOut && zoomTo(ZOOM_SCALES[index - 1]),
        /** `RoomDesktop.toggleZoom` - the old one-click zoom, between full size and half. */
        toggleZoom: () => zoomTo((scale === DEFAULT_SCALE) ? ZOOM_SCALES[0] : DEFAULT_SCALE),
    };
};
