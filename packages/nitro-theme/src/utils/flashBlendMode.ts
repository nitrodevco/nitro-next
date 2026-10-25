/**
 * Flash's display blend modes (`flash.display.BlendMode`, lower-cased as a window's `BLEND_<mode>` tag
 * gives them - `WindowRendererItem.render`) as Pixi blend modes.
 *
 * The ones Pixi draws with its own blend state - `add`, `multiply`, `screen`, `erase` - always apply.
 * The rest are Pixi's advanced blend modes (`pixi.js/advanced-blend-modes`, loaded with the
 * application root): filters that read what is drawn behind. Under WebGPU they work as they are;
 * under WebGL they need the renderer's back buffer (`useBackBuffer`), which would copy every frame
 * whether anything blends or not - so it stays off, and on WebGL these draw `normal` instead of
 * warning on every frame. `setAdvancedBlendModes` records which it is once the renderer is up.
 *
 * `invert` is Pixi's `difference`: Flash's inverts what is behind wherever the window draws, whatever
 * its colour, which `difference` does for a white source - so an inverting text draws white
 * (`FLASH_INVERT_COLOR`). `layer` and `alpha` change nothing a window here draws.
 */
import { BLEND_MODES, Renderer, RendererType, WebGLRenderer } from 'pixi.js';

const STANDARD: Readonly<Record<string, BLEND_MODES>> = {
    add: 'add',
    multiply: 'multiply',
    screen: 'screen',
    erase: 'erase',
};

const ADVANCED: Readonly<Record<string, BLEND_MODES>> = {
    subtract: 'subtract',
    invert: 'difference',
    difference: 'difference',
    darken: 'darken',
    lighten: 'lighten',
    overlay: 'overlay',
    hardlight: 'hard-light',
};

/** What an inverting window draws in, so `difference` inverts what is behind it as Flash's `invert` does. */
export const FLASH_INVERT_COLOR = '#ffffff';

let advancedBlendModes = false;

/** Whether the renderer draws the advanced blend modes: WebGPU, or WebGL with its back buffer. */
export const setAdvancedBlendModes = (renderer: Renderer): void => {
    const type = Number(renderer.type);

    advancedBlendModes = (type === Number(RendererType.WEBGPU))
        || ((type === Number(RendererType.WEBGL)) && !!(renderer as WebGLRenderer).backBuffer?.useBackBuffer);
};

/** A Flash blend mode's Pixi one; `undefined` for `normal`, an unknown mode, or an advanced one the renderer cannot draw. */
export const flashBlendMode = (mode: string | undefined): BLEND_MODES | undefined => {
    if (!mode) return undefined;

    const key = mode.toLowerCase();

    return STANDARD[key] ?? (advancedBlendModes ? ADVANCED[key] : undefined);
};
