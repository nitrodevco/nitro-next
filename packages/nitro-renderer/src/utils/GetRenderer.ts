import type { AutoDetectOptions, Renderer} from 'pixi.js';
import { autoDetectRenderer } from 'pixi.js';

let renderer: Renderer;

export const PrepareRenderer = async (options: Partial<AutoDetectOptions>): Promise<Renderer> =>
{
    renderer = await autoDetectRenderer(options);

    renderer.events?.destroy();

    return renderer;
};

export const GetRenderer = () => renderer;
