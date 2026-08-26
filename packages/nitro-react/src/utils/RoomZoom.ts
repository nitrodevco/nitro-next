import type { IRoom } from '@nitrodevco/nitro-api';
import { GetConfigValue } from '@nitrodevco/nitro-api';
import type { Point } from 'pixi.js';

/*
 * RoomDesktop room zoom — the canvas steps through six scales, animated in log2
 * space at 0.14 log2-units per 60fps frame (frame delta capped at 50ms), snapping
 * when within 0.01 of the target. While an animation is pending the pending target
 * counts as the current scale, so rapid clicks step through multiple levels.
 */
const ROOM_ZOOM_SCALES = [0.5, 1, 2, 4, 8, 16];
const ROOM_ZOOM_EPSILON = 0.001;
const ZOOM_ANIMATION_BASE_FRAME_MS = 50 / 3;
const LN2 = 0.6931471805599453;

const ROOM_ZOOM_SCROLL_COOLDOWN_MS = 400;
const ROOM_ZOOM_SCROLL_MOUSE_DELTA_BYPASS_THRESHOLD = 2;

let pendingScale = NaN;
let pendingPivot: Point | undefined = undefined;
let lastZoomScrollMillis = 0;

const canUseAnimatedRoomZoom = (room: IRoom | undefined): boolean => !!room && (GetConfigValue<boolean>('zoom.enabled') ?? false);

const clampRoomCanvasZoomScale = (scale: number): number => Math.max(ROOM_ZOOM_SCALES[0], Math.min(ROOM_ZOOM_SCALES[ROOM_ZOOM_SCALES.length - 1], scale));

const getNearestZoomScale = (scale: number): number => {
    let nearest = ROOM_ZOOM_SCALES[0];
    let distance = Math.abs(scale - nearest);

    for (const entry of ROOM_ZOOM_SCALES) {
        const entryDistance = Math.abs(scale - entry);

        if (entryDistance < distance) {
            nearest = entry;
            distance = entryDistance;
        }
    }

    return nearest;
};

const getNextZoomScale = (scale: number, direction: number): number => {
    if (isNaN(scale) || direction === 0) return scale;

    if (direction > 0) {
        if (scale >= ROOM_ZOOM_SCALES[ROOM_ZOOM_SCALES.length - 1] - ROOM_ZOOM_EPSILON) return scale;

        for (let i = 0; i < ROOM_ZOOM_SCALES.length; i++) {
            if (ROOM_ZOOM_SCALES[i] > scale + ROOM_ZOOM_EPSILON) return ROOM_ZOOM_SCALES[i];
        }

        return ROOM_ZOOM_SCALES[ROOM_ZOOM_SCALES.length - 1];
    }

    if (scale <= ROOM_ZOOM_SCALES[0] + ROOM_ZOOM_EPSILON) return scale;

    for (let i = ROOM_ZOOM_SCALES.length - 1; i >= 0; i--) {
        if (ROOM_ZOOM_SCALES[i] < scale - ROOM_ZOOM_EPSILON) return ROOM_ZOOM_SCALES[i];
    }

    return ROOM_ZOOM_SCALES[0];
};

const scaleToZoomAnimationValue = (scale: number): number => Math.log(scale) / LN2;

const zoomLevelToScale = (level: number): number => Math.pow(2, level);

const getZoomAnimationStep = (current: number, target: number, deltaMs: number): number => {
    const distance = Math.abs(target - current);
    const frameMs = deltaMs > 0 ? Math.min(deltaMs, 50) : ZOOM_ANIMATION_BASE_FRAME_MS;

    return Math.min(distance, 0.14 * frameMs / ZOOM_ANIMATION_BASE_FRAME_MS);
};

const getCurrentControllableRoomCanvasScale = (room: IRoom | undefined): number => {
    if (!canUseAnimatedRoomZoom(room)) return NaN;

    return !isNaN(pendingScale) ? pendingScale : room!.getRoomCanvasScale();
};

export const getCurrentRoomCanvasZoomScale = (room: IRoom | undefined): number => {
    const scale = getCurrentControllableRoomCanvasScale(room);

    return isNaN(scale) ? 1 : getNearestZoomScale(scale);
};

