/**
 * Flash's `BlurFilter` / `DropShadowFilter` at `quality = 1`: one box-blur pass per axis whose
 * window is `blurX` / `blurY` pixels wide and centred on the pixel - an even width straddles
 * the pixel centre, so its outermost taps weigh half. Only the alpha channel is filtered:
 * every caller feeds a single-colour silhouette, whose RGB is the same wherever alpha is.
 * Pixels outside the image count as transparent (the callers pad their canvases).
 */
const boxWeights = (width: number): number[] => {
    if (width <= 0) return [ 1 ];

    const reach = Math.ceil(width / 2);
    const weights: number[] = [];

    for (let i = -reach; i <= reach; i++) {
        const low = Math.max(i - 0.5, -width / 2);
        const high = Math.min(i + 0.5, width / 2);

        weights.push(Math.max(0, high - low) / width);
    }

    return weights;
};

const blurPass = (source: Float32Array, width: number, height: number, weights: number[], horizontal: boolean): Float32Array => {
    if (weights.length === 1) return source;

    const reach = (weights.length - 1) / 2;
    const output = new Float32Array(width * height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let sum = 0;

            for (let k = -reach; k <= reach; k++) {
                const sx = horizontal ? x + k : x;
                const sy = horizontal ? y : y + k;

                if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue;

                sum += source[(sy * width) + sx] * weights[k + reach];
            }

            output[(y * width) + x] = sum;
        }
    }

    return output;
};

export const boxBlurAlpha = (image: ImageData, blurX: number, blurY: number): void => {
    const { width, height, data } = image;
    const count = width * height;
    const alpha = new Float32Array(count);

    for (let i = 0; i < count; i++) alpha[i] = data[(i * 4) + 3];

    const blurred = blurPass(blurPass(alpha, width, height, boxWeights(blurX), true), width, height, boxWeights(blurY), false);

    for (let i = 0; i < count; i++) data[(i * 4) + 3] = Math.round(blurred[i]);
};
