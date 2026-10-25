import { Canvas, createCanvas } from '@napi-rs/canvas';

/**
 * The frames cut down to the union of every frame's visible pixels, so an animation keeps one size
 * throughout, with `padding` transparent pixels left around it: an image scaled with smoothing (a
 * page's css, a canvas drawn at a fractional position) samples past its edge, and the gap keeps
 * the outermost pixels from being clipped there. Frames with nothing visible are left as they are.
 */
export const cropFrames = (frames: Canvas[], padding: number): Canvas[] => {
    let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;

    for (const frame of frames) {
        const { data, width, height } = frame.getContext('2d').getImageData(0, 0, frame.width, frame.height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (!data[(((y * width) + x) * 4) + 3]) continue;

                left = Math.min(left, x);
                top = Math.min(top, y);
                right = Math.max(right, x + 1);
                bottom = Math.max(bottom, y + 1);
            }
        }
    }

    if (!Number.isFinite(left)) return frames;

    const width = (right - left) + (padding * 2);
    const height = (bottom - top) + (padding * 2);

    return frames.map((frame) => {
        const cropped = createCanvas(width, height);

        cropped.getContext('2d').drawImage(frame, left, top, right - left, bottom - top, padding, padding, right - left, bottom - top);

        return cropped;
    });
};
