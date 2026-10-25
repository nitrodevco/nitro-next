/** The part of `gifenc` the imager uses; the package ships no types. */
declare module 'gifenc' {
    export type Palette = number[][];

    export interface GifFrameOptions {
        palette?: Palette;
        delay?: number;
        repeat?: number;
        transparent?: boolean;
        transparentIndex?: number;
        dispose?: number;
    }

    export interface GifEncoder {
        writeFrame(index: Uint8Array, width: number, height: number, options?: GifFrameOptions): void;
        finish(): void;
        bytes(): Uint8Array;
    }

    interface Gifenc {
        GIFEncoder(): GifEncoder;
        quantize(rgba: Uint8Array | Uint8ClampedArray, maxColors: number, options?: { format?: 'rgb565' | 'rgb444' | 'rgba4444'; oneBitAlpha?: boolean | number; clearAlpha?: boolean }): Palette;
    }

    const gifenc: Gifenc;

    export default gifenc;
}
