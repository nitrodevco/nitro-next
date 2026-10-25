/**
 * Not Flash's: version 1.1 of what a client module is handed - `activate(api)` - by the loader in
 * `commands/client-modules`. Everything a module adds through it is taken out again when the module
 * stops, whether or not it disposed of it itself; each `register`/`add`/`handle` also returns the
 * function that takes that one thing out early.
 *
 * Turbo's `docs/client-modules.md` is the module author's side of it.
 */
import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';
import type { TemplateBinding, TemplateContext, TemplatePatchOp, TemplatePatchReport, TemplateWindows } from '@nitrodevco/nitro-theme';
import type { ComponentType, ReactNode } from 'react';

import type { ClientModuleAlert, ClientModuleAvatar, ClientModuleChatCommand, ClientModuleContextMenu, ClientModuleContextMenuTargets, ClientModuleEventName, ClientModuleEvents, ClientModuleHotelViewLayerProps, ClientModuleHotelViewWidgetProps, ClientModuleState, ClientModuleWindowProps } from '#base/context/client-modules';

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

/** A module's button in a room menu (`api.contextMenu.add`). */
export interface ClientModuleContextMenuButton<M extends ClientModuleContextMenu = ClientModuleContextMenu> {
    /** Unique in the module. */
    id: string;
    /** `user`: another user's avatar menu; `ownUser`: the own avatar's; `furni`: the furni infostand's buttons. */
    menu: M;
    label: string;
    /** An image URL (`assetUrl('icon.png')`), drawn at the row's right in the avatar menus; the infostand's buttons have no picture. */
    icon?: string;
    /** Whether the button shows for this avatar or furni, asked each time the menu is drawn; shown when left out. */
    when?: (target: ClientModuleContextMenuTargets[M]) => boolean;
    onClick: (target: ClientModuleContextMenuTargets[M]) => void;
}

