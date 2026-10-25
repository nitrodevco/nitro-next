import { Canvas, createCanvas } from '@napi-rs/canvas';

/**
 * An image at half its size, each 2x2 block of pixels averaged into one - what the client's
 * `RoomDownsampleFilter` does to a zoomed-out room after compositing it at full density. The
 * average is of premultiplied pixels, as a GPU's texture samples are: a block half covered keeps
 * its colour at half the opacity rather than darkening towards the transparent pixels' black.
 * A last odd row or column is dropped.
 */
export const halveImage = (source: Canvas): Canvas => {
    const width = Math.max(1, Math.floor(source.width / 2));
    const height = Math.max(1, Math.floor(source.height / 2));
    const input = source.getContext('2d').getImageData(0, 0, source.width, source.height).data;
    const target = createCanvas(width, height);
    const context = target.getContext('2d');
    const output = context.createImageData(width, height);
    const out = output.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let alpha = 0, red = 0, green = 0, blue = 0;

            for (let dy = 0; dy < 2; dy++) {
                for (let dx = 0; dx < 2; dx++) {
                    const sx = Math.min(source.width - 1, (x * 2) + dx);
                    const sy = Math.min(source.height - 1, (y * 2) + dy);
                    const i = ((sy * source.width) + sx) * 4;
                    const a = input[i + 3];

                    alpha += a;
                    red += input[i] * a;
                    green += input[i + 1] * a;
                    blue += input[i + 2] * a;
                }
            }

            const o = ((y * width) + x) * 4;

            if (!alpha) continue;

            out[o] = Math.round(red / alpha);
            out[o + 1] = Math.round(green / alpha);
            out[o + 2] = Math.round(blue / alpha);
            out[o + 3] = Math.round(alpha / 4);
        }
    }

    context.putImageData(output, 0, 0);

    return target;
};
