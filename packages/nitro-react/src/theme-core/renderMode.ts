export type RenderMode = 'pixi' | 'dom';

/**
 * A plain module-level singleton, not React state/Context. A Pixi canvas tree (`@pixi/react`'s
 * `<Application>`, using intrinsics like `pixiContainer`) and a plain `react-dom` tree are
 * different reconciler roots that cannot mix within one mounted React tree, so the render mode
 * has to be picked once, before either tree mounts, and never toggled live or mixed on a
 * per-component basis within one screen. Every dual-target theme-pixi component just reads it
 * during render via `getRenderMode()`.
 */
let mode: RenderMode = 'pixi';

export const setRenderMode = (next: RenderMode): void => {
    mode = next;
};

export const getRenderMode = (): RenderMode => mode;