export interface ClientModuleApi {
    readonly version: 1;
    /**
     * The minor version: 1 for API 1.1 (`state`, `events`, `contextMenu`, `chatCommands`), 2 for 1.2
     * (`channels`, `links.handle`'s `path`). A plain-JavaScript module that may meet an older client
     * reads `api.minor ?? 0`.
     */
    readonly minor: 2;
    /** The module's key: its plugin's. */
    readonly key: string;
    /**
     * The URL the module was named by. A module checked by its SHA-256 runs from a `blob:` URL, so
     * `import.meta.url` cannot find the files beside it: `new URL('icon.png', api.baseUrl)` can.
     */
    readonly baseUrl: string;
    /**
     * The client's own React, theme and stores, shared rather than bundled a second time. `stores` is
     * deprecated since 1.1: read `state` and `events`, which keep their shape across releases.
     */
    readonly libs: ClientModuleLibraries;
    /**
     * The own user, their club and purse, and the room they are in, read-only. `get()` is the state
     * now; a part keeps its identity until a field in it changes, so `use(x => x.user)` in a component
     * draws again only then. `hasPermission(node, level)` is the client's gate rule: the node when the
     * server sent permission nodes, else the security level when one is named.
     */
    state: {
        get: () => ClientModuleState;
        subscribe: (listener: (state: ClientModuleState, previous: ClientModuleState) => void) => ClientModuleDispose;
        use: <T>(selector: (state: ClientModuleState) => T) => T;
        hasPermission: (node: string, level?: number) => boolean;
    };
    /**
     * The room's events from the moment a handler is added: entered and left, avatars and furni added,
     * removed and clicked, and every line said (`ClientModuleEvents`). A handler that throws is logged.
     */
    events: {
        on: <E extends ClientModuleEventName>(event: E, handler: (data: ClientModuleEvents[E]) => void) => ClientModuleDispose;
    };
    contextMenu: {
        /**
         * A button in a room menu, after the client's own rows: a row of the menu's template added
         * as a template patch (`<key>:<id>`, so the inspector and `templates.report` list it) and
         * drawn by the menu while `when` passes.
         */
        add: <M extends ClientModuleContextMenu>(button: ClientModuleContextMenuButton<M>) => ClientModuleDispose;
    };
    chatCommands: {
        /**
         * A `:name` command run in the client: the chat input offers it with the client's own and the
         * server's, and a line it matches is not said unless `run` returns `false`. The client's own
         * commands come first: a module cannot take `:furni`.
         */
        register: (command: ClientModuleChatCommand) => ClientModuleDispose;
    };
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
        /**
         * Every in-client link `<prefix>/...` that the client itself has no route for - or, with `path`
         * (`'news/*'`: the parts after the prefix, `*` any one), those whose parts begin with it. A link
         * goes to the handlers of the most specific path that matches, else to every handler of the whole
         * prefix. Two modules on one prefix and path both get its links: a conflict, warned and listed
         * by the extension inspector.
         */
        handle: (prefix: string, handler: (link: string) => void, options?: { path?: string }) => ClientModuleDispose;
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
     * Data shared with the other modules by key (`'news.promo'`), not through links. `publish` hands
     * the value to the key's subscribers and keeps it as the key's value; `subscribe` is handed each
     * value from then on, and at once the one kept, with the key of the module that published it. A
     * stopped module's values are cleared (its subscribers handed `undefined`). Publish plain data, a
     * new object for each change. Optional (`api.channels?.`): clients before it have none.
     */
    channels: {
        publish: <T = unknown>(key: string, value: T) => void;
        subscribe: <T = unknown>(key: string, handler: (value: T | undefined, from: string | undefined) => void) => ClientModuleDispose;
        get: <T = unknown>(key: string) => T | undefined;
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
        /**
         * A widget in one of the reception's widget slots (`landing.view.dynamic.slot.<n>`: 1 across
         * the top, 2 and 4 the left column, 3 and 5 the right, 6 the bottom slot), drawn there in
         * place of the hotel's configured widget while it is added and laid out as one: the slot
         * takes the size the component draws at. The last widget added for a slot is the one shown.
         */
        addWidget: (slot: number, component: ComponentType<ClientModuleHotelViewWidgetProps>) => ClientModuleDispose;
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
         * Changes a core window's template (`<library>/<asset>`) as data: `set` layout properties (and
         * `params`, merged by key), `remove` an element, `insert` one or `move` one keeping its name, each
         * naming its element as the window's code does (`'name'`, `'panel/name'`, `''` for the window).
         * `ops` may be a function of the window's context (`TemplateContext`, the keys each window passes
         * are in `docs/template-patches.md`), called once per context. Patches from every module and
         * plugin apply together in order (`order`, then key); an element this module adds is named
         * `<key>:<name>` and only this module reaches it by its short name. Conflicts, elements a release
         * no longer has and ops that throw are logged and kept in `report`.
         */
        patch: (template: string, ops: readonly TemplatePatchOp[] | ((context: TemplateContext) => readonly TemplatePatchOp[]), options?: { order?: number }) => ClientModuleDispose;
        /**
         * What the window's code would bind, for an element this module added: a caption, a click, a
         * picture - or a function of the window's context giving it. With `override`, an element the
         * window's code binds itself (named as the code names it): this module's value is used for the
         * fields it sets, and each field the code sets too is reported as a conflict.
         */
        bind: (template: string, element: string, binding: TemplateBinding | ((context: TemplateContext) => TemplateBinding), options?: { override?: boolean }) => ClientModuleDispose;
        /**
         * Runs after the window's own `arrange` each time a window of the template is laid out, with its
         * window model (`find(name)`, `root()`: `setRectangle`, `setHeight`, `textHeight`...) and its
         * context - a frame as tall as its list. One that throws is skipped and reported.
         */
        arrange: (template: string, arrange: (windows: TemplateWindows, context: TemplateContext) => void) => ClientModuleDispose;
        /** The last application's conflicts, unmatched elements and errors for a template, once it has been drawn. */
        report: (template: string) => TemplatePatchReport | undefined;
    };
}
