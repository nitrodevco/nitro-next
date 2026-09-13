import { Container, ExtractImageOptions, ExtractOptions, GenerateTextureOptions, ImageSource, Matrix, RenderTexture, Sprite, Texture } from 'pixi.js';

import { GetRenderer } from './GetRenderer';
import { TexturePool } from './TexturePool';

/** The strength (`k = 8`) of the sharpen the Flash `AvatarImage` ran over a reduced-size render. */
const REDUCED_TEXTURE_SHARPEN = 8;

export class TextureUtils {
    public static generateTexture(options: GenerateTextureOptions | Container) {
        return this.getRenderer().textureGenerator.generateTexture(options);
    }

    public static generateTextureFromImage(image: HTMLImageElement): Texture {
        return Texture.from(image);
    }

    /** Decodes an encoded image straight into a texture. A `Blob` is handed to the decoder as is - no intermediate byte copy. */
    public static async textureFromEncodedBytes(bytes: ArrayBuffer | Uint8Array | Blob, mimeType: string = 'image/png', label?: string): Promise<Texture> {
        const bitmap = await createImageBitmap(bytes instanceof Blob ? bytes : new Blob([ bytes as BlobPart ], { type: mimeType }));
        const texture = new Texture({ source: new ImageSource({ resource: bitmap, label }) });

        if (label) texture.label = label;

        return texture;
    }

    public static async generateImage(options: ExtractImageOptions | Container | Texture) {
        return this.getExtractor().image(options);
    }

    public static async generateImageUrl(options: ExtractImageOptions | Container | Texture) {
        return this.getExtractor().base64(options);
    }

    public static generateCanvas(options: ExtractOptions | Container | Texture) {
        return this.getExtractor().canvas(options);
    }

    public static clearRenderTexture(texture: Texture): Texture {
        return this.writeToTexture(new Sprite(Texture.EMPTY), texture);
    }

    public static createRenderTexture(width: number, height: number) {
        if (width < 0 || height < 0) return undefined;

        return RenderTexture.create({ width, height });
    }

    public static createAndFillRenderTexture(
        width: number,
        height: number,
        color: number = 16777215,
    ): Texture | undefined {
        if (width < 0 || height < 0) return undefined;

        const renderTexture = this.createRenderTexture(width, height);

        if (renderTexture) {
            return this.clearAndFillRenderTexture(renderTexture, color);
        }

        return renderTexture;
    }

    public static createAndWriteRenderTexture(
        width: number,
        height: number,
        container: Container,
        transform: Matrix | undefined = undefined,
    ): Texture | undefined {
        const renderTexture = this.createRenderTexture(width, height);

        if (renderTexture) {
            return this.writeToTexture(container, renderTexture, true, transform);
        }

        return renderTexture;
    }

    public static clearAndFillRenderTexture(texture: Texture, color: number = 16777215): Texture {
        if (!texture) return texture;

        const sprite = new Sprite(Texture.WHITE);

        sprite.tint = color;

        sprite.width = texture.width;
        sprite.height = texture.height;

        return this.writeToTexture(sprite, texture);
    }

    public static writeToTexture(
        container: Container,
        target: Texture,
        clear: boolean = true,
        transform: Matrix | undefined = undefined,
    ): Texture {
        if (container && target)
            this.getRenderer().render({
                container,
                target,
                clear,
                transform,
            });

        return target;
    }

