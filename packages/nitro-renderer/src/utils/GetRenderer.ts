import { AutoDetectOptions, Renderer } from 'pixi.js';
import { autoDetectRenderer, TextureSource } from 'pixi.js';

let renderer: Renderer;

const ApplyTextureDefaults = () => {
    TextureSource.defaultOptions.scaleMode = 'nearest';
};

export const PrepareRenderer = async (options: Partial<AutoDetectOptions>): Promise<Renderer> => {
    ApplyTextureDefaults();

    renderer = await autoDetectRenderer(options);

    renderer.events?.destroy();

    return renderer;
};

/**
 * Adopts an already-created renderer (e.g. one owned by a @pixi/react <Application>)
 * as the shared renderer instead of creating a new one via PrepareRenderer. Used so the
 * room and UI can render through a single Renderer/GPU context and share textures without
 * re-uploading them. Unlike PrepareRenderer, this does NOT destroy renderer.events, since a
 * shared renderer needs Pixi's event system alive for UI interactivity.
 */
export const SetRenderer = (r: Renderer) => {
    ApplyTextureDefaults();

    renderer = r;
};

export const GetRenderer = () => renderer;
