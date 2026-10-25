/**
 * Not Flash's: the libraries a client module shares with the client instead of bundling its own -
 * one React (a second copy could not draw into the client's tree), the theme (`#base/theme`: the
 * window skins, `Frame`, `TemplateWindow`, `ThemeText`, ...), Zustand's `useStore` and the client's
 * app-wide stores.
 *
 * A module reaches them two ways: `api.libs`, once it is activated, and the global
 * `NitroClientModuleHost`, which is set before the first module is imported, so that a module
 * bundled with `react` and the theme mapped to it (Turbo's `docs/client-modules.md`) can bind them
 * at its top level. Pixi's own elements need no import: the client registers them, and a module
 * names them as JSX intrinsics (`pixiGraphics`, `pixiContainer`).
 */
import * as React from 'react';
import * as ReactJsxRuntime from 'react/jsx-runtime';
import * as Zustand from 'zustand';

import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import * as Theme from '#base/theme';

const libraries = {
    react: React,
    reactJsxRuntime: ReactJsxRuntime,
    zustand: { useStore: Zustand.useStore },
    theme: Theme,
    stores: { room: roomStore, system: systemStore, user: userStore },
};

export type ClientModuleLibraries = typeof libraries;

declare global {
    var NitroClientModuleHost: ClientModuleLibraries | undefined;
}

/** The libraries, put on `globalThis` the first time a module needs them. */
export const getClientModuleLibraries = (): ClientModuleLibraries => {
    globalThis.NitroClientModuleHost ??= libraries;

    return libraries;
};