// RoomToolsWidget.getCurrentRoomZoomText — level = log2(scale) + 1 (0.5 → "0" .. 16 → "5")
export const getCurrentRoomZoomText = (room: IRoom | undefined): string => {
    let scale = room ? room.getRoomCanvasScale() : NaN;

    if (!isNaN(pendingScale)) scale = pendingScale;

    if (isNaN(scale) || scale <= 0) scale = 1;

    return (Math.round(Math.log(scale) / LN2) + 1).toString();
};

export const canZoomRoomCanvas = (room: IRoom | undefined, direction: number): boolean => {
    if (!canUseAnimatedRoomZoom(room) || direction === 0) return false;

    const scale = getCurrentRoomCanvasZoomScale(room);

    return Math.abs(getNextZoomScale(scale, direction) - scale) > ROOM_ZOOM_EPSILON;
};

export const zoomRoomCanvas = (room: IRoom | undefined, direction: number): void => {
    if (!canUseAnimatedRoomZoom(room) || direction === 0) return;

    const scale = getCurrentRoomCanvasZoomScale(room);
    const nextScale = getNextZoomScale(scale, direction);

    if (Math.abs(nextScale - scale) <= ROOM_ZOOM_EPSILON) return;

    animateRoomCanvasScale(room, nextScale);
};

export const animateRoomCanvasScale = (room: IRoom | undefined, scale: number, pivot: Point | undefined = undefined): void => {
    if (!room || isNaN(scale) || !canUseAnimatedRoomZoom(room)) return;

    pendingScale = clampRoomCanvasZoomScale(scale);
    pendingPivot = pivot;
};

export const updateZoomAnimation = (room: IRoom | undefined, deltaMs: number): void => {
    if (!room || isNaN(pendingScale)) return;

    const currentScale = room.getRoomCanvasScale();
    const current = scaleToZoomAnimationValue(currentScale);
    const target = scaleToZoomAnimationValue(pendingScale);
    const distance = target - current;

    if (Math.abs(distance) <= 0.01) {
        room.setRoomCanvasScale(pendingScale, pendingPivot, undefined, true);

        pendingScale = NaN;
    } else {
        const step = getZoomAnimationStep(current, target, deltaMs);
        const next = current + (distance < 0 ? -Math.min(step, -distance) : Math.min(step, distance));

        room.setRoomCanvasScale(zoomLevelToScale(next), pendingPivot, undefined, true);
    }
};

export const getNextRoomZoomScale = (room: IRoom | undefined, direction: number): number => getNextZoomScale(getCurrentRoomCanvasZoomScale(room), direction);

/*
 * RoomDesktop.mouseWheelHandler — small wheel deltas (trackpads) are throttled to one
 * step per 400ms; a full mouse-wheel notch (>= 2 lines) always steps.
 */
export const zoomRoomCanvasFromScroll = (room: IRoom | undefined, direction: number, deltaLines: number, pivot: Point): void => {
    if (!canUseAnimatedRoomZoom(room) || direction === 0) return;

    const now = performance.now();
    const bypass = Math.abs(deltaLines) >= ROOM_ZOOM_SCROLL_MOUSE_DELTA_BYPASS_THRESHOLD;

    if (!bypass && lastZoomScrollMillis > 0 && (now - lastZoomScrollMillis) <= ROOM_ZOOM_SCROLL_COOLDOWN_MS) return;

    const scale = getCurrentRoomCanvasZoomScale(room);
    const nextScale = getNextZoomScale(scale, direction);

    if (Math.abs(nextScale - scale) <= ROOM_ZOOM_EPSILON) return;

    animateRoomCanvasScale(room, nextScale, pivot);

    lastZoomScrollMillis = now;
};

export const resetRoomZoom = (): void => {
    pendingScale = NaN;
    pendingPivot = undefined;
    lastZoomScrollMillis = 0;
};

/*
 * RoomEngine.normalizeScreenOffsetForScale — maps a scaled canvas offset into the
 * unscaled offset space the room camera works in.
 */
export const normalizeScreenOffsetForScale = (offset: number, size: number, scale: number): number => {
    if (scale === 0 || scale === 1) return offset;

    const half = (size / scale) / 2;

    return half - (half - offset) / scale;
};
