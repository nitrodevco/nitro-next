/**
 * The client module API (version 1) as a module author types against it: what `activate(api)` is
 * handed. It mirrors `packages/nitro-react/src/commands/client-modules/ClientModuleApi.ts` without
 * the client's internals, so a module builds outside this repository with nothing but React's types.
 * `nitro-react/src/commands/client-modules/clientModuleSdk.check.ts` fails the client's type check
 * when the two differ, so a member added to (or changed in) the client's API is added here too.
 */
import type { ComponentType, ReactNode } from 'react';

import type { ClientModuleTemplateBinding, ClientModuleTemplatePatchOp, ClientModuleTemplatePatchReport } from './template-types';
import type { ClientModuleTheme } from './theme-types';

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

/**
 * One field type of a plugin message's schema, as the server sends it (`client.messages`): a scalar,
 * `['array', item]` or `['object', fields]`. `int`, `long` and `double` read as numbers.
 */
export type ClientModuleMessageType =
    | 'int'
    | 'long'
    | 'bool'
    | 'string'
    | 'double'
    | readonly [ 'array', ClientModuleMessageType ]
    | readonly [ 'object', ClientModuleMessageSchema ];

/** A plugin message's schema: its fields in wire order, `[camelCaseName, type]`. */
export type ClientModuleMessageSchema = readonly (readonly [ string, ClientModuleMessageType ])[];

/** The value a schema type reads as. */
export type ClientModuleMessageValue<T> = T extends 'int' | 'long' | 'double'
    ? number
    : T extends 'bool'
        ? boolean
        : T extends 'string'
            ? string
            : T extends readonly [ 'array', infer Item ]
                ? ClientModuleMessageValue<Item>[]
                : T extends readonly [ 'object', infer Fields ]
                    ? ClientModuleMessageOf<Fields>
                    : unknown;

/**
 * A message's data as an object, from its schema written `as const` (the JSON the server sends, or
 * `PluginMessageSchema.For(typeof(T)).Json` on the server):
 * `type Skill = ClientModuleMessageOf<typeof SKILL_SCHEMA>`.
 */
export type ClientModuleMessageOf<Fields> = Fields extends readonly (readonly [ string, unknown ])[]
    ? { [Field in Fields[number] as Field[0]]: ClientModuleMessageValue<Field[1]> }
    : never;

/** Raw bytes of a packet, read in order. */
export interface ClientModuleBinaryReader {
    readBytes(length: number): ClientModuleBinaryReader;
    readByte(): number;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    remaining(): number;
    toString(encoding?: string): string;
    toArrayBuffer(): ArrayBuffer;
}

/** A server packet as a parser reads it, in wire order. */
export interface ClientModulePacketReader {
    readByte(): number;
    /** The next `length` bytes. */
    readBytes(length: number): ClientModuleBinaryReader | undefined;
    readBoolean(): boolean;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    readString(): string;
    header: number;
    bytesAvailable: boolean;
}

/** What a module's window component is given. */
export interface ClientModuleWindowProps {
    /** What `windows.open` was given, `{}` without. */
    params: Record<string, unknown>;
    close: () => void;
}

/** An avatar in the room, as an overlay is asked to draw over it. */
export interface ClientModuleAvatar {
    /** The room index: the avatar's room object id. */
    roomIndex: number;
    userId: number;
    name: string;
    /** The user's own avatar. */
    isOwnUser: boolean;
}

/** What a reception layer is given: the reception's size, the desktop's. */
export interface ClientModuleHotelViewLayerProps {
    width: number;
    height: number;
}

/** An alert as a module's illustration hook is shown it. */
export interface ClientModuleAlert {
    /** `alert`: a simple alert; `popup`: a notification popup. */
    kind: 'alert' | 'popup';
    caption: string;
    message: string;
    /** Its picture as the client (or a hook before this one) gives it: an asset name or a URL; `undefined` for none. */
    illustration?: string;
}

/**
 * The client's own libraries, shared rather than bundled a second time. A module built with the
 * SDK's bundler preset imports `react` and `@nitrodevco/client-module-sdk/theme` instead.
 */
export interface ClientModuleLibraries {
    react: typeof import('react');
    reactJsxRuntime: typeof import('react/jsx-runtime');
    zustand: { useStore: (...args: never[]) => unknown };
    theme: ClientModuleTheme;
    /** The client's app-wide stores. Internal and unversioned: read them only where the API has no member yet. */
    stores: { room: unknown; system: unknown; user: unknown };
}

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
        registerParser: <T>(header: number, parse: (wrapper: ClientModulePacketReader) => T, listener: (data: T) => void) => ClientModuleDispose | undefined;
        /** Claims an extension header to send on. Undefined when the header is not free. */
        registerComposer: (header: number) => ClientModuleDispose | undefined;
        /** Sends on a header the module claimed: each value an int, a string or a boolean. */
        send: (header: number, ...values: ClientModulePacketValue[]) => void;
    };
    /**
     * The plugin's named messages (Turbo's `client.messages`, turbo-cloud `docs/plugin-messages.md`):
     * read and written by name, from the field schema the server sends, so a module never sees a
     * header. Type a message's data with `ClientModuleMessageOf<typeof schema>`.
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
         * later are drawn over earlier ones. With `replacesBackground` the layer is the backdrop.
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
         * Returns the function that takes the bubble down.
         */
        add: (layout: string, text: string, options?: { image?: string; link?: string; stay?: boolean; timeDisplay?: number; id?: string }) => ClientModuleDispose;
        /**
         * The picture of every alert and notification popup, open or yet to open: `resolve` is shown each
         * with the picture it has and gives another, or `undefined` to leave it.
         */
        setIllustration: (resolve: (alert: ClientModuleAlert) => string | undefined) => ClientModuleDispose;
    };
    templates: {
        /**
         * Changes a core window's template (`<library>/<asset>`) as data: `set` layout properties, `remove`
         * an element or `insert` one. Patches from every module and plugin apply together in order
         * (`order`, then key); an element this module adds is named `<key>:<name>` and only this module
         * reaches it by its short name. Conflicts and elements a release no longer has are kept in `report`.
         */
        patch: (template: string, ops: readonly ClientModuleTemplatePatchOp[], options?: { order?: number }) => ClientModuleDispose;
        /** What the window's code would bind, for an element this module added: a caption, a click, a picture. */
        bind: (template: string, element: string, binding: ClientModuleTemplateBinding) => ClientModuleDispose;
        /** The last application's conflicts and unmatched elements for a template, once it has been drawn. */
        report: (template: string) => ClientModuleTemplatePatchReport | undefined;
    };
}
