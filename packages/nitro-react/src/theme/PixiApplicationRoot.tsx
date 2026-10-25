import { GetRoomStage } from '@nitrodevco/nitro-renderer';
import { PixiApplicationRoot as ThemeApplicationRoot } from '@nitrodevco/nitro-theme';
import { Application as PixiApplication, Container } from 'pixi.js';
import { ComponentProps } from 'react';

/** The two recursive walks `@pixi/layout`'s `LayoutSystem` makes over the stage before every render. */
type LayoutWalker = {
    _updateSize: (this: LayoutWalker, container: Container) => void;
    updateLayout: (this: LayoutWalker, container: Container) => void;
};

/**
 * Keeps `@pixi/layout` out of the room stage. Before every render it walks the whole stage twice,
 * into every room sprite - thousands in a busy room - though nothing under the room stage has a
 * layout (the room canvases, the backdrop and the colorizer are plain Pixi), so the walk there only
 * recursed. The walks call themselves through the instance, so wrapping them stops at the room stage.
 * Anything given a `layout` must not be put under the room stage.
 */
const skipLayoutWalk = (app: PixiApplication, skipped: Container) => {
    const layout = (app.renderer as unknown as { layout?: LayoutWalker }).layout;

    if (!layout || (typeof layout._updateSize !== 'function') || (typeof layout.updateLayout !== 'function')) return;

    const updateSize = layout._updateSize;
    const updateLayout = layout.updateLayout;

    layout._updateSize = function (this: LayoutWalker, container: Container) {
        if (container !== skipped) updateSize.call(this, container);
    };

    layout.updateLayout = function (this: LayoutWalker, container: Container) {
        if (container !== skipped) updateLayout.call(this, container);
    };
};

/** The room stage goes under everything the UI draws: the first child of the stage. */
const addRoomStage = (app: PixiApplication) => {
    app.stage.addChild(GetRoomStage());

    skipLayoutWalk(app, GetRoomStage());
};

/** A right click on the canvas opens no browser menu: the client's own menus answer it. */
const blockContextMenu = (app: PixiApplication) => {
    app.canvas.addEventListener('contextmenu', event => event.preventDefault());
};

const initClient = (app: PixiApplication) => {
    addRoomStage(app);
    blockContextMenu(app);
};

/** The theme's root, with the client's room stage on it. */
export const PixiApplicationRoot = (props: Omit<ComponentProps<typeof ThemeApplicationRoot>, 'onInit'>) => (
    <ThemeApplicationRoot
        {...props}
        onInit={initClient}
    />
);
