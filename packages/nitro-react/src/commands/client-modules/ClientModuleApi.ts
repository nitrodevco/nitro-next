/**
 * Not Flash's: version 1 of what a client module is handed - `activate(api)` - by the loader in
 * `commands/client-modules`. Everything a module adds through it is taken out again when the module
 * stops, whether or not it disposed of it itself; each `register`/`add`/`handle` also returns the
 * function that takes that one thing out early.
 *
 * Turbo's `docs/client-modules.md` is the module author's side of it.
 */
import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';
import type { TemplateBinding, TemplatePatchOp, TemplatePatchReport } from '@nitrodevco/nitro-theme';
import type { ComponentType, ReactNode } from 'react';

import type { ClientModuleAlert, ClientModuleAvatar, ClientModuleHotelViewLayerProps, ClientModuleWindowProps } from '#base/context/client-modules';

import type { ClientModuleLibraries } from './clientModuleLibraries';

export type ClientModuleDispose = () => void;

/** A query for `api.http.get`: each value sent as text. */
export type ClientModuleHttpQuery = Record<string, string | number | boolean>;

/**
 * A plugin web route's answer. Never thrown for an HTTP error: `ok` is false, `status` the HTTP status
 * (0 when the call could not be made: no plugin routes on this hotel, a path outside the plugin's own)
 * and `error` the route's message. `data` is the JSON body.
 */
export interface ClientModuleHttpResponse<T = unknown> {
    ok: boolean;
    status: number;
    data: T | undefined;
    error: string | undefined;
}

/** What a composer writes: an int, a string or a boolean (a byte), in wire order. */
export type ClientModulePacketValue = number | string | boolean;

