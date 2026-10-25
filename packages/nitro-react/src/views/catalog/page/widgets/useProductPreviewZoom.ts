import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

/** `PREVIEW_ZOOM_NORMAL` / `PREVIEW_ZOOM_IN`, and the zoom animation's constants. */
export const PREVIEW_ZOOM_NORMAL = 1;
export const PREVIEW_ZOOM_IN = 2;
export const PREVIEW_ZOOM_IN_CAMERA_OFFSET_Y = 41;
const PREVIEW_ZOOM_MOVE_SPEED_DENOMINATOR = 9;
const PREVIEW_ZOOM_SPEED_SLOW = 0.12;
const PREVIEW_ZOOM_SPEED_MIN = 0.06;

/** `applyRoomCanvasZoom`'s scale above 1: `(PREVIEW_ZOOM_IN - PREVIEW_ZOOM_NORMAL) * progress`. */
export const progressScale = (progress: number) => ((PREVIEW_ZOOM_IN - PREVIEW_ZOOM_NORMAL) * progress);

/**
 * The product view's avatar preview zoom (`ProductViewCatalogWidget`): `zoomProgress` runs from 0
 * (1x) to 1 (2x) and eases towards `setZoomTarget`'s target; `setZoom` puts both there at once.
 */
export const useProductPreviewZoom = () => {
    const [ zoomProgress, setZoomProgress ] = useState(0);
    const [ zoomTarget, setZoomTarget ] = useState(0);

    /** Zoom straight to `value`, without the animation. */
    const setZoom = (value: number) => {
        setZoomTarget(value);
        setZoomProgress(value);
    };

    // `onPreviewZoomAnimationFrame`: ease the zoom towards its target, fast in the middle.
    useEffect(() => {
        if (zoomProgress === zoomTarget) return;

        let progress = zoomProgress;
        let peak = Math.abs(zoomTarget - zoomProgress);
        let lastStep = 0;
        let accelerating = true;

        const step = () => {
            const remaining = zoomTarget - progress;
            const distance = Math.abs(remaining);

            if (distance <= PREVIEW_ZOOM_SPEED_SLOW) {
                progress = zoomTarget;
                setZoomProgress(progress);
                // Arrived: the tick stops here rather than setting the same value every frame.
                GetTicker().remove(step);

                return;
            }

            if (distance > peak) peak = distance;

            const wave = Math.sin((Math.PI * distance) / peak);
            let speed = PREVIEW_ZOOM_SPEED_MIN + (((peak / PREVIEW_ZOOM_MOVE_SPEED_DENOMINATOR) - PREVIEW_ZOOM_SPEED_MIN) * wave);

            if (accelerating) {
                if (speed < lastStep) speed = Math.min(lastStep, distance);
                else accelerating = false;
            }

            lastStep = speed;
            progress += (remaining > 0) ? speed : -speed;
            setZoomProgress(progress);
        };

        GetTicker().add(step);

        return () => {
            GetTicker().remove(step);
        };
    }, [ zoomTarget ]);

    return { zoomProgress, setZoomTarget, setZoom };
};

export type ProductPreviewZoom = ReturnType<typeof useProductPreviewZoom>;
