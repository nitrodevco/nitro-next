import { BindGroup, Container, ExtractImageOptions, ExtractOptions, GenerateTextureOptions, ImageSource, Matrix, pruneTextureBatchBindGroups, RenderGroup, RenderTexture, Sprite, Texture, TextureSource } from 'pixi.js';

import { GetRenderer } from './GetRenderer';
import { TexturePool } from './TexturePool';

/** The strength (`k = 8`) of the sharpen the Flash `AvatarImage` ran over a reduced-size render. */
const REDUCED_TEXTURE_SHARPEN = 8;

/** How long, in ms, a batch bind group may go undrawn before `pruneBatchBindGroups` drops it. */
const BATCH_BIND_GROUP_MAX_IDLE = 30_000;

/** An eventemitter3 listener record, as Pixi's emitters store them. */
type BindListener = { fn: () => void; context: unknown };

/** A texture source or style, seen through the eventemitter3 internals that hold its listeners. */
type BindEmitter = {
    _events?: Record<string, BindListener | BindListener[]>;
    off(event: string, fn: () => void, context: unknown): void;
    removeAllListeners(event: string): void;
};

export class TextureUtils {
    /** Containers whose render groups draw room textures (`RoomSpriteCanvas`'s): `destroyTexture` rebuilds their batches. */
    private static _batchOwners: Set<Container> = new Set();

    /** Registers a container whose sprites draw textures that `destroyTexture` may destroy. */
    public static watchBatches(container: Container): void {
        this._batchOwners.add(container);
    }

    public static unwatchBatches(container: Container): void {
        this._batchOwners.delete(container);
    }

    /**
     * Destroys a texture that a room may have drawn. Pixi v8 keeps each render group's batches - and
     * the texture sources a batch binds - until the group's structure changes; a sprite moved onto a
     * texture whose source is already in its batch (`Texture.EMPTY`, another frame of the same sheet)
     * changes nothing structural, so the old source stays in the cached bind group. Destroyed, that
     * source is bound again on the next draw and Pixi throws (`addressModeU` of null), which stops the
     * ticker - a mannequin whose outfit changed froze its room. So every watched group is rebuilt first.
     */
    public static destroyTexture(texture: Texture, destroySource: boolean = true): void {
        if (!texture || texture.destroyed) return;

        this.rebuildWatchedBatches();

        if (destroySource) this.releaseBatchBindGroups(texture.source);

        texture.destroy(destroySource);
    }

    /** `destroyTexture` for a bare source - a collection's sheet, once its frames are gone. */
    public static destroySource(source: TextureSource): void {
        if (!source || source.destroyed) return;

        this.rebuildWatchedBatches();
        this.releaseBatchBindGroups(source);

        source.destroy();
    }

    /**
     * Rebuilds the batches of every watched container (the room canvases and the UI stage) before a
     * texture they may draw is destroyed. A pooled texture can be drawn by either - an avatar head
     * shows in the room and in a chat bubble - so every destroy path rebuilds them all. A render group
     * only rebuilds its own instructions, so the nested groups under each are marked as well.
     */
    public static rebuildWatchedBatches(): void {
        const markGroup = (group: RenderGroup): void => {
            group.structureDidChange = true;

            for (const child of group.renderGroupChildren) markGroup(child);
        };

        for (const container of this._batchOwners) {
            if (container.destroyed) {
                this._batchOwners.delete(container);

                continue;
            }

            const group = container.renderGroup ?? container.parentRenderGroup;

            if (group) markGroup(group);
        }
    }

    /**
     * Detaches a source, and its style, from Pixi's batch bind groups before the source is destroyed.
     * The WebGPU batcher caches a bind group for every texture combination it has drawn and never evicts
     * one, so a pooled texture reused across frames ends up subscribed to hundreds of them. Destroying the
     * source then warns once per group (`a 'textureSampler' was destroyed while still bound`), flooding the
     * console and stalling the frame. This does what `BindGroup.onResourceChange` would - clears the slot
     * and marks the key dirty - without the warning; the groups are unreachable once the source is gone.
     */
    private static releaseBatchBindGroups(source: TextureSource): void {
        if (!source || source.destroyed) return;

        const handler = (BindGroup.prototype as unknown as { onResourceChange: () => void }).onResourceChange;

        for (const emitter of [ source, source.style ] as unknown as BindEmitter[]) {
            if (!emitter?._events) continue;

            const events = emitter._events.change;

            if (!events) continue;

            const listeners = Array.isArray(events) ? events : [ events ];
            const kept: BindListener[] = [];

            for (const listener of listeners) {
                const { fn, context } = listener;

                if ((fn !== handler) || !(context instanceof BindGroup)) {
                    kept.push(listener);

                    continue;
                }

                for (const key in context.resources) {
                    if ((context.resources[key] as unknown) === emitter) delete context.resources[key];
                }

                (context as unknown as { _dirty: boolean })._dirty = true;
            }

            if (kept.length === listeners.length) continue;

            // One rebuild of the list: eventemitter3's `off` copies the whole list per call, and a pooled
            // source can be subscribed to hundreds of groups, so removing them one by one was quadratic.
            if (kept.length) emitter._events.change = (kept.length === 1) ? kept[0] : kept;
            else emitter.removeAllListeners('change');
        }
    }

    /**
     * Lets textures the room no longer draws be garbage collected. Pixi's WebGPU batcher caches a bind
     * group for every texture combination it has drawn and never evicts one, so every avatar frame,
     * chat bubble and furniture texture of a busy room stayed reachable - with its pixels and hit map -
     * for the rest of the session, even after leaving. The patched `pixi.js` (`.yarn/patches`) adds
     * `pruneTextureBatchBindGroups`, which drops the groups not drawn recently; a dropped group that is
     * drawn again rejoins the cache, so nothing still on screen is affected.
     */
    public static pruneBatchBindGroups(): number {
        return pruneTextureBatchBindGroups(performance.now(), BATCH_BIND_GROUP_MAX_IDLE);
    }

    public static generateTexture(options: GenerateTextureOptions | Container) {
        return this.getRenderer().textureGenerator.generateTexture(options);
    }

    /**
     * Uploads an image-backed source to the GPU now and closes the decoded bitmap behind it, so the
     * sheet is held once - on the GPU - instead of also as a bitmap until its first draw. The
     * renderer's texture garbage collection is turned off for it: with no bitmap left, an unloaded
     * source could not upload again. Its owner releases it (`destroySource`). Does nothing for a
     * source that is not an `ImageBitmap`, or while there is no renderer.
     */
    public static makeGpuResident(source: TextureSource): void {
        const bitmap = source?.resource as unknown;

        if (!source || source.destroyed || (typeof ImageBitmap === 'undefined') || !(bitmap instanceof ImageBitmap)) return;

        const renderer = this.getRenderer();

        if (!renderer) return;

        source.autoGarbageCollect = false;
        renderer.texture.initSource(source);
        bitmap.close();
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

    public static generateCanvas(options: ExtractOptions | Container | Texture) {
        return this.getExtractor().canvas(options);
    }

    public static createRenderTexture(width: number, height: number) {
        if (width < 0 || height < 0) return undefined;

        return RenderTexture.create({ width, height });
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
        const uploadTexture = Texture.from(canvas, true);
        const upload = new Sprite(uploadTexture);

        this.getRenderer().render({
            target: texture,
            container: upload,
            clear: true,
        });

        // Drawn once, by itself: only the batcher's cached bind groups still hold the source.
        upload.destroy();
        this.releaseBatchBindGroups(uploadTexture.source);
        uploadTexture.destroy(true);

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
