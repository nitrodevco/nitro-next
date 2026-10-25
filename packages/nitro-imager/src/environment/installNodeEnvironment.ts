import { Canvas, createCanvas, Image, ImageData, loadImage } from '@napi-rs/canvas';
import { Adapter, DOMAdapter, EventSystem, extensions } from 'pixi.js';

import { fetchWithFiles } from './fetchWithFiles';

/** How often, in ms, the stand-in `requestAnimationFrame` calls back. */
const TICK_INTERVAL = 250;

/**
 * The browser the renderer was written for, as far as it reaches, on `@napi-rs/canvas`.
 *
 * The renderer decodes every bitmap of a bundle with `createImageBitmap`, makes scratch canvases
 * with `document.createElement('canvas')`, and Pixi's Canvas 2D renderer tells sources apart with
 * `instanceof HTMLCanvasElement` / `ImageBitmap` and builds pixels with `ImageData`. Each of those
 * is bound to the native canvas library's own class, so the renderer runs unchanged: a decoded
 * bitmap is an `Image`, every canvas a `Canvas`, and `ctx.drawImage` takes either.
 *
 * Only what the avatar path calls exists. `document` has nothing but `createElement` and a `body`
 * holding no canvas, and `window` holds only the renderer's config (`setRendererConfig`).
 */
export const installNodeEnvironment = (): void => {
    const globals = globalThis as Record<string, unknown>;

    globals.HTMLCanvasElement ??= Canvas;
    globals.HTMLImageElement ??= Image;
    globals.ImageBitmap ??= Image;
    globals.ImageData ??= ImageData;
    globals.createImageBitmap ??= decodeImage;
    // Pixi's system ticker drives the renderer's scheduled work (the texture garbage collector);
    // nothing here animates, so it is woken a few times a second rather than every frame.
    globals.requestAnimationFrame ??= (callback: (time: number) => void) => setTimeout(() => callback(performance.now()), TICK_INTERVAL);
    globals.cancelAnimationFrame ??= (handle: ReturnType<typeof setTimeout>) => clearTimeout(handle);
    globals.document ??= {
        // Any other element is a detached stand-in: Pixi's DOM pipe makes a `div` overlay it
        // never attaches, as nothing here has a page.
        createElement: (tagName: string) => ((tagName.toLowerCase() === 'canvas') ? createNodeCanvas() : { ...inertElement(), children: [], appendChild: () => undefined, remove: () => undefined }),
        // Pixi asks whether a canvas is on the page to know if it renders to the screen: none is.
        body: { contains: () => false },
    };

    // A bundle or table may be a file on the server rather than a url (`resolveAddress`).
    globalThis.fetch = fetchWithFiles(globalThis.fetch);

    // No pointer ever moves here, and the event system would listen on a window there isn't.
    extensions.remove(EventSystem);

    DOMAdapter.set(NodeAdapter);
};

/**
 * The hotel's client configuration, where the renderer reads it (`GetConfigValue`:
 * `window.NitroParsedConfig`) - the same values the client was given, so every gate the
 * renderer checks is decided as it is in the client. `window` holds nothing else.
 */
export const setRendererConfig = (config: Record<string, unknown>): void => {
    (globalThis as Record<string, unknown>).window = { NitroParsedConfig: { ...config } };
};

/**
 * A canvas that answers `getContext('webgl')` the way a browser without WebGL does, with `null`:
 * the native library throws instead, and Pixi probes for a GL context while setting up its
 * Canvas renderer (the particle pipe's shader precision test).
 */
const createNodeCanvas = (width: number = 1, height: number = 1): Canvas => {
    const canvas = createCanvas(Math.max(1, width), Math.max(1, height));
    const getContext = canvas.getContext.bind(canvas) as (type: string, options?: unknown) => unknown;

    (canvas as unknown as { getContext: typeof getContext }).getContext = (type, options) => ((type === '2d') ? getContext(type, options) : null);

    return Object.assign(canvas, inertElement());
};

/** What an element on no page needs for Pixi to style it and listen on it: nothing that does anything. */
const inertElement = () => ({
    style: {},
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
});

/** `createImageBitmap(blob)`: the encoded bytes, decoded by the native library. */
const decodeImage = async (source: Blob | ArrayBuffer | Uint8Array): Promise<Image> => {
    const bytes = (source instanceof Blob) ? new Uint8Array(await source.arrayBuffer()) : new Uint8Array(source as ArrayBuffer);

    return loadImage(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength));
};

const NodeAdapter: Adapter = {
    createCanvas: (width?: number, height?: number) => createNodeCanvas(width, height) as unknown as ReturnType<Adapter['createCanvas']>,
    createImage: () => new Image() as unknown as ReturnType<Adapter['createImage']>,
    getCanvasRenderingContext2D: () => ({ prototype: Object.getPrototypeOf(createCanvas(1, 1).getContext('2d')) }),
    getWebGLRenderingContext: () => {
        throw new Error('The imager renders with the Canvas 2D renderer; WebGL is not available');
    },
    getNavigator: () => ({ userAgent: `node/${process.version}`, gpu: null }),
    getBaseUrl: () => `file://${process.cwd()}/`,
    getFontFaceSet: () => null,
    fetch: (url: RequestInfo, options?: RequestInit) => fetch(url, options),
    parseXML: () => {
        throw new Error('XML parsing is not available to the imager');
    },
};
