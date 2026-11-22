/**
 * Not Flash's: the `subtract` tint mode of a theme's skins, beside the client's own multiply
 * (`ColorTransform`, a sprite's `tint`). Each channel of a coloured pixel becomes the colour less
 * the pixel's darkness, `colour - (255 - value)`, never under 0, alpha kept: white art takes the
 * colour, black stays black, and a grey comes out darker than multiply makes it (#e0e0e0 under
 * #6fa6e2 is #5087c3, multiply's #6192c6). For a theme whose art was drawn for this tint: it names
 * the mode per variant (`tintMode`), or a call site per window.
 */
export type ThemeTintMode = 'multiply' | 'subtract';

/** Whether a variant's or a call site's value is a mode this reads; anything else is multiply. */
export const isSubtractTint = (mode: unknown): mode is 'subtract' => mode === 'subtract';

/** The subtract tint over RGBA pixels, in place; a fully transparent pixel is left as it is. */
export const subtractTintPixels = (pixels: Uint8ClampedArray, color: number): void => {
    const red = (color >> 16) & 0xff;
    const green = (color >> 8) & 0xff;
    const blue = color & 0xff;

    for (let i = 0; i < pixels.length; i += 4) {
        if (!pixels[i + 3]) continue;

        pixels[i] = red - (255 - pixels[i]);
        pixels[i + 1] = green - (255 - pixels[i + 1]);
        pixels[i + 2] = blue - (255 - pixels[i + 2]);
    }
};
