import { AutoDetectOptions, autoDetectRenderer, Renderer, TextureSource } from 'pixi.js';

let renderer: Renderer;

const ApplyTextureDefaults = () => {
    TextureSource.defaultOptions.scaleMode = 'nearest';
};

/**
 * `destroyEvents` defaults to `true` for nitro-imager's headless usage (`PrepareRenderer({})` -
 * no canvas is ever attached to a page, so there's nothing for Pixi's EventSystem to listen on
 * and it's just wasted setup). A caller that attaches this renderer to a real, interactive
 * canvas passes `destroyEvents: false`: nothing re-attaches events once destroyed, so losing
 * them here is permanent. The client itself takes neither path - `PixiApplicationRoot` hands
 * @pixi/react's own Application-owned renderer to `SetRenderer` below, which leaves events alone.
 */
export const PrepareRenderer = async (options: Partial<AutoDetectOptions>, { destroyEvents = true }: { destroyEvents?: boolean } = {}): Promise<Renderer> => {
    ApplyTextureDefaults();

    renderer = await autoDetectRenderer(options);

    if (destroyEvents) renderer.events?.destroy();

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
