/**
 * Draws the application's frame only when something on it changed - Flash's player redrew only the
 * regions that had; Pixi otherwise redraws the whole stage on every tick, so an idle room still cost
 * ~76 draw calls 60 times a second (and a laptop its battery).
 *
 * Pixi already records every change to the scene for its next render, per render group: a child
 * added, removed or re-ordered (`structureDidChange`), a transform, alpha, tint or visibility
 * changed (`childrenToUpdate`), a sprite's texture or a text or graphic changed
 * (`childrenRenderablesToUpdate`); a container with an `onRender` callback asks for every frame.
 * The render clears them all. What changes the pixels without touching the scene is caught
 * besides: a render into a texture (an avatar frame, a plane, a thumbnail - shown by a sprite whose
 * texture did not change), a texture source's content updated (a canvas redrawn), a layout change
 * waiting for the stage's walk, and a resize. As a backstop the frame is drawn at least once a
 * second, so a change that slipped past all of them is late, never lost.
 */
import { Application, Container, RenderGroup, TextureSource, UPDATE_PRIORITY } from 'pixi.js';

import { isLayoutWalkPending } from './layoutWalkGate';

/** The longest the frame goes undrawn, whatever the signals say. */
const MAX_IDLE_MS = 1000;

let dirty = true;
let sourcesPatched = false;

/** Something outside the scene graph changed what is on screen: draw the next frame. */
export const invalidateFrame = (): void => {
    dirty = true;
};

const isGroupDirty = (group: RenderGroup): boolean => {
    if (group.structureDidChange || (group.childrenRenderablesToUpdate.index > 0)) return true;

    const internals = group as unknown as { _onRenderContainers: Container[] };

    if (internals._onRenderContainers.length) return true;

    for (const depth in group.childrenToUpdate) {
        if (group.childrenToUpdate[depth].index > 0) return true;
    }

    for (const child of group.renderGroupChildren) {
        if (isGroupDirty(child)) return true;
    }

    return false;
};

/** Every texture source's content update (`source.update()`) dirties the frame; once per page. */
const patchTextureSources = (): void => {
    if (sourcesPatched) return;

    sourcesPatched = true;

    const prototype = TextureSource.prototype as unknown as { update: (this: TextureSource) => void };
    const update = prototype.update;

    prototype.update = function (this: TextureSource) {
        dirty = true;

        update.call(this);
    };
};

/**
 * Replaces the ticker's per-tick `app.render` with one drawn only when the frame is dirty. The
 * renderer's other renders - into a texture - still run whenever they are asked for, and dirty it.
 */
export const gateRendering = (app: Application): void => {
    const renderer = app.renderer;
    const render = renderer.render.bind(renderer);

    patchTextureSources();

    renderer.render = ((...args: Parameters<typeof render>) => {
        const [ options ] = args;

        // A render into a texture: what shows that texture changed with it.
        if (options && (typeof options === 'object') && ('target' in options) && options.target) dirty = true;
        else if (args.length > 1) dirty = true;

        return render(...args);
    }) as typeof renderer.render;

    renderer.on('resize', invalidateFrame);

    let lastRender = -Infinity;

    const tick = () => {
        const now = performance.now();
        const group = app.stage.renderGroup;

        if (!dirty && group && !isGroupDirty(group) && !isLayoutWalkPending() && ((now - lastRender) < MAX_IDLE_MS)) return;

        lastRender = now;

        app.render();

        // After, not before: what the frame drew into textures itself (a text's canvas) is on it.
        dirty = false;
    };

    // The listener `TickerPlugin` added: `app.render` itself, called on `app`.
    const { render: tickerRender } = app as unknown as { render: () => void };

    app.ticker.remove(tickerRender, app);
    app.ticker.add(tick, undefined, UPDATE_PRIORITY.LOW);
};