export interface ClientModuleApi {
    readonly version: 1;
    /** The module's key: its plugin's. */
    readonly key: string;
    /**
     * The URL the module was named by. A module checked by its SHA-256 runs from a `blob:` URL, so
     * `import.meta.url` cannot find the files beside it: `new URL('icon.png', api.baseUrl)` can.
     */
    readonly baseUrl: string;
    /** The client's own React, theme and stores, shared rather than bundled a second time. */
    readonly libs: ClientModuleLibraries;
    windows: {
        /**
         * A window by id: the component is drawn in the client's window layer while it is open. With
         * `onTop` it stays above every other window (a HUD, a timer), under the client's menus,
         * hints and modal dialogs.
         */
        register: (id: string, component: ComponentType<ClientModuleWindowProps>, options?: { onTop?: boolean }) => ClientModuleDispose;
        open: (id: string, params?: Record<string, unknown>) => void;
        close: (id: string) => void;
        toggle: (id: string, params?: Record<string, unknown>) => void;
    };
    toolbar: {
        /** An icon in the bottom bar, after the client's own: `icon` is an image URL. */
        add: (item: { id: string; icon: string; tooltip?: string; onClick: () => void }) => ClientModuleDispose;
    };
    meMenu: {
        /** An entry in the me menu, before its spacer: a clone of the profile entry with its own caption. */
        add: (item: { id: string; caption: string; onClick: () => void }) => ClientModuleDispose;
        /** Opens or closes the me menu, as its toolbar icon and Habbo's `toolbar/memenu` link do. */
        toggle: () => void;
    };
    links: {
        /** Every in-client link `<prefix>/...` that the client itself has no route for. */
        handle: (prefix: string, handler: (link: string) => void) => ClientModuleDispose;
        /** Opens an in-client link, the client's or a module's. */
        open: (link: string) => void;
    };
    packets: {
        /** Reads an extension header's packet and hands it to `listener`. Undefined when the header is not free. */
        registerParser: <T>(header: number, parse: (wrapper: IMessageDataWrapper) => T, listener: (data: T) => void) => ClientModuleDispose | undefined;
        /** Claims an extension header to send on. Undefined when the header is not free. */
        registerComposer: (header: number) => ClientModuleDispose | undefined;
        /** Sends on a header the module claimed: each value an int, a string or a boolean. */
        send: (header: number, ...values: ClientModulePacketValue[]) => void;
    };
    /**
     * The plugin's named messages (Turbo's `client.messages`, `docs/plugin-messages.md`): read and
     * written by name, from the field schema the server sends, so a module never sees a header.
     * A plain-JavaScript module that may meet an older client feature-detects with `api.messages?.`.
     */
    messages: {
        /**
         * Every `name` message the server sends, as an object of its fields (camelCase, as the
         * schema names them). A name the server's list does not have warns once; the handler is kept,
         * since a plugin loading on the server may send its module before its messages' list.
         */
        on: (name: string, handler: (data: Record<string, unknown>) => void) => ClientModuleDispose;
        /**
         * Sends `name` with `data`'s fields, written in the schema's order. A field the schema does
         * not have is ignored and a missing one sent as its default (0, '', false, []), each logged
         * once; a name the server did not list warns and sends nothing.
         */
        send: (name: string, data: Record<string, unknown>) => void;
    };
    /**
     * The module's own plugin's web routes (`IPluginWebRoute`) on the hotel's public web host:
     * `path` is under `/api/plugins/<key>/`, such as `'top'` or `'scores/42'`. The client signs the
     * call in as the player; the module never sees a token. Rejects only when the network fails.
     */
    http: {
        get: <T = unknown>(path: string, query?: ClientModuleHttpQuery) => Promise<ClientModuleHttpResponse<T>>;
        post: <T = unknown>(path: string, body?: unknown) => Promise<ClientModuleHttpResponse<T>>;
        put: <T = unknown>(path: string, body?: unknown) => Promise<ClientModuleHttpResponse<T>>;
        patch: <T = unknown>(path: string, body?: unknown) => Promise<ClientModuleHttpResponse<T>>;
        delete: <T = unknown>(path: string) => Promise<ClientModuleHttpResponse<T>>;
    };
    config: {
        /** A configuration value as the hotel set it, `undefined` when unset. */
        get: (key: string) => unknown;
    };
    texts: {
        /** A text by key, `%name%` replaced from `replacements`; `fallback` when the hotel has none. */
        get: (key: string, fallback?: string, replacements?: Record<string, string>) => string;
    };
    sounds: {
        /** A sample of the client's sound manager by id, at the UI volume. */
        play: (soundId: string) => void;
    };
    room: {
        /** Draws over every avatar in the room, placed above its head every frame. */
        avatarOverlay: (render: (avatar: ClientModuleAvatar) => ReactNode) => ClientModuleDispose;
        /** Leaves the room for the hotel view, as the toolbar's hotel view icon does. Nothing outside a room. */
        leave: () => void;
    };
    hotelView: {
        /**
         * A layer of the reception, drawn with its moving objects: over its background art and under
         * its widgets, its hotel top and left backdrop, while the reception is shown. Layers added
         * later are drawn over earlier ones. With `replacesBackground` the layer is the backdrop: the
         * reception's own background bitmaps (its sky, horizon, hotel and hill) are hidden while it is added.
         */
        addLayer: (component: ComponentType<ClientModuleHotelViewLayerProps>, options?: { replacesBackground?: boolean }) => ClientModuleDispose;
    };
    notifications: {
        /** A bubble layout: a template of the bundles (`<library>/<asset>_xml`) and its height. */
        registerLayout: (name: string, layout: { template: string; height: number }) => ClientModuleDispose;
        /**
         * A bubble in the client's stack, drawn with a registered layout. With `stay` it never times
         * out and a click does not dismiss it; `timeDisplay` is how long (ms) any other stays up.
         * An `id` is added only while no bubble of the module's with that id is queued or up.
         * Returns the function that takes the bubble down (the module's stop takes a `stay` one down).
         */
        add: (layout: string, text: string, options?: { image?: string; link?: string; stay?: boolean; timeDisplay?: number; id?: string }) => ClientModuleDispose;
        /**
         * The picture of every alert and notification popup, open or yet to open: `resolve` is shown each
         * with the picture it has (an asset name or a URL, `undefined` for none) and gives another, or
         * `undefined` to leave it.
         */
        setIllustration: (resolve: (alert: ClientModuleAlert) => string | undefined) => ClientModuleDispose;
    };
    templates: {
        /**
         * Changes a core window's template (`<library>/<asset>`) as data: `set` layout properties, `remove`
         * an element or `insert` one, each naming its element as the window's code does (`'name'`,
         * `'panel/name'`, `''` for the window). Patches from every module and plugin apply together in
         * order (`order`, then key); an element this module adds is named `<key>:<name>` and only this
         * module reaches it by its short name. Conflicts and elements a release no longer has are logged
         * and kept in `report`.
         */
        patch: (template: string, ops: readonly TemplatePatchOp[], options?: { order?: number }) => ClientModuleDispose;
        /** What the window's code would bind, for an element this module added: a caption, a click, a picture. */
        bind: (template: string, element: string, binding: TemplateBinding) => ClientModuleDispose;
        /** The last application's conflicts and unmatched elements for a template, once it has been drawn. */
        report: (template: string) => TemplatePatchReport | undefined;
    };
}
