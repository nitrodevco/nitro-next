/** The widest box a pass blurs over, as `FlashBoxBlurPass`'s. */
const MAX_SIZE = 256;

/** A box's width in pixels, rounded as `FlashBoxBlurPass.size` rounds it (1 or less: no blur). */
const boxSize = (value: number): number => Math.max(1, Math.min(MAX_SIZE, Math.round(value)));

/** One box pass along one axis, from `source` into `target`, each channel rounded back to 8 bits. */
const blurAxis = (source: Uint8ClampedArray, target: Uint8ClampedArray, width: number, height: number, size: number, horizontal: boolean): void => {
    const half = Math.floor(size / 2);
    const lines = horizontal ? height : width;
    const length = horizontal ? width : height;
    const step = (horizontal ? 1 : width) * 4;

    for (let line = 0; line < lines; line++) {
        const start = (horizontal ? (line * width) : line) * 4;

        for (let channel = 0; channel < 4; channel++) {
            const first = start + channel;
            let sum = 0;

            // the window of pixel 0: -half to size - half - 1, past the edge transparent
            for (let i = 0; i < (size - half); i++) {
                if (i < length) sum += source[first + (i * step)];
            }

            for (let i = 0; i < length; i++) {
                target[first + (i * step)] = Math.round(sum / size);

                const leaving = i - half;
                const entering = i + size - half;

                if (leaving >= 0) sum -= source[first + (leaving * step)];
                if (entering < length) sum += source[first + (entering * step)];
            }
        }
    }
};

/**
 * Flash's `BlurFilter` on the CPU, for a bitmap built on a canvas: the box blur `FlashBoxBlurPass`
 * runs on the GPU - each pixel the average of `size` pixels, from floor(size / 2) before it to the
 * rest after, pixels past the edge counting as transparent - `quality` times, horizontal then
 * vertical, each pass kept to 8 bits as the GPU's are. `data` is premultiplied RGBA, blurred in place.
 */
export const flashBlurPixels = (data: Uint8ClampedArray, width: number, height: number, blurX: number, blurY: number, quality: number): void => {
    const sizeX = boxSize(blurX);
    const sizeY = boxSize(blurY);
    const passes = Math.max(1, Math.round(quality));

    if (((sizeX <= 1) && (sizeY <= 1)) || !width || !height) return;

    const scratch = new Uint8ClampedArray(data.length);

    for (let pass = 0; pass < passes; pass++) {
        if (sizeX > 1) {
            blurAxis(data, scratch, width, height, sizeX, true);
            data.set(scratch);
        }

        if (sizeY > 1) {
            blurAxis(data, scratch, width, height, sizeY, false);
            data.set(scratch);
        }
    }
};