    public static flipTextureHorizontal(texture: Texture) {
        if (!texture) return texture;

        const matrix = new Matrix();

        matrix.scale(-1, 1);
        matrix.translate(texture.width, 0);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static flipTextureVertical(texture: Texture) {
        if (!texture) return texture;

        const matrix = new Matrix();

        matrix.scale(1, -1);
        matrix.translate(0, texture.height);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static flipTextureHorizontalAndVertical(texture: Texture) {
        if (!texture) return texture;

        const matrix = new Matrix();

        matrix.scale(-1, -1);
        matrix.translate(texture.width, texture.height);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static makeWhiteTransparent(texture: Texture) {
        if (!texture) return texture;

        const frame = texture.frame;
        const canvas = document.createElement('canvas');

        canvas.width = frame.width;
        canvas.height = frame.height;

        const ctx = canvas.getContext('2d');

        if (!ctx) return texture;

        ctx.drawImage(texture.source.resource, frame.x, frame.y, frame.width, frame.height, 0, 0, frame.width, frame.height);

        const imageData = ctx.getImageData(0, 0, frame.width, frame.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const luminance = (r + g + b) / 3;

            data[i + 3] = 255 - luminance;
        }

        ctx.putImageData(imageData, 0, 0);

        return Texture.from(canvas);
    }

    /**
     * A copy of `source` drawn at `scale`, the way the Flash `AvatarImage` reduced its renders:
     * `BitmapData.draw` with smoothing (an area-averaged resample), then a 3x3 sharpen
     * (`ConvolutionFilter(3, 3, [-0.08 x 8, 1.64], 1)`) with Flash's defaults - `preserveAlpha`
     * (only RGB is sharpened, so a cut-out avatar gets no halo) and `clamp` (edge pixels sample
     * themselves outward). Pixel art scaled down with nearest-neighbour sampling drops whole rows
     * and columns and looks squashed; this keeps it legible and matches the SWF pixel for pixel.
     *
     * Done on a 2D canvas rather than as a GPU filter: a shader convolution runs on premultiplied
     * RGBA (alpha gets sharpened too, fringing the edges) and its texel size drifts with the
     * render target's resolution. The result is a pooled render texture the caller owns
     * (`TexturePool.releaseTexture` when done).
     */
    public static createReducedTexture(source: Texture, scale: number): RenderTexture | undefined {
        const width = Math.max(1, Math.ceil(source.width * scale));
        const height = Math.max(1, Math.ceil(source.height * scale));
        const sourceCanvas = this.generateCanvas(source) as HTMLCanvasElement;
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) return undefined;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(sourceCanvas, 0, 0, width, height);

        const image = ctx.getImageData(0, 0, width, height);

        ctx.putImageData(this.sharpen(image), 0, 0);

        const texture = TexturePool.createRenderTexture(width, height);

        if (!texture) return undefined;

        // A one-off upload: skip Pixi's global `Cache`, which would otherwise register the canvas.
        const upload = new Sprite(Texture.from(canvas, true));

        this.getRenderer().render({
            target: texture,
            container: upload,
            clear: true,
        });

        upload.destroy({ texture: true, textureSource: true });

        return texture;
    }

    /** The Flash `AvatarImage` sharpen: 3x3 kernel, divisor 1, alpha preserved, edges clamped. */
    private static sharpen(image: ImageData): ImageData {
        const { width, height, data } = image;
        const edge = REDUCED_TEXTURE_SHARPEN / -100;
        const center = (edge * -8) + 1;
        const output = new ImageData(width, height);
        const out = output.data;

        const sample = (x: number, y: number, channel: number): number => {
            const cx = x < 0 ? 0 : (x >= width ? width - 1 : x);
            const cy = y < 0 ? 0 : (y >= height ? height - 1 : y);

            return data[(((cy * width) + cx) * 4) + channel];
        };

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = ((y * width) + x) * 4;

                for (let channel = 0; channel < 3; channel++) {
                    let value = sample(x, y, channel) * center;

                    value += (sample(x - 1, y - 1, channel) + sample(x, y - 1, channel) + sample(x + 1, y - 1, channel)) * edge;
                    value += (sample(x - 1, y, channel) + sample(x + 1, y, channel)) * edge;
                    value += (sample(x - 1, y + 1, channel) + sample(x, y + 1, channel) + sample(x + 1, y + 1, channel)) * edge;

                    out[index + channel] = value < 0 ? 0 : (value > 255 ? 255 : Math.round(value));
                }

                out[index + 3] = data[index + 3];
            }
        }

        return output;
    }

    public static getPixels(options: ExtractOptions | Container | Texture) {
        return this.getExtractor().pixels(options);
    }

    public static getRenderer() {
        return GetRenderer();
    }

    public static getExtractor() {
        return this.getRenderer().extract;
    }
}
